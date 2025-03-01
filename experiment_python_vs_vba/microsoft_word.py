from collections import Counter
from enum import Enum, IntEnum
from typing import Union
import win32com.client as win32
from win32com.client import constants
from color import Color


class HighlightColors(Enum):
    Champagne = 13892860
    Sky = 16777183
    Lilac = 16764646
    Голубой = 16382386
    Apricot = 9028863
    Rose = 13408767
    Blue = 16764057
    Purple = 16751052
    Citrus = 52377
    Green = 6723891
    Red = 6184693

# Follows microsoft's enum: https://learn.microsoft.com/en-us/office/vba/api/word.wdcolorindex
class WdColorIndex(Enum):
    Auto = 0              # Automatic color. Default; usually black.
    NoHighlight = 0       # Removes highlighting that has been applied.
    Black = 1             # Black color.
    Blue = 2              # Blue color.
    Turquoise = 3         # Turquoise color.
    BrightGreen = 4       # Bright green color.
    Pink = 5              # Pink color.
    Red = 6               # Red color.
    Yellow = 7            # Yellow color.
    White = 8             # White color.
    DarkBlue = 9          # Dark blue color.
    Teal = 10             # Teal color.
    Green = 11            # Green color.
    Violet = 12           # Violet color.
    DarkRed = 13          # Dark red color.
    DarkYellow = 14       # Dark yellow color.
    Gray50 = 15           # Shade 50 of gray color.
    Gray25 = 16           # Shade 25 of gray color.

class MicrosoftWord:
    def __init__(self, word_doc_path):
        self.word_app = win32.gencache.EnsureDispatch("Word.Application")
        self.word_app.Visible = True

        self.doc = self.word_app.Documents.Open(word_doc_path)

    def save_and_close(self):
        self.doc.Save()
        self.word_app.Quit()

    
    def highlight_text(self, text, highlight_color: Union[WdColorIndex, HighlightColors, Color, int]):
        colorType = type(highlight_color)
        if colorType is not WdColorIndex and colorType is not HighlightColors and colorType is not Color and colorType is not int:
            raise ValueError('highlight_color is of wrong type')


        rng = self.doc.Content
        
        find = rng.Find
        find.ClearFormatting()
        find.Text = text
        find.MatchCase = False
        find.MatchWholeWord = True
        find.Wrap = 0
        

        while find.Execute():
            if colorType is WdColorIndex:
                rng.HighlightColorIndex = highlight_color.value

                if highlight_color is WdColorIndex.NoHighlight:
                    rng.Shading.BackgroundPatternColor =  constants.wdColorAutomatic    # In case was set earlier below

            elif colorType is HighlightColors:
                rng.Shading.BackgroundPatternColor = highlight_color.value
            elif colorType is Color:
                rng.Shading.BackgroundPatternColor = highlight_color.as_int()
            elif colorType is int:
                rng.Shading.BackgroundPatternColor = highlight_color

            rng.Start = rng.End
            rng.End = self.doc.Content.End

    def highlight_most_common_lines():
        """
        See HighlightColors IntEnum to see the ranks of the colors. Can also 
        """


    def lines_by_occurences(self) -> list[tuple[str, int]]:
        """
        Note: "A line" is technically a paragraph, separated by 'enter', not 'shift-enter', in MsWord.
        Really, a helper utility to compare lists, and find the most common occurences on them.
        """
        counter = Counter()
    
        for paragraph in self.doc.Paragraphs:
            line_text = paragraph.Range.Text.strip()
            if line_text:  # Only count non-empty lines
                counter[line_text] += 1
                
        return counter.most_common()


    def remove_all_shading(self):
        '''
        This could take a long time, as this will go character by character
        '''
        for paragraph in self.doc.Paragraphs:
            for ch in paragraph.Range.Characters:
                ch.HighlightColorIndex = constants.wdNoHighlight
                ch.Shading.BackgroundPatternColor = constants.wdColorAutomatic

    def replace_strings(self, strings_to_remove: list[str]):
        Find = self._retreive_Find_Object()

        for substring in strings_to_remove:
            Find.Text = substring
            Find.Replacement.Text = ""

            Find.Execute(Replace=2)    # 2 == wdReplaceAll

    def _retrieve_Find_Object(self) -> any:
        """
        Retrieves Word Documents' Find Object, and prepares it for use by clearing any previous settings
        """
        Find_Object = self.doc.Content.Find
        Find_Object.ClearFormatting()
        Find_Object.Replacement.ClearFormatting()

        return Find_Object;
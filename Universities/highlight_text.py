import sys
from microsoft_word import MicrosoftWord, HighlightColors


Word = MicrosoftWord(sys.argv[1])


Word.highlight_most_common_lines


# Word.remove_all_shading()

lines = Word.lines_by_occurences()

for line, occurs in lines:
    if occurs == 1:
        Word.highlight_text(line, HighlightColors.Champagne)
    if occurs == 2:
        Word.highlight_text(line, HighlightColors.Apricot)
    if occurs == 3:
        Word.highlight_text(line, HighlightColors.Citrus)
    if occurs == 4:
        Word.highlight_text(line, HighlightColors.Green)
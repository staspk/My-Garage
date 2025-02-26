import win32com.client as win32
import sys

def highlight_occurrences(doc_path, search_text, highlight_color):
    # Create an instance of Word
    word = win32.Dispatch("Word.Application")
    word.Visible = False  # Set to True if you want to see the document open
    
    try:
        # Open the specified document
        doc = word.Documents.Open(doc_path)
        # Get the entire document content
        rng = doc.Content

        # Set up the Find object
        find = rng.Find
        find.ClearFormatting()
        find.Text = search_text
        find.Forward = True
        find.Wrap = 1  # wdFindStop = 1

        # Loop through all occurrences
        while find.Execute():
            # Set the highlight color for the found text
            rng.HighlightColorIndex = highlight_color
            # Collapse the range to the end of the found text to continue search
            rng.Collapse(Direction=0)  # 0 = wdCollapseEnd
        # Save changes and close document
        doc.Save()
        doc.Close()
    except Exception as e:
        print("Error:", e)
    finally:
        # Quit the Word application
        word.Quit()

if __name__ == "__main__":
    # Example usage: adjust parameters as needed.
    # For example, using Word's constant wdYellow.
    # To use Word constants, you can get them from:
    #   constants = win32.constants
    # Then use constants.wdYellow, etc.
    constants = win32.client.constants

    # Check if the script was called with the required parameters
    if len(sys.argv) != 4:
        print("Usage: python highlight.py <doc_path> <search_text> <highlight_color>")
        print("Example: python highlight.py 'C:\\path\\to\\doc.docx' 'example' wdYellow")
        sys.exit(1)

    doc_path = sys.argv[1]
    search_text = sys.argv[2]
    # The third parameter should match one of the Word WdColorIndex constants.
    # For example, if user enters 'wdYellow', we look it up.
    color_str = sys.argv[3]

    try:
        highlight_color = getattr(constants, color_str)
    except AttributeError:
        print(f"Invalid highlight color constant: {color_str}")
        sys.exit(1)

    highlight_occurrences(doc_path, search_text, highlight_color)
    print("Highlighting completed.")
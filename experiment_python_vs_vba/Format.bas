Attribute VB_Name = "Format"

Sub HighlightText(text As String, highlightColor As WdColorIndex)
    Dim rng As Range
        
        Set rng = ActiveDocument.Content    ' Set the range to the entire document content
    
        With rng.Find
            .ClearFormatting
            .text = searchText
            .MatchCase = False
            .MatchWholeWord = True
            .Wrap = wdFindStop
            
            Do While .Execute = True
                rng.HighlightColorIndex = highlightColor

                rng.Start = rng.End
                rng.End = ActiveDocument.Content.End
            Loop

        End With
End Sub

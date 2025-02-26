from TreeTest import Alphabet


# Looks like a standard Enum does not support le comparisons,
# IntEnum does support le comparisons
def AlphabetTestLeRules():
    assert (Alphabet.A < Alphabet.B) is True, "Alphabet must follow le rules"
    assert (Alphabet.A > Alphabet.B) is False, "Alphabet must follow le rules"
    assert (Alphabet.A == Alphabet.B) is False, "Alphabet must follow le rules"

AlphabetTestLeRules()
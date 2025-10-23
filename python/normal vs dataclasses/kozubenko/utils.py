import sys, os
import random, string


def ScriptArg_1(default_value=None) -> str:
    """
    returns `sys.argv[1]`, default_value, or raises Exception if both are missing
    """
    if len(sys.argv) < 2:
        if default_value is not None:
            return default_value
        raise Exception(f"sys.argv[1] does not exist && no default_value passed into ScriptArg_1. len(sys.argv): {len(sys.argv)}")
    
    return sys.argv[1]

def try_parse_int(to_parse:any) -> int | None:
    try:
        return int(to_parse)
    except (ValueError, TypeError):
        return None

def assert_bool(var_name:str, _bool):
    """
    Use to enforce type annotations. Will raise Exception if _bool is not a bool.
    """
    if type(_bool) is not bool:
        raise Exception(f"assert_bool({var_name}): must be a bool (True or False), not: {type(_bool)}")

def assert_str(var_name:str, _str):
    """
    Use to enforce type annotations. Will raise Exception if _str is not a _str.
    """
    if type(_str) is not str:
        raise Exception(f"assert_bool({var_name}): must be a str, not: {type(_str)}")

def assert_class(var_name:str, obj, _class):
    """
    Use to enforce type annotations. Will raise Exception if obj is not a type of _class.
    """
    if type(obj) is not _class:
        raise Exception(f"assert_class({var_name}): must be a {_class.__name__}, not: {type(obj).__name__}")

def assert_int(var_name:str, _int:int, min_val:int=None, max_val:int=None):
    """
    Use to enforce type annotations. Will raise Exception:
    * if _int is not a int
    * len(_list) < min_val (*optional*)
    * len(_list) > max_val (*optional*)
    """
    if type(_int) is not int:
        raise Exception(f"assert_int({var_name}): must be an int, not: {type(_int)}")
    if(min_val) and _int < min_val:
        raise Exception(f"assert_int({var_name}): value of int < min_val: {min_val}")
    if(max_val) and _int > max_val:
        raise Exception(f"assert_int({var_name}): value of int > max_val: {max_val}")

def assert_list(var_name:str, _list:list, min_len:int=None, max_len:int=None, returnBool=False):
    """
    Use to enforce type annotations. Raises Exception, unless `returnBool=True`:
    * if _list is not a list
    * len(_list) < min_len (*optional*)
    * len(_list) > max_len (*optional*)
    * returnBool (*optional*)
    """
    if not returnBool:    
        if not isinstance(_list, list):
            raise Exception(f"assert_list({var_name}): must be a list, not: {type(_list)}")
        if(min_len) and len(_list) < min_len:
            raise Exception(f"assert_list({var_name}): length of list under min_len: {min_len}")
        if(max_len) and len(_list) > max_len:
            raise Exception(f"assert_list({var_name}): length of list exceeds max_len: {max_len}")
    else:
        if not isinstance(_list, list):
            return False
        if min_len is not None and len(_list) < min_len:
            return False
        if max_len is not None and len(_list) > max_len:
            return False
        return True

def assert_path_exists(var_name:str, path:str):
    """
    Use to enforce path exists. If not, raises Exception.
    * Equivalent to Powershell's Test-Path.
    """
    if not os.path.exists(path):
        raise Exception(f"assert_path_exists({var_name}): html file to parse does not exist. var_name: {path}")

class Utils:
    def get_randomized_string(str_length):
        return ''.join(random.choices(string.ascii_letters, k=str_length))
    
    def list_to_str(_list:list[str], char_separator = " "):
        """
        `list_to_str(['a', 'b', 'c'], ';') -> "a;b;c"`
        """
        return char_separator.join(_list)
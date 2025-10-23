import os

def Downloads_Directory() -> str:
    r"""
    - **Windows:** returns downloads value under: `Registry:SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders`\n
    - **Mac/Linux:** returns `~/Downloads`
    """
    if os.name == 'nt':
        import winreg
        key = r'SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders'
        downloads_guid = '{374DE290-123F-4565-9164-39C4925E467B}'

        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, key) as key:
            Downloads_Directory = winreg.QueryValueEx(key, downloads_guid)[0]
            return Downloads_Directory
        
    elif os.name == 'posix':  # Both Mac and Linux
        return os.path.join(os.path.expanduser("~"), "Downloads")

def Parent(path:str) -> str:
    return os.path.dirname(path)

def File(path:str, *paths:str, file:str=None):
    """
    returns a path string your os needs. path & *paths created, if non-existent
    """
    dir = Directory(path, *paths)

    if(file):
        return os.path.join(dir, file)
    
    return dir

def Directory(path:str, *paths:str) -> str:
    """
    returns a path string your os needs. path (including parent dirs) created, if non-existent
    """

    dir = os.path.join(path, *paths)
    os.makedirs(dir, exist_ok=True)

    return dir

def TestPath(path:str) -> bool:
    """
    Equivalent to Powershell's Test-Path
    """
    return os.path.exists(path)
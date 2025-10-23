import json, re
from kozubenko.print import print_red


def load_json(file:str, class_name=None) -> any:
    """
    Usage: `songs = load_json("restricted_songs.json", ISong)`

    class_name currently only works with 1-dimensional 

    To print after: `print(json.dumps(data, indent=4))`
    """
    try:
        with open(file, 'r', encoding='utf-8') as file:
            data = json.load(file)
        if class_name is None:
            return data
    except Exception as e:
        print_red(f"Error in kozubenko.io.load_json(file:str):\n{e}")
        raise e
    
    return [class_name(**item) for item in data]
    
def load_file(file:str) -> str:
    try:
        with open(file, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        print_red(f'Error in kozubenko.io.load_file(file:str):\n{e}')
        raise e
    

def remove_html_tags(text):
    clean_text = re.sub(r'<.*?>', '', text)
    return clean_text
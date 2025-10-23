import os
import subprocess
from definitions import TOR_EXE, TORRC
from stem import Signal
from stem.control import Controller


class Tor:
    TOR_EXE: str = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'tor.exe')     # ./../tor.exe
    TORRC: str = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'torrc')         # ./../torrc

    _process: subprocess.Popen = None

    def start(tor_exe:str = TOR_EXE, torrc:str = TORRC):
        Tor.kill_running_tor_processes()
        Tor._process = subprocess.Popen([tor_exe, "-f", torrc], creationflags=subprocess.CREATE_NO_WINDOW)

    def stop():
        if(Tor._process):
            Tor._process.terminate()
            Tor._process.wait()

    def new_identity(port=9051):
        try:
            with Controller.from_port(port=port) as controller:
                controller.authenticate()
                controller.signal(Signal.NEWNYM)
        except Exception as e:
            raise Exception(f'Failed to get new identity: {e}')
        
    def kill_running_tor_processes():
        try:
            result = subprocess.run(
                ['tasklist', '/FI', 'IMAGENAME eq tor.exe'],
                capture_output=True, text=True
            )

            if "tor.exe" in result.stdout:
                subprocess.run(['taskkill', '/F', '/IM', 'tor.exe'], capture_output=True)

        except Exception as e:
            print(f"Error terminating tor.exe: {e}")

    # def check_ip():
    #     if(Tor._process):
    #         proxies = {
    #             'http': 'socks5h://127.0.0.1:9050',
    #             'https': 'socks5h://127.0.0.1:9050'
    #         }

    #         try:
    #             response = requests.get('https://api.ipify.org', proxies=proxies, timeout=10)
    #             print('Your Tor IP is:', response.text)
    #         except requests.RequestException as e:
    #             print('Request failed:', e)
    
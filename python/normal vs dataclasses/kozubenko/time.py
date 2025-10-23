from datetime import datetime
import time

from kozubenko.print import print_yellow

class Timer:
    start_time: float = None

    def start():
        Timer.start_time = time.perf_counter()

    def elapsed(timed_operation_title = ''):
        elapsed = (time.perf_counter() - Timer.start_time) * 1000                          #   converts elapsed from ns to ms
        if elapsed > 1000:                                                                 #   if elapsed more than 1 second:
            elapsed = elapsed / 1000                                                       #
            print_yellow(f'{timed_operation_title} Operation timed at: {elapsed:.3f}s')    #       convert and print in seconds, like: 1.234s 
        else:                                                                              #   else:
            print_yellow(f'{timed_operation_title} Operation timed at: {elapsed:.3f}ms')   #        print in ms, like:                 123.456ms or 0.000ms under 500ns

    def stop():
        elapsed = (time.perf_counter() - Timer.start_time) * 1000
        if elapsed > 1000:
            elapsed = elapsed / 1000
            print_yellow(f'Operation timed at: {elapsed:.3f}s')
        else:
            print_yellow(f'Operation timed at: {elapsed:.3f}ms')

        Timer.start_time = None

class Time:
    def local_time() -> str:
        """
        returns local_time in format:\n
        `2025-03-18 16:30:55`
        """
        return datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    def local_time_as_legal_filename() -> str:
        """
        returns local_time in format that won't throw exception if used as filename:\n
        `2025-03-18 16:30:55`
        """
        return datetime.now().strftime('%Y-%m-%d %H.%M.%S')
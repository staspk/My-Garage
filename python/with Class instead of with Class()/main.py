from typing import Any


class ScrapeContextManager(type):
    def __enter__(cls):
        Tor.Start()
        Scrape.setup_driver()
        return cls

    def __exit__(cls, exc_type, exc_val, exc_tb):
        if(Scrape.driver): Scrape.driver.quit()
        Tor.Stop()

class Scrape(metaclass=ScrapeContextManager):
    """ 
    Inheriting from `metaclass=ScrapeContextManager`, makes: `with Scrape:` work.
    """
    OUT_DIRECTORY:str = BIBLE_TXT_NEW
    driver:Any = None

    def setup_driver():
        profile = webdriver.FirefoxProfile()
        profile.set_preference("network.proxy.type",             1)
        profile.set_preference("network.proxy.socks",            Tor.HOST)
        profile.set_preference("network.proxy.socks_port",       Tor.socks_port)
        profile.set_preference("network.proxy.socks_remote_dns", True)
        profile.set_preference("browser.cache.disk.enable",      False)
        profile.set_preference("browser.cache.memory.enable",    False)

        options = Options()
        options.profile = profile
        options.add_argument("--headless")

        driver = webdriver.Firefox(options=options)
        Scrape.driver = driver


with Scrape:
    Scrape.Bible_Random_Order(rus_translations)
    Scrape.Book(BIBLE.GENESIS, 1)
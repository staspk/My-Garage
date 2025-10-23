
from dataclass import InventoryItem
from InventoryItem import InventoryItem as InventoryItem
from kozubenko.print import *


world:str

normal = InventoryItem("something", 5.50, 1)
dataclass = InventoryItem("something", 5.50, 1)

Print.green(normal)
Print.green(dataclass)

print()

Print.green(normal.__hash__())
Print.green(dataclass.__hash__())


Print.cyan(world)
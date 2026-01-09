"""
Test Result #1:
    DO NOT USE (it's a layer on top, ie: indirection/obfuscation):
        for key,value in vars(StaticForm).items():
    THIS FORM IS ACTUALLY USABLE FOR BOTH CLASS AND INSTANCE ATTRIBUTES:
        for key,value in StaticForm.__dict__.items():
        
TODO:
    self.__dict__[attr] = value vs setattr()

    when/what advantages setattr() is necessary? apparently: it is the bells and whistles form of direct __dict__ access
"""

from kozubenko.print import Print


class StaticForm:
    static_prop1 = 80
    static_prop2 = 443

    def see():
        for key,value in vars(StaticForm).items():
            Print.green(f'{key}: {value}')
        print()
        for key,value in StaticForm.__dict__.items():
            Print.green(f'{key}: {value}')

    

class InstanceForm:
    static_prop1 = 'static_arbitrary_value'

    """ Instantiated a class with  """
    def __init__(self, *instance_property_names):
        self.special_instance_property = "arbitrary_value"
        for name in instance_property_names:
            self.__dict__[name] = "some_arbitrary_value"

    def see(self):
        for key,value in self.__dict__.items():
            Print.green(f'{key}: {value}')


StaticForm.see()
print()
# form1 = InstanceForm('prop1', 'prop2')
# form1.see()
# print()
# for key,value in vars(form1).items():
#     Print.green(f'{key}: {value}')
# print()
# for key,value in vars().items():
#     Print.green(f'{key}: {value}')

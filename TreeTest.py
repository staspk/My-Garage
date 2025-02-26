from enum import Enum, IntEnum
import random


class Alphabet(IntEnum):
    A = 1
    B = 2
    C = 3
    D = 4
    E = 5
    F = 6
    G = 7
    H = 8
    I = 9
    J = 10
    K = 11
    L = 12
    M = 13
    N = 14
    O = 15
    P = 16
    Q = 17
    R = 18
    S = 19
    T = 20
    U = 21
    V = 22
    W = 23
    X = 24
    Y = 25
    Z = 26

    def get(value):
        if isinstance(value, int):
            return Alphabet(value)
        if isinstance(value, str):
            return Alphabet[value.upper()]
        
    # def __le__():
        


    def generate_randomized_alphabet_list() -> list[int]:
        theList: list[str] = []
        alreadyExists: list[int] = []

        while True:
            randomNum: int = random.randint(1, 26)
            if randomNum not in alreadyExists:
                theList.append(Alphabet.get(randomNum))
            
            if(len(theList) == len(Alphabet)):
                return theList


class Node(object):
    def __init__(self, data):
        self.data = data
        self.parent = None
        self.height = 0
        self.left_child = None
        self.right_child = None

class AvlTree:
    def __init__(self):
        self.root: Node = None

    def insert(self, data) -> Node:
        if self.root is None:                               #  AvlTree has no data yet, incoming data becomes root Node
            self.root = Node(data)
        else:                                               #  Else:
            new_node = self._insert(self.root, data)        #    root and new data passed to _insert
            self._walk_up(new_node)

    def _insert(self, node: Node, data):                    
        if data <= node.data:                               #  
            if node.left_child is None:


    




randomizedAlphabet = Alphabet.generate_randomized_alphabet_list()



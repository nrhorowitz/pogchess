# a_champs =
# b_champs =
from fake_character import *
from game import *
import random
# board = [[0, 1, 2, 3, 4, 5],
#          [6, 7, 8, 9, 10, 11],
#          [12, 13, 14, 15, 16, 17],
#          [18, 19, 20, 21, 22, 23],
#          [24, 25, 26, 27, 28, 29]]
# for row in board:
#     print(row)
# for i in range(len(board)):
#     for j in range(len(board[i])):
#         print(board[i][j])


a = FakeCharacter("a",0,0)
b = FakeCharacter("b",5,5)
board = [[a, None, None, None, None, None],
         [None, None, None, None, None, None],
         [None, None, None, None, None, None],
         [None, None, None, None, None, None],
         [None, None, None, None, None, None],
         [None, None, None, None, None, b]]
pathing(board)
for i in range(50):
    pathing(board)
random.seed(5)
for i in range(10):
    print(random.random())
# print(random.random())
# print(random.random())

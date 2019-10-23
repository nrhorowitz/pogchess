
projected_positions = {} #maps champ object to position tuples (y,x).
import random
import board_helper_functions
import character #not sure if I even need but just in case.
random.seed(5) # SHOULD POSSIBLY BE USING SECRETS INSTEAD FOR SECURITY!?
#currently using seed 5 for deterministic testing, eventually replace with no arg


#TODO NEXT TIME:
    # Finish implementing diagonal movement and then debug.

def pathing(board):
    #input: current board, 6x6 array of champions. This function updates the board so that each
    #champion moves closer to a select target. Moves horizontal/vertical pseudorandomly.
    #There is a "priority" of sorts, as in the champions who go earlier in the loop have more freedom in where to go.

    #board: Origin is at top left corner.

    #first, construct a_champs and b_champs through a linear pass through the board.
    # while doing so, make each one of the locations None (as they will no longer reside there).
    a_champs = [] #list of champs. Team a is the top team
    b_champs = [] #list of champs. Team b is the bottom team.
    for i in range(len(board)):
        for j in range(len(board[i])):
            if ((board[i][j] is not None)):
                if (i < 3):
                    a_champs.append(board[i][j])
                else:
                    b_champs.append(board[i][j])
            board[i][j] = None
    #now finding projected positions along with moving the a champions in a direction closer to the closest enemy.
    min_dist = 9999999999
    min_dist_champ = None
    #create a dictionary mapping from a champ to b champ, where b champ is the least distance champ to a champ
    for a in a_champs:
        for b in b_champs:
            dist = euclidean_distance(a, b)
            if (dist < min_dist):
                min_dist = dist
                min_dist_champ = b
        projected_pos = find_projected_position(a, min_dist_champ)
        a.set_y_pos(projected_pos[0])
        a.set_x_pos(projected_pos[1])
        #projected_positions map - champion object to tuple (the x, y position)
        projected_positions[a] = projected_pos
        min_dist = 9999999999
        min_dist_champ = None


    # print(projected_positions.values())

    #clear all of a's positions from projected_positions
    projected_positions.clear()

    #When doing the same for b_champs, this time use the projected a positions to calculate.

    #a still refers to the first argument champ. Note how I'm now looping through the b_champs in the outer loop tho.
    for a in b_champs:
        for b in a_champs:
            dist = euclidean_distance(a, b)
            if (dist < min_dist):
                min_dist = dist
                min_dist_champ = b
        projected_pos = find_projected_position(a, min_dist_champ)
        a.set_y_pos(projected_pos[0])
        a.set_x_pos(projected_pos[1])
        #projected_positions map - champion object to tuple (the x, y position)
        projected_positions[a] = projected_pos
        min_dist = 9999999999
        min_dist_champ = None


    # print(projected_positions.values())
    projected_positions.clear()

    #place them into a new board

    for a in a_champs:
        board[a.get_y_pos()][a.get_x_pos()] = a
        print((a.get_y_pos(), a.get_x_pos()))
    for b in b_champs:
        board[b.get_y_pos()][b.get_x_pos()] = b
        print((b.get_y_pos(), b.get_x_pos()))
        #for testing
    for row in board:
        print(row)





def find_projected_position(a, b):
    #takes champs a and b, then uses their respective positions to move champ a closer to champ b.
    #case work: 1. if they are adjacent, don't move.

    if euclidean_distance(a, b) == 1 || euclidean_distance(a,b) = sqrt(2):
        return (a.get_y_pos(), a.get_x_pos())

    #First, find the relative directions that a should move. Now it is a matter of seeing what is valid, and randomness if necessary.
    hor = 6 #out of range for testing.
    ver = 6
    if (a.get_y_pos() < b.get_y_pos()): # a is above b
        ver = 1
    elif (a.get_y_pos() == b.get_y_pos()): # a is on the same row as b (same height)
        ver = 0
    else:
        ver = -1

    if (a.get_x_pos() < b.get_x_pos()): #a is to the left of b
        hor = 1
    elif (a.get_x_pos() == b.get_x_pos()): #a is on the same column as b (same width)
        hor = 0
    else:
        hor = -1

    #now, outputting the new position.

    #Cases:
    #1. They are on the same row or column. Move one step respectively. However, if the champion is blocked,
    #   then take a random direction diagonal step. *random
    #2. They are not on the same row or column. Move on diagonal step. However, if the champion is blocked,
    #   then take a horizontal or vertical step #random.

    #if they are on the same column, move closer to b, vertically.
    if (hor == 0):
        if (validate(a.get_y_pos() + ver, a.get_x_pos())):
            return (a.get_y_pos() + ver, a.get_x_pos())
        else:
            #need to put a case here say that we have a2, a1 and b standing in a vertical line. We want a2 to move towards b
            #right now a2 will get cucked by a1.Thus, we want him to move diagonally so they can both attack b.
            if (random.random() <= .5): #try moving left first
                if (validate(a.get_y_pos() + ver, a.get_x_pos() - 1)):
                    return (a.get_y_pos() + ver, a.get_x_pos() - 1)
            if (validate(a.get_y_pos() + ver, a.get_x_pos() + 1)):
                return (a.get_y_pos() + ver, a.get_x_pos() + 1)

        #CHECK TO SEE IF THE ABOVE HAS THE CORRECT LOGIC, THEN FIX BELOW


    #if they are on the same row, move closer to b, horizontally.
    if (ver == 0):
        if (validate(a.pos[0], a.pos[1] + hor)):
            return (a.pos[0], a.pos[1] + hor)
        else:
            return a.pos

    # #left or right border case, go horizontal
    # if (a.pos[0] == 0 or a.pos[0] == 5):
    #     if (validate((a.pos[0] + hor, a.pos[1]))): #changed this to be + ver on the second one instead of + hor on the first one
    #         return (a.pos[0] + hor, a.pos[1])       #and now i changed it back
    #     else:
    #         return a.pos
    #
    # #top or bottom border case, go vertical
    # elif (a.pos[1] == 0 or a.pos[1] == 5):
    #     if (validate((a.pos[0], a.pos[1] + ver))): #also changed this
    #         return (a.pos[0], a.pos[1] + ver)   #and now i changed it back
    #     else:
    #         return a.pos

    #general case with horizontal towards enemey without validation only for testing. Will turn this into random.
    else:
        if (random.random() <= .5):
            if (validate((a.pos[0] + hor , a.pos[1]))):
                return (a.pos[0] + hor , a.pos[1])
            else:
                return a.pos
        else:
            if (validate((a.pos[0], a.pos[1] + ver))):
                return (a.pos[0], a.pos[1] + ver)
            else:
                return a.pos

    return a.pos #aka, there are no available spots.




def validate(projected_pos):
    #returns true if the projected position isn't already taken up. and that its in range
    for pos in projected_positions.values():
        if projected_pos == pos:
            return False
    if(projected_pos[0] < 0 or projected_pos[0] > 5 or projected_pos[1] < 0 or projected_pos[1] > 5):
        return False
    return True


#eventually return

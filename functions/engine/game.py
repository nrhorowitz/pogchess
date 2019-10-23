#for now, don't put anything into position 0, 0 because that's what I use to see if i fucked up.

projected_positions = {} #maps champ object to position tuples.
import random
random.seed(5) # SHOULD POSSIBLY BE USING SECRETS INSTEAD FOR SECURITY!?
#currently using seed 5 for deterministic testing, eventually replace with no arg


#TODO NEXT TIME:
    # Change the necessary condition for attacking to be distance 1, because if they are
    #distance 0, then the second one replaces the first. Also it's more aesthetic.
    #my previous bug was that once they are in the same edge column, then they have no move- because im not sure,
    #but i think because i make hor 0 in that case right, which means that both are in the same column. I THINK
    #that i should make separate cases for the left versus right border, then make them go inside.
    #Finish debugging with a couple more test cases, then start working on other stuff!

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
        a.pos = find_projected_position(a, min_dist_champ)
        #projected_positions map - champion object to tuple (the x, y position)
        projected_positions[a] = a.pos
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
        a.pos = find_projected_position(a, min_dist_champ)
        #updating the positions already right below... might not need the projected positions map at all.
        projected_positions[a] = a.pos
        min_dist = 9999999999
        min_dist_champ = None


    # print(projected_positions.values())
    projected_positions.clear()

    #place them into a new board

    for a in a_champs:
        board[a.pos[0]][a.pos[1]] = a
        print(a.pos)
    for b in b_champs:
        board[b.pos[0]][b.pos[1]] = b
        print(b.pos)
        #for testing
    for row in board:
        print(row)





def find_projected_position(a, b):
    #takes champs a and b, then uses their respective positions to move closer, in a random direction.
    #want to stay in boundary. Make sure you don't overlap with another position
    #case work: 1. if distance = 0, don't do anything. I THINK THEY WILL HAPPEN IF I USE PROJECTED POSITIONS IN PART B.
    #AGAIN, IT'S TO AVOID THE CASE THAT TWO THINGS ARE DISTANCE ONE AWAY AND JUST KEEP SWAPPING PLACES WITH EACH OTHER
    #2. If on the border, only go vertically. If both options available, go vertical. Eventually I will swap these to be random instead.
    if euclidean_distance(a, b) == 1:
        return a.pos

    #First, find the relative directions that a should move. Now it is a matter of seeing what is valid, and randomness if necessary.
    hor = 6 #out of range for testing.
    ver = 6
    if a.pos[0] < b.pos[0]: # a is above b
        ver = 1
    elif b.pos[0] == a.pos[0]: # a is on the same row as b (same height)
        ver = 0
    else:
        ver = -1

    if a.pos[1] < b.pos[1]: #a is to the left of b
        hor = 1
    elif b.pos[1] - a.pos[1] = 0: #a is on the same column as b (same width)
        hor = 0
    else:
        hor = -1

    #now, outputting the new position.

    #if they are on the same column, move closer to each other.
    if (hor == 0):
        if (validate(a.pos[0] + ver, a.pos[1])):
            return (a.pos[0] + ver, a.pos[1])
        else:
            return a.pos

    #if they are on the same row, move closer to each other.
    if (ver == 0):
        if (validate(a.pos[0], a.pos[1] + hor)):
            return (a.pos[0], a.pos[1] + hor)
        else:
            return a.pos

    #left or right border case, go horizontal
    if (a.pos[0] == 0 or a.pos[0] == 5):
        if (validate((a.pos[0] + hor, a.pos[1]))): #changed this to be + ver on the second one instead of + hor on the first one
            return (a.pos[0] + hor, a.pos[1])       #and now i changed it back
        else:
            return a.pos

    #top or bottom border case, go vertical
    elif (a.pos[1] == 0 or a.pos[1] == 5):
        if (validate((a.pos[0], a.pos[1] + ver))): #also changed this
            return (a.pos[0], a.pos[1] + ver)   #and now i changed it back
        else:
            return a.pos
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

    return (0, 0) #aka u fucked up




def validate(projected_pos):
    #returns true if the projected position isn't already taken up. and that its in range
    for pos in projected_positions.values():
        if projected_pos == pos:
            return False
    if(projected_pos[0] < 0 or projected_pos[0] > 5 or projected_pos[1] < 0 or projected_pos[1] > 5):
        return False
    return True





def euclidean_distance(a, b):
    #takes in champs a and b, then calculates the distance between them.
    return ((a.pos[0] - b.pos[0])**2 + (a.pos[1] - b.pos[1])**2) ** .5

#eventually return

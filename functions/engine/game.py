#for now, don't put anything into position 0, 0 because that's what I use to see if i fucked up.

def pathing(board):
    #board is 6x6 array. a_champs list of team a champs. b_champs list of team b champs.
    #input: current board with everyone in it. This function updates the board so that each
    #champion moves closer to a select target. Moves horizontal/vertical randomly.
    #right now, there is a "priority" of sorts, as in the champions who go earlier in the loop have more freedom in where to go.

    #first, construct a_champs and b_champs through a linear pass through the board.
    # while doing so, make each one of the locations None (as they will no longer reside there).
    a_champs = []
    b_champs = []
    for i in range(len(board)):
        for j in range(len(board[i])):
            if ((board[i][j] is not None)):
                if (i < 3):
                    a_champs.append(board[i][j])
                else:
                    b_champs.append(board[i][j])
            board[i][j] = None

    min_dist = 9999999999
    min_dist_champ = None
    projected_positions = {} #maps champ object to position tuples.
    #create a dictionary mapping from a champ to b champ, where b champ is the least distance champ to a champ
    for a in a_champs:
        for b in b_champs:
            dist = euclidean_distance(a, b)
            if (dist < min_dist):
                min_dist = dist
                min_dist_champ = b
        projected_positions[a] = find_projected_position(a, min_dist_champ)
        #updating the positions already right below... might not need the projected positions map at all.
        a.pos = find_projected_position(a, min_dist_champ)
        min_dist = 9999999999
        min_dist_champ = None

    print(projected_positions.values())

    #clear all of a's positions from projected_positions
    projected_positions = {}

    #When doing the same for b_champs, this time use the projected a positions to calculate. Thus this takes care
    #of the case that they are one apart initially. Now they will be on the same spot. If they are on the same spot, then
    # don't do anything.

    #a still refers to the first argument champ. Note how I'm now looping through the b_champs in the outer loop tho.
    for a in b_champs:
        for b in a_champs:
            dist = euclidean_distance(a, b)
            if (dist < min_dist):
                min_dist = dist
                min_dist_champ = b
        projected_positions[a] = find_projected_position(a, min_dist_champ)
        #updating the positions already right below... might not need the projected positions map at all.
        a.pos = find_projected_position(a, min_dist_champ)
        min_dist = 9999999999
        min_dist_champ = None


    print(projected_positions.values())

    #place them into a new board


    #TODO FOR NEXT TIME:
    #1  place them into a new board.
    #2. MAKE TESTS.
    #3. DEBUG:

def find_projected_position(a, b):
    #takes champs a and b, then uses their respective positions to move closer, in a random direction.
    #want to stay in boundary. Make sure you don't overlap with another position
    #case work: 1. if distance = 0, don't do anything. I THINK THEY WILL HAPPEN IF I USE PROJECTED POSITIONS IN PART B.
    #AGAIN, IT'S TO AVOID THE CASE THAT TWO THINGS ARE DISTANCE ONE AWAY AND JUST KEEP SWAPPING PLACES WITH EACH OTHER
    #2. If on the border, only go vertically. If both options available, go vertical. Eventually I will swap these to be random instead.
    if euclidean_distance(a, b) == 0:
        return a.pos

    # projected_pos = (0, 0) #cant modify a tuple anyway so inititializing this is useless
    hor = 0
    ver = 0
    if b.pos[0] - a.pos[0] > 0: # b is to the right of a
        hor = 1
    else:
        hor = -1

    if b.pos[1] - a.pos[1] > 0: #b is above a
        ver = 1
    else:
        ver = -1
    # the above finds the relative directions that a should move. Now it is a matter of seeing what is valid, and randomness if necessary.

    #left or right border case, go horizontal
    if (a.pos[0] == 0 or a.pos[0] == 5):
        if (validate((a.pos[0] + hor, a.pos[1]))):
            return (a.pos[0] + hor, a.pos[1])
        else:
            return a.pos

    #top or bottom border case, go vertical
    elif (a.pos[1] == 0 or a.pos[1] == 5):
        if (validate((a.pos[0], a.pos[1] + ver)))
            return (a.pos[0], a.pos[1] + ver)
        else:
            return a.pos
    #general case with horizontal towards enemey without validation only for testing. Will turn this into random.
    else:
        if (validate((a.pos[0] + hor , a.pos[1]))):
            return (a.pos[0] + hor , a.pos[1])
        else:
            return a.pos
    return (0, 0) #aka u fucked up


def validate(projected_pos):
    #returns true if the projected position isn't already taken up.
    for pos in projected_positions.values():
        if projected_pos == pos:
            return False
    return True



def euclidean_distance(a, b):
    #takes in champs a and b, then calculates the distance between them.
    return ((a.pos[0] - b.pos[0])**2 + (a.pos[1] - b.pos[1])**2) ** .5

#eventually return

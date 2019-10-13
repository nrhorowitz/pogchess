def pathing(board, a_champs, b_champs):
    #board is 6x6 array. a_champs list of a_champs. b_champs list of b_champs.
    #input: current board with everyone in it. This function updates the board so that each
    #champion moves closer to a select target. Moves horizontal/vertical randomly.
    #right now, there is a "priority" of sorts, as in the champions who go earlier in the loop have more freedom in where to go.
    min_dist = 9999999999
    min_dist_champ = None
    projected_positions = {} #maps champ to position.
    #create a dictionary mapping from a champ to b champ, where b champ is the least distance champ to a champ
    for a in a_champs:
        for b in b_champs:
            dist = euclidean_distance(a, b)
            if (dist < min_dist):
                min_dist = dist
                min_dist_champ = b
        projected_positions[a] = find_projected_position(a, min_dist_champ)


    #When doing the same for b_champs, this time use the projected a positions to calculate. Thus this takes care
    #of the case that they are one apart initially. Now they will be on the same spot. If they are on the same spot, then
    # don't do anything.


    #place them into a new board


    #TODO FOR NEXT TIME: 1. MAKE TESTS.
    #2. Check to see if I modify any tuples because that is bad.
    #3. Finish coding these functions and debug.

def find_projected_position(a, b):
    #takes champs a and b, then uses their respective positions to move closer, in a random direction.
    #want to stay in boundary. Make sure you don't overlap with another position
    #case work: 1. if distance = 0, don't do anything. I THINK THEY WILL HAPPEN IF I USE PROJECTED POSITIONS IN PART B.
    #AGAIN, IT'S TO AVOID THE CASE THAT TWO THINGS ARE DISTANCE ONE AWAY AND JUST KEEP SWAPPING PLACES WITH EACH OTHER
    #2. If on the border, only go vertically. If both options available, go vertical. Eventually I will swap these to be random instead.
    if euclidean_distance(a, b) == 0:
        return a.pos

    projected_pos = (0, 0)
    right = True
    up = True
    if b.pos[0] - a.pos[0] > 0: # b is to the right of a
        right = True
    else:
        right = False

    if b.pos[1] - a.pos[1] > 0: #b is above a
        up = True
    else:
        up = False
    # the above finds the relative directions that a should move. Now it is a matter of seeing what is valid, and randomness if necessary.

    #horizontal border case
    # if (a.pos[0] == 0 or a.pos[0] == 5):
    #     if (validate(a.pos[0], a.pos[1] + 1)):
    #         projected_pos = (a.pos[0], a.pos[1] + 1)

    #vertical border case

    #general case with vertical without validation only for testing
    projected_pos = (a.pos[0], a.pos[1] + 1)
    return projected_pos


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

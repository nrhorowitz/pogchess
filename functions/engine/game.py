def pathing(board, a_champs, b_champs):
    # board = [[some board that should be passed in]]
    # a_champs = []
    # b_champs = []
    min_dist = 9999999999
    min_dist_champ = None
    #create a dictionary mapping from a champ to b champ, where b champ is the least distance champ to a champ
    for a in a_champs:
        for b in b_champs:
            dist = euclidean_distance(a.x, a.y, b.x, b.y))
            if (dist < min_dist):
                min_dist = dist
                min_dist_champ =

def euclidean_distance(x1, y1, x2, y2):
    return ((x1 - x2)**2 + (y1 - y2)**2) ** .5

#eventually return

from assets.constants import *

def find_surrounding_positions(y, x):
	possible_surrounding_positions = [(x+1, y+1), (x, y+1), (x-1, y+1),
								 		  (x+1, y), (x-1, y),
								 		  (x+1, y-1), (x, y-1), (x-1, y-1)]
	surrounding_positions = []
	for pos in possible_surrounding_positions:
		if pos[0] >=0 and pos[1] >= 0:
			if pos[0] < constants.BOARD_WIDTH and pos[1] < constants.BOARD_HEIGHT:
				surrounding_positions.append(pos)
	return surrounding_positions

#getters and setters for champion position.
def get_x_pos(self):
	return self.x

def get_y_pos(self):
	return self.y

def set_x_pos(self, xcoordinate):
	self.x = xcoordinate
	return None

def set_y_pos(self, ycoordinate):
	self.y = ycoordinate
	return None

def euclidean_distance(a, b):
    #takes in champs a and b, then calculates the distance between them.
    return ((a.get_x_pos() - b.get_x_pos())**2 + (a.get_y_pos() - b.get_y_pos())**2) ** .5

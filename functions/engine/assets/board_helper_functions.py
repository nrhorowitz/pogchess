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
def x_pos(self):
	return self.x

def y_pos(self):
	return self.y

def set_x_pos(self, pos):
	self.x = pos
	return None
	
def set_y_pos(self, pos):
	self.y = pos
	return None

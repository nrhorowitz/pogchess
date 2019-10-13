from assets.constants import *
import assets.board_helper_functions as bh

class Character:
	def __init__(self, x, y):
		self.x = x
		self.y = y
		# Dummy instance variables, probably not needed
		self.name = "Character"
		self.health = 100
		self.damage = 1
		self.armor = 1
		self.mr = 1
		self.atk_spd = 1
		self.mv_spd = 1
		self.mana = 0
		self.range = 100
		self.level = 1
		# Might not need these
		self.ulting = False
		self.ult_time = 0

class Garen(Character):
	def __init__(self, x, y):
		super().__init__(x, y)
		self.name = "Garen"
		self.health = 100
		self.damage = 10
		self.armor = 10
		self.mr = 10
		self.atk_spd = .5
		self.mv_spd = .75
		self.mana = 0
		self.range = 125

	def attack(self, opponent):
		""" The fundamental gameplay operation. Assumed in range."""
		return 0

	def castUlt(self):
		""" not sure how to specify if aoe versus against certain targets... etc"""
		# Not sure how to implement this with how ur doing char interactions @kevin. 
		# I'll leave the implementation up to you.
		surrounding_positions = bh.find_surrounding_positions(self.x, self.y)

		#Dummy return
		return 0





class Minion(Character):
	Character.name = "Minion"

	def __init__(self):
		super().__init__(self, curr_health)

	def __init__(self, health, damage, armor, mr, atk_spd, mv_spd, mana):
		super().__init__(self, health, damage, armor, mr, atk_spd, mv_spd, mana)

	def attack(self, opponent):
		""" The fundamental gameplay operation. Assumed in range."""
		return 0

	def castUlt(self):
		""" not sure how to specify if aoe versus against certain targets... etc"""
		return 0

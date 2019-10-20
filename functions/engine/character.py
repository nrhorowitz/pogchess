from assets.constants import *
import assets.board_helper_functions as bh

class Character:
	def __init__(self, x, y):
		self.x = x
		self.y = y
		# Dummy instance variables, probably not needed
		self.name = "NULL"
		self.init_health = 100
		self.health = 100
		self.atk = 1
		self.armor = 1
		self.mr = 1
		self.atk_spd = 1
		self.mana = 0
		self.range = 100
		self.level = 1
		self.ult_time = 0

	def __repr__(self):
		return self.name

	def __str__(self):
		return self.name

	def attack(self, opponent):
		dmg_multiplier = 100 / ( 100 + opponent.armor)
		dmg_given = dmg_multiplier * self.atk
		opponent.health -= dmg_given 

	def is_dead():
		if self.health <= 0:
			return True
		return False

	def get_ult_time():
		return self.ult_time

	def reset():
		self.mana = 0
		self.health = self.init_health

class Garen(Character):
	def __init__(self, x, y):
		super().__init__(x, y)
		self.name = "Garen"
		self.init_health = 600
		self.health = 600
		self.atk = 50
		self.armor = 40
		self.mr = 20
		self.og_mr = 20
		self.atk_spd = .6
		self.mana = 0
		self.range = 1
		self.ult_time = 4
		self.ulted_time = 0

	def level_up():
		if self.level == 1:
			self.level += 1
			self.init_health = 1080
			self.health = 1080
			self.atk = 90
		elif self.level == 2:
			self.level += 1
			self.init_health = 2160
			self.health = 2160
			self.atk = 180
		else:
			return

	def castUlt(self, board):
		self.mana = 0
		self.mr = 999
		if self.level == 1:
			ult_damage = int(360 / 4)
		elif self.level == 2:
			ult_damage = int(585 / 4)
		else:
			ult_damage = int(810 / 4)
		surrounding_positions = bh.find_surrounding_positions(self.x, self.y)
		surrounding_champions = []
		for pos in surrounding_positions:
			board[pos[0], pos[1]] = possible_champion
			if possible_champion is not None:
				surrounding_champions.append(possible_champion)
		for champ in surrounding_champions:
			dmg_multiplier = 100 / (100 + champ.armor)
			dmg_given = ult_damage * dmg_multiplier
			champ.health -= dmg_given
		self.ulted_time += 1
		if self.ulted_time == self.ult_time:
			self.ulted_time = 0
			self.mr = self.og_mr

class Darius(Character):
	def __init__(self, x, y):
		super().__init__(x, y)
		self.name = "Darius"
		self.init_health = 600
		self.health = 600
		self.atk = 50
		self.armor = 40
		self.mr = 20
		self.og_mr = 20
		self.atk_spd = .5
		self.mana = 0
		self.range = 1
		self.ult_time = 1

	def level_up():
		if self.level == 1:
			self.level += 1
			self.init_health = 1080
			self.health = 1080
			self.atk = 90
		elif self.level == 2:
			self.level += 1
			self.init_health = 2160
			self.health = 2160
			self.atk = 180
		else:
			return

	def castUlt(self, board):
		self.mana = 0
		if self.level == 1:
			ult_damage = 150
			heal = 100
		elif self.level == 2:
			ult_damage = 200
			heal = 150
		else:
			ult_damage = 250
			heal = 200
		surrounding_positions = bh.find_surrounding_positions(self.x, self.y)
		surrounding_champions = []
		for pos in surrounding_positions:
			board[pos[0], pos[1]] = possible_champion
			if possible_champion is not None:
				surrounding_champions.append(possible_champion)
		for champ in surrounding_champions:
			dmg_multiplier = 100 / (100 + champ.armor)
			dmg_given = ult_damage * dmg_multiplier
			champ.health -= dmg_given
		self.hp = min(self.hp + heal, init_health)




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

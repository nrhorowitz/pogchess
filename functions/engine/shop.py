import random
from assets.constants import *
from character import *

# Dummy input from wrapper
profile_ids = ['p0', 'p1', 'p2', 'p3', 'p4', 'p5']


garen_pool = [Garen(0, 0) for i in range(15)]
darius_pool = [Darius(0, 0) for i in range(15)]
initial_pool = garen_pool + darius_pool

class Player:
	def __init__(self, username):
		self.username = username
		self.health = PLAYER_HEALTH
		self.gold = STARTING_GOLD
		self.econ = PASSIVE_ECON
		self.winstreak = 0
		self.losestreak = 0
		self.pool = initial_pool.copy()

	def __repr__(self):
		return self.username

	def __str__(self):
		return self.username

def create_pool():
	player_pool = []
	while len(player_pool) < 5:
		index = random.randint(0, len(pool) - 1)
		player_pool.append(pool.pop(index))





# Init
players = []
for profile_id in profile_ids:
	players.append(Player(profile_id))

# Main loop
def game_loop(names):
	matchmaking = random.sample(range(len(players)), len(players))
	if len(matchmaking) % 2 == 1:
		matchmaking.append(random.choice(matchmaking[:-1]))
	pairs = []
	for i in range((len(matchmaking) + 2 - 1) // 2):
		int_pair = matchmaking[i * 2:(i + 1) * 2]
		pair = []
		for val in int_pair:
			pair.append(players[val])
		pairs.append(pair)
	# Input: Pairs of players to fight and their boards
	# Connect players to each other over the network and pass their boards to each other
	# Output: players who won and their champions

	# Dummy game_results
	game_results = [[pairs[0][0], [Garen(0, 0)]], [pairs[1][0], [Garen(0, 0)]]]

	# Find losers and append to game_results
	for i in range(len(game_results)):
		if game_results[i][0].username == pairs[i][0].username:
			game_results[i].append(pairs[i][1])
		else:
			game_results[i].append(pairs[i][0])
	# Index 0: winner
	# Index 1: winner's remaining champions
	# Index 2: loser

	# Damage, streaks, and economy
	for r in game_results:
		winner = r[0]
		loser = r[2]

		# Take damage
		damage = 0
		for char in r[1]:
			if char.level == 1:
				damage += 1
			elif char.level == 2:
				damage += 3
			else:
				damage += 5
		loser.health -= damage
		# Streaks
		loser.winstreak = 0
		loser.losestreak -= 1
		winner.losestreak = 0
		winner.winstreak += 1
		# Economy
		for p in [winner, loser]:
			if p.winstreak >= 7 or p.losestreak >= 7:
				p.gold += p.econ + 3
			elif p.winstreak >= 5 or p.losestreak >= 5:
				p.gold += p.econ + 2
			elif p.winstreak >= 3 or p.losestreak >= 3:
				p.gold += p.econ + 1
			else:
				p.gold += p.econ





odd_players = ["player1", "player2", "player3", "player4", "player5"]
even_players = ["player1", "player2", "player3", "player4"]
game_loop(even_players)

# Dummy Boards
[[0, 0, 0, 0, 0, 0] for i in range(6)]
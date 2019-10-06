import random
from assets.constants import *

garen_pool = ["garen" for i in range(15)]
darius_pool = ["darius" for i in range(15)]
initial_pool = garen_pool + darius_pool
class Player:
	def __init__(username):
		self.username = username
		self.health = PLAYER_HEALTH
		self.gold = STARTING_GOLD
		self.econ = PASSIVE_ECON
		self.streak = 0
		self.winstreak = True
		self.pool = initial_pool.copy()

def create_pool():
	player_pool = []
	while len(player_pool) < 5:
		index = random.randint(0, len(pool) - 1)
		player_pool.append(pool.pop(index))


def game_loop(names):
	players = []
	for n in names:
		players.append(n)

	matchmaking = random.sample(range(len(players)), len(players))
	if len(matchmaking) % 2 == 1:
		matchmaking.append(random.choice(matchmaking[:-1]))
	pairs = [matchmaking[i * 2:(i + 1) * 2] for i in range((len(matchmaking) + 2 - 1) // 2)]
	# Input: Pairs of players to fight and their boards
	# Connect players to each other over the network and pass their boards to each other
	# Output: players who won and their champions

	



odd_players = ["player1", "player2", "player3", "player4", "player5"]
even_players = ["player1", "player2", "player3", "player4"]
game_loop(even_players)

# Dummy Boards
[[0, 0, 0, 0, 0, 0] for i in range(6)]
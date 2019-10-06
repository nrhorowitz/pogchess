class Character:
    #implement levels later.
    Character.health = 1
    def __init__(self):
        self.curr_health = Character.health;

        #for debugging purposes
    def __init__(self, health, damage, armor, mr, atk_spd, mv_spd, mana, range, x, y):
        self.curr_health = health # these are all constants so put them in constant file
        self.armor = armor
        self.mr = mr
        self.atk_spd = atk_spd
        self.mv_spd = mv_spd
        self.mana = mana
        self.range = range
        self.x = x
        self.y = y


    def attack(self, opponent):
        """ The fundamental gameplay operation. Assumed in range."""
        while opponent.health > 0:
            opponent.curr_health -= 3
        return 0

    def calculate_damage():
        return 0

    def cast_ult(self):
        print("this should not be printing. Cast Ult on your champion.")




class Garen(Character):
    Garen.name = "Garen"
    Garen.health = 100
    Garen.damage = 10
    Garen.armor = 10
    Garen.mr = 10
    Garen.atk_spd = .5 # will depend on frames and shit
    Garen.mv_spd = .75  # will depend on pixels and shit
    Garen.mana = 0
    Garen.range = 125
    Garen.x = 3
    Garen.y = 3

    def __init__(self):
        super().__init__(self, curr_health, x, y)

    # prob just for testing, making a unique garen for testing gameplay functionality.
    def __init__(self, health, damage, armor, mr, atk_spd, mv_spd, mana):
        super().__init__(self, health, damage, armor, mr, atk_spd, mv_spd, mana)

    def attack(self, opponent):
        """ The fundamental gameplay operation. Assumed in range."""
        return 0

    def castUlt(self):
        """ not sure how to specify if aoe versus against certain targets... etc"""
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

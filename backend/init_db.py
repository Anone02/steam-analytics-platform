from database import engine, Base
from models.game import Game
from models.game_stats import GameStats
from models.game_scores import GameScores

Base.metadata.create_all(bind=engine)
print("DB updated")
from sqlalchemy import Column, Integer, Float, String
from database import Base

class GameScores(Base):
    __tablename__ = "game_scores"

    appid = Column(Integer, primary_key=True, index=True)
    name = Column(String)  # 🔥 NEW

    hidden_gem_score = Column(Float)
    value_score = Column(Float)
    toxic_score = Column(Float)
    popularity_score = Column(Float)
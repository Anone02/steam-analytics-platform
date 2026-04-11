from sqlalchemy import Column, Integer, Float, String
from database import Base

class GameStats(Base):
    __tablename__ = "game_stats"

    appid = Column(Integer, primary_key=True, index=True)
    name = Column(String)  # 🔥 NEW

    price = Column(Float)
    genres = Column(String)
    owners = Column(String)
    avg_playtime = Column(Float)
    positive = Column(Integer)
    negative = Column(Integer)
    review_count = Column(Integer)
    positive_ratio = Column(Float)
from sqlalchemy import Column, Integer, String
from database import Base

class Game(Base):
    __tablename__ = "games"

    appid = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    type = Column(String)
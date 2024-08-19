from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Report(Base):
    __tablename__ = 'reports'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)  # Change to Integer
    player_id = Column(String, nullable=True)
    team_id = Column(String, nullable=True)
    game_id = Column(String, nullable=True)
    play_id = Column(String, nullable=True)
    grade = Column(Float, nullable=False)
    summary = Column(Text, nullable=False)
    notes = Column(Text, nullable=True)

    user = relationship("User")

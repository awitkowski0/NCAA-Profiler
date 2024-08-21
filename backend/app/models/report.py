from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Report(Base):
    __tablename__ = 'report_table'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user_table.id'), nullable=False)
    player_id = Column(String, nullable=True)
    team_id = Column(String, nullable=True)
    game_id = Column(String, nullable=True)
    play_id = Column(String, nullable=True)
    grade = Column(Float, nullable=True)
    summary = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)

    user = relationship("User")
from sqlalchemy import Column, Integer, String, DateTime,Boolean
from database import Base
import datetime

class TokenTable(Base):
    __tablename__ = 'token_table'
    user_id = Column(Integer)
    access_token = Column(String(450), primary_key=True)
    refresh_token = Column(String(450), nullable=False)
    status = Column(Boolean)
    created_date = Column(DateTime, default=datetime.datetime.now)
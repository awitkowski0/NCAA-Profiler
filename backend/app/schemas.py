from typing import Optional
from pydantic import BaseModel
import datetime

class UserCreate(BaseModel):
    username: str
    password: str

class RequestDetails(BaseModel):
    username:str
    password:str
        
class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str

class TokenCreate(BaseModel):
    user_id:str
    access_token:str
    refresh_token:str
    status:bool
    created_date:datetime.datetime

class ReportCreate(BaseModel):
    user_id: str
    player_id: Optional[str] = None
    team_id: Optional[str] = None
    game_id: Optional[str] = None
    play_id: Optional[str] = None
    grade: float
    summary: str
    notes: Optional[str] = None


class Report(ReportCreate):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        orm_mode = True
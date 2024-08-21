from typing import Optional
from pydantic import BaseModel
import datetime

class UserCreate(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    username: str

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
    player_id: Optional[str] = None
    team_id: Optional[str] = None
    game_id: Optional[str] = None
    play_id: Optional[str] = None
    grade: Optional[float] = None
    summary: Optional[str] = None
    notes: Optional[str] = None


class Report(ReportCreate):
    id: int
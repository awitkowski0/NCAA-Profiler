from typing import List, Optional
from pydantic import BaseModel

class Game(BaseModel):
    week: int
    game_key: str
    game_id: str
    game_date: str
    game_time: str
    visitor_team: str
    visitor_score: int
    home_team: str
    home_score: int
    is_home: bool
    result: str

class TeamSeason(BaseModel):
    team: str
    season: int
    games: List[Game]
    bye_week: List[int]
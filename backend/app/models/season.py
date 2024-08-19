from enum import Enum
from typing import Any, List, TypeVar, Type, Callable, cast


T = TypeVar("T")
EnumT = TypeVar("EnumT", bound=Enum)


def from_int(x: Any) -> int:
    assert isinstance(x, int) and not isinstance(x, bool)
    return x


def from_str(x: Any) -> str:
    assert isinstance(x, str)
    return x


def from_none(x: Any) -> Any:
    assert x is None
    return x


def from_bool(x: Any) -> bool:
    assert isinstance(x, bool)
    return x


def to_enum(c: Type[EnumT], x: Any) -> EnumT:
    assert isinstance(x, c)
    return x.value


def from_list(f: Callable[[Any], T], x: Any) -> List[T]:
    assert isinstance(x, list)
    return [f(y) for y in x]


def to_class(c: Type[T], x: Any) -> dict:
    assert isinstance(x, c)
    return cast(Any, x).to_dict()


class GameTime(Enum):
    THE_0000 = "00:00"
    THE_0100 = "01:00"
    THE_0115 = "01:15"
    THE_0200 = "02:00"
    THE_1500 = "15:00"
    THE_1600 = "16:00"
    THE_1630 = "16:30"
    THE_1700 = "17:00"
    THE_1730 = "17:30"
    THE_1800 = "18:00"
    THE_1830 = "18:30"
    THE_1900 = "19:00"
    THE_1930 = "19:30"
    THE_2000 = "20:00"
    THE_2030 = "20:30"
    THE_2100 = "21:00"
    THE_2130 = "21:30"
    THE_2200 = "22:00"
    THE_2230 = "22:30"
    THE_2300 = "23:00"
    THE_2330 = "23:30"


class Game:
    week: int
    game_key: int
    game_id: int
    game_date: str
    game_time: GameTime
    visitor_team: str
    visitor_score: None
    home_team: str
    home_score: None
    is_home: bool
    result: None

    def __init__(self, week: int, game_key: int, game_id: int, game_date: str, game_time: GameTime, visitor_team: str, visitor_score: None, home_team: str, home_score: None, is_home: bool, result: None) -> None:
        self.week = week
        self.game_key = game_key
        self.game_id = game_id
        self.game_date = game_date
        self.game_time = game_time
        self.visitor_team = visitor_team
        self.visitor_score = visitor_score
        self.home_team = home_team
        self.home_score = home_score
        self.is_home = is_home
        self.result = result

    @staticmethod
    def from_dict(obj: Any) -> 'Game':
        assert isinstance(obj, dict)
        week = from_int(obj.get("week"))
        game_key = int(from_str(obj.get("game_key")))
        game_id = int(from_str(obj.get("game_id")))
        game_date = from_str(obj.get("game_date"))
        game_time = GameTime(obj.get("game_time"))
        visitor_team = from_str(obj.get("visitor_team"))
        visitor_score = from_none(obj.get("visitor_score"))
        home_team = from_str(obj.get("home_team"))
        home_score = from_none(obj.get("home_score"))
        is_home = from_bool(obj.get("is_home"))
        result = from_none(obj.get("result"))
        return Game(week, game_key, game_id, game_date, game_time, visitor_team, visitor_score, home_team, home_score, is_home, result)

    def to_dict(self) -> dict:
        result: dict = {}
        result["week"] = from_int(self.week)
        result["game_key"] = from_str(str(self.game_key))
        result["game_id"] = from_str(str(self.game_id))
        result["game_date"] = from_str(self.game_date)
        result["game_time"] = to_enum(GameTime, self.game_time)
        result["visitor_team"] = from_str(self.visitor_team)
        result["visitor_score"] = from_none(self.visitor_score)
        result["home_team"] = from_str(self.home_team)
        result["home_score"] = from_none(self.home_score)
        result["is_home"] = from_bool(self.is_home)
        result["result"] = from_none(self.result)
        return result


class SeasonElement:
    team: str
    season: int
    games: List[Game]
    bye_week: List[int]

    def __init__(self, team: str, season: int, games: List[Game], bye_week: List[int]) -> None:
        self.team = team
        self.season = season
        self.games = games
        self.bye_week = bye_week

    @staticmethod
    def from_dict(obj: Any) -> 'SeasonElement':
        assert isinstance(obj, dict)
        team = from_str(obj.get("team"))
        season = from_int(obj.get("season"))
        games = from_list(Game.from_dict, obj.get("games"))
        bye_week = from_list(from_int, obj.get("bye_week"))
        return SeasonElement(team, season, games, bye_week)

    def to_dict(self) -> dict:
        result: dict = {}
        result["team"] = from_str(self.team)
        result["season"] = from_int(self.season)
        result["games"] = from_list(lambda x: to_class(Game, x), self.games)
        result["bye_week"] = from_list(from_int, self.bye_week)
        return result


def season_from_dict(s: Any) -> List[SeasonElement]:
    return from_list(SeasonElement.from_dict, s)


def season_to_dict(x: List[SeasonElement]) -> Any:
    return from_list(lambda x: to_class(SeasonElement, x), x)

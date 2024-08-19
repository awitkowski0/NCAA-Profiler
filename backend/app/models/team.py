from typing import Any, List, Optional, TypeVar, Callable, Type, cast
from datetime import datetime
import dateutil.parser


T = TypeVar("T")


def from_str(x: Any) -> str:
    assert isinstance(x, str)
    return x


def from_int(x: Any) -> int:
    assert isinstance(x, int) and not isinstance(x, bool)
    return x


def from_list(f: Callable[[Any], T], x: Any) -> List[T]:
    assert isinstance(x, list)
    return [f(y) for y in x]


def from_none(x: Any) -> Any:
    assert x is None
    return x


def from_union(fs, x):
    for f in fs:
        try:
            return f(x)
        except:
            pass
    assert False


def from_datetime(x: Any) -> datetime:
    return dateutil.parser.parse(x)


def from_bool(x: Any) -> bool:
    assert isinstance(x, bool)
    return x


def to_class(c: Type[T], x: Any) -> dict:
    assert isinstance(x, c)
    return cast(Any, x).to_dict()


class ColorMetadata:
    background_color_ref: str
    dark_color_ref: str
    foreground_color: str
    helmet_color_ref: str
    jersey_color_ref: str
    light_color_ref: str
    primary_color: str
    secondary_color: str
    tertiary_color: str

    def __init__(self, background_color_ref: str, dark_color_ref: str, foreground_color: str, helmet_color_ref: str, jersey_color_ref: str, light_color_ref: str, primary_color: str, secondary_color: str, tertiary_color: str) -> None:
        self.background_color_ref = background_color_ref
        self.dark_color_ref = dark_color_ref
        self.foreground_color = foreground_color
        self.helmet_color_ref = helmet_color_ref
        self.jersey_color_ref = jersey_color_ref
        self.light_color_ref = light_color_ref
        self.primary_color = primary_color
        self.secondary_color = secondary_color
        self.tertiary_color = tertiary_color

    @staticmethod
    def from_dict(obj: Any) -> 'ColorMetadata':
        assert isinstance(obj, dict)
        background_color_ref = from_str(obj.get("background_color_ref"))
        dark_color_ref = from_str(obj.get("dark_color_ref"))
        foreground_color = from_str(obj.get("foreground_color"))
        helmet_color_ref = from_str(obj.get("helmet_color_ref"))
        jersey_color_ref = from_str(obj.get("jersey_color_ref"))
        light_color_ref = from_str(obj.get("light_color_ref"))
        primary_color = from_str(obj.get("primary_color"))
        secondary_color = from_str(obj.get("secondary_color"))
        tertiary_color = from_str(obj.get("tertiary_color"))
        return ColorMetadata(background_color_ref, dark_color_ref, foreground_color, helmet_color_ref, jersey_color_ref, light_color_ref, primary_color, secondary_color, tertiary_color)

    def to_dict(self) -> dict:
        result: dict = {}
        result["background_color_ref"] = from_str(self.background_color_ref)
        result["dark_color_ref"] = from_str(self.dark_color_ref)
        result["foreground_color"] = from_str(self.foreground_color)
        result["helmet_color_ref"] = from_str(self.helmet_color_ref)
        result["jersey_color_ref"] = from_str(self.jersey_color_ref)
        result["light_color_ref"] = from_str(self.light_color_ref)
        result["primary_color"] = from_str(self.primary_color)
        result["secondary_color"] = from_str(self.secondary_color)
        result["tertiary_color"] = from_str(self.tertiary_color)
        return result


class Conference:
    full_name: str
    id: str
    id_number: int

    def __init__(self, full_name: str, id: str, id_number: int) -> None:
        self.full_name = full_name
        self.id = id
        self.id_number = id_number

    @staticmethod
    def from_dict(obj: Any) -> 'Conference':
        assert isinstance(obj, dict)
        full_name = from_str(obj.get("fullName"))
        id = from_str(obj.get("id"))
        id_number = from_int(obj.get("id_number"))
        return Conference(full_name, id, id_number)

    def to_dict(self) -> dict:
        result: dict = {}
        result["fullName"] = from_str(self.full_name)
        result["id"] = from_str(self.id)
        result["id_number"] = from_int(self.id_number)
        return result


class Group:
    end_season: int
    heirarchy: List[int]
    hierarchy: List[int]
    id: int
    league_id: int
    name: str
    parent_id: Optional[int]
    slug: str
    start_season: int
    type: str
    league: str
    display_order: int

    def __init__(self, end_season: int, heirarchy: List[int], hierarchy: List[int], id: int, league_id: int, name: str, parent_id: Optional[int], slug: str, start_season: int, type: str, league: str, display_order: int) -> None:
        self.end_season = end_season
        self.heirarchy = heirarchy
        self.hierarchy = hierarchy
        self.id = id
        self.league_id = league_id
        self.name = name
        self.parent_id = parent_id
        self.slug = slug
        self.start_season = start_season
        self.type = type
        self.league = league
        self.display_order = display_order

    @staticmethod
    def from_dict(obj: Any) -> 'Group':
        assert isinstance(obj, dict)
        end_season = from_int(obj.get("end_season"))
        heirarchy = from_list(from_int, obj.get("heirarchy"))
        hierarchy = from_list(from_int, obj.get("hierarchy"))
        id = from_int(obj.get("id"))
        league_id = from_int(obj.get("league_id"))
        name = from_str(obj.get("name"))
        parent_id = from_union([from_none, from_int], obj.get("parent_id"))
        slug = from_str(obj.get("slug"))
        start_season = from_int(obj.get("start_season"))
        type = from_str(obj.get("type"))
        league = from_str(obj.get("league"))
        display_order = from_int(obj.get("display_order"))
        return Group(end_season, heirarchy, hierarchy, id, league_id, name, parent_id, slug, start_season, type, league, display_order)

    def to_dict(self) -> dict:
        result: dict = {}
        result["end_season"] = from_int(self.end_season)
        result["heirarchy"] = from_list(from_int, self.heirarchy)
        result["hierarchy"] = from_list(from_int, self.hierarchy)
        result["id"] = from_int(self.id)
        result["league_id"] = from_int(self.league_id)
        result["name"] = from_str(self.name)
        result["parent_id"] = from_union([from_none, from_int], self.parent_id)
        result["slug"] = from_str(self.slug)
        result["start_season"] = from_int(self.start_season)
        result["type"] = from_str(self.type)
        result["league"] = from_str(self.league)
        result["display_order"] = from_int(self.display_order)
        return result


class Team:
    id: str
    abbreviation: str
    city: str
    color_metadata: ColorMetadata
    display_abbreviation: str
    end_season: int
    franchise_id: int
    groups: List[Group]
    gsis_abbreviation: str
    team_id: None
    league: str
    league_id: int
    mid_abbreviation: str
    nickname: str
    pff_twitter_handle: None
    primary_color: str
    secondary_color: str
    slug: str
    sportradar_id: None
    start_season: int
    tertiary_color: str
    tv_abbreviation: str
    twitter_handle: None
    updated_at: datetime
    purple_team_id: str
    csv_conference: str
    csv_conference_logo: str
    csv_team: str
    csv_team_logo: str
    csv_team_id: int
    csv_tk: str
    csv_ncaa_id: int
    csv_color: str
    csv_shortname: str
    csv_seo_name: str
    csv_six_char_abbr: str
    fbs: bool
    fcs: bool
    group: str
    power_five: bool
    group_of_five: bool
    independent: bool
    conference: Conference
    division: None
    conference_abbr: str
    level: str
    nick: str
    team_team_id: int
    team_type: str
    abbr: str
    city_state: str
    full_name: str
    source: str
    season: int
    last_updt_ts: datetime

    def __init__(self, id: str, abbreviation: str, city: str, color_metadata: ColorMetadata, display_abbreviation: str, end_season: int, franchise_id: int, groups: List[Group], gsis_abbreviation: str, team_id: None, league: str, league_id: int, mid_abbreviation: str, nickname: str, pff_twitter_handle: None, primary_color: str, secondary_color: str, slug: str, sportradar_id: None, start_season: int, tertiary_color: str, tv_abbreviation: str, twitter_handle: None, updated_at: datetime, purple_team_id: str, csv_conference: str, csv_conference_logo: str, csv_team: str, csv_team_logo: str, csv_team_id: int, csv_tk: str, csv_ncaa_id: int, csv_color: str, csv_shortname: str, csv_seo_name: str, csv_six_char_abbr: str, fbs: bool, fcs: bool, group: str, power_five: bool, group_of_five: bool, independent: bool, conference: Conference, division: None, conference_abbr: str, level: str, nick: str, team_team_id: int, team_type: str, abbr: str, city_state: str, full_name: str, source: str, season: int, last_updt_ts: datetime) -> None:
        self.id = id
        self.abbreviation = abbreviation
        self.city = city
        self.color_metadata = color_metadata
        self.display_abbreviation = display_abbreviation
        self.end_season = end_season
        self.franchise_id = franchise_id
        self.groups = groups
        self.gsis_abbreviation = gsis_abbreviation
        self.team_id = team_id
        self.league = league
        self.league_id = league_id
        self.mid_abbreviation = mid_abbreviation
        self.nickname = nickname
        self.pff_twitter_handle = pff_twitter_handle
        self.primary_color = primary_color
        self.secondary_color = secondary_color
        self.slug = slug
        self.sportradar_id = sportradar_id
        self.start_season = start_season
        self.tertiary_color = tertiary_color
        self.tv_abbreviation = tv_abbreviation
        self.twitter_handle = twitter_handle
        self.updated_at = updated_at
        self.purple_team_id = purple_team_id
        self.csv_conference = csv_conference
        self.csv_conference_logo = csv_conference_logo
        self.csv_team = csv_team
        self.csv_team_logo = csv_team_logo
        self.csv_team_id = csv_team_id
        self.csv_tk = csv_tk
        self.csv_ncaa_id = csv_ncaa_id
        self.csv_color = csv_color
        self.csv_shortname = csv_shortname
        self.csv_seo_name = csv_seo_name
        self.csv_six_char_abbr = csv_six_char_abbr
        self.fbs = fbs
        self.fcs = fcs
        self.group = group
        self.power_five = power_five
        self.group_of_five = group_of_five
        self.independent = independent
        self.conference = conference
        self.division = division
        self.conference_abbr = conference_abbr
        self.level = level
        self.nick = nick
        self.team_team_id = team_team_id
        self.team_type = team_type
        self.abbr = abbr
        self.city_state = city_state
        self.full_name = full_name
        self.source = source
        self.season = season
        self.last_updt_ts = last_updt_ts

    @staticmethod
    def from_dict(obj: Any) -> 'Team':
        assert isinstance(obj, dict)
        id = from_str(obj.get("_id"))
        abbreviation = from_str(obj.get("abbreviation"))
        city = from_str(obj.get("city"))
        color_metadata = ColorMetadata.from_dict(obj.get("color_metadata"))
        display_abbreviation = from_str(obj.get("display_abbreviation"))
        end_season = from_int(obj.get("end_season"))
        franchise_id = from_int(obj.get("franchise_id"))
        groups = from_list(Group.from_dict, obj.get("groups"))
        gsis_abbreviation = from_str(obj.get("gsis_abbreviation"))
        team_id = from_none(obj.get("id"))
        league = from_str(obj.get("league"))
        league_id = from_int(obj.get("league_id"))
        mid_abbreviation = from_str(obj.get("mid_abbreviation"))
        nickname = from_str(obj.get("nickname"))
        pff_twitter_handle = from_none(obj.get("pff_twitter_handle"))
        primary_color = from_str(obj.get("primary_color"))
        secondary_color = from_str(obj.get("secondary_color"))
        slug = from_str(obj.get("slug"))
        sportradar_id = from_none(obj.get("sportradar_id"))
        start_season = from_int(obj.get("start_season"))
        tertiary_color = from_str(obj.get("tertiary_color"))
        tv_abbreviation = from_str(obj.get("tv_abbreviation"))
        twitter_handle = from_none(obj.get("twitter_handle"))
        updated_at = from_datetime(obj.get("updated_at"))
        purple_team_id = from_str(obj.get("team_id"))
        csv_conference = from_str(obj.get("csv_conference"))
        csv_conference_logo = from_str(obj.get("csv_conference_logo"))
        csv_team = from_str(obj.get("csv_team"))
        csv_team_logo = from_str(obj.get("csv_team_logo"))
        csv_team_id = from_int(obj.get("csv_team_id"))
        csv_tk = from_str(obj.get("csv_tk"))
        csv_ncaa_id = from_int(obj.get("csv_ncaaID"))
        csv_color = from_str(obj.get("csv_color"))
        csv_shortname = from_str(obj.get("csv_shortname"))
        csv_seo_name = from_str(obj.get("csv_seoName"))
        csv_six_char_abbr = from_str(obj.get("csv_sixCharAbbr"))
        fbs = from_bool(obj.get("fbs"))
        fcs = from_bool(obj.get("fcs"))
        group = from_str(obj.get("group"))
        power_five = from_bool(obj.get("power_five"))
        group_of_five = from_bool(obj.get("group_of_five"))
        independent = from_bool(obj.get("independent"))
        conference = Conference.from_dict(obj.get("conference"))
        division = from_none(obj.get("division"))
        conference_abbr = from_str(obj.get("conferenceAbbr"))
        level = from_str(obj.get("level"))
        nick = from_str(obj.get("nick"))
        team_team_id = int(from_str(obj.get("teamId")))
        team_type = from_str(obj.get("teamType"))
        abbr = from_str(obj.get("abbr"))
        city_state = from_str(obj.get("cityState"))
        full_name = from_str(obj.get("fullName"))
        source = from_str(obj.get("source"))
        season = from_int(obj.get("season"))
        last_updt_ts = from_datetime(obj.get("last_updt_ts"))
        return Team(id, abbreviation, city, color_metadata, display_abbreviation, end_season, franchise_id, groups, gsis_abbreviation, team_id, league, league_id, mid_abbreviation, nickname, pff_twitter_handle, primary_color, secondary_color, slug, sportradar_id, start_season, tertiary_color, tv_abbreviation, twitter_handle, updated_at, purple_team_id, csv_conference, csv_conference_logo, csv_team, csv_team_logo, csv_team_id, csv_tk, csv_ncaa_id, csv_color, csv_shortname, csv_seo_name, csv_six_char_abbr, fbs, fcs, group, power_five, group_of_five, independent, conference, division, conference_abbr, level, nick, team_team_id, team_type, abbr, city_state, full_name, source, season, last_updt_ts)

    def to_dict(self) -> dict:
        result: dict = {}
        result["_id"] = from_str(self.id)
        result["abbreviation"] = from_str(self.abbreviation)
        result["city"] = from_str(self.city)
        result["color_metadata"] = to_class(ColorMetadata, self.color_metadata)
        result["display_abbreviation"] = from_str(self.display_abbreviation)
        result["end_season"] = from_int(self.end_season)
        result["franchise_id"] = from_int(self.franchise_id)
        result["groups"] = from_list(lambda x: to_class(Group, x), self.groups)
        result["gsis_abbreviation"] = from_str(self.gsis_abbreviation)
        result["id"] = from_none(self.team_id)
        result["league"] = from_str(self.league)
        result["league_id"] = from_int(self.league_id)
        result["mid_abbreviation"] = from_str(self.mid_abbreviation)
        result["nickname"] = from_str(self.nickname)
        result["pff_twitter_handle"] = from_none(self.pff_twitter_handle)
        result["primary_color"] = from_str(self.primary_color)
        result["secondary_color"] = from_str(self.secondary_color)
        result["slug"] = from_str(self.slug)
        result["sportradar_id"] = from_none(self.sportradar_id)
        result["start_season"] = from_int(self.start_season)
        result["tertiary_color"] = from_str(self.tertiary_color)
        result["tv_abbreviation"] = from_str(self.tv_abbreviation)
        result["twitter_handle"] = from_none(self.twitter_handle)
        result["updated_at"] = self.updated_at.isoformat()
        result["team_id"] = from_str(self.purple_team_id)
        result["csv_conference"] = from_str(self.csv_conference)
        result["csv_conference_logo"] = from_str(self.csv_conference_logo)
        result["csv_team"] = from_str(self.csv_team)
        result["csv_team_logo"] = from_str(self.csv_team_logo)
        result["csv_team_id"] = from_int(self.csv_team_id)
        result["csv_tk"] = from_str(self.csv_tk)
        result["csv_ncaaID"] = from_int(self.csv_ncaa_id)
        result["csv_color"] = from_str(self.csv_color)
        result["csv_shortname"] = from_str(self.csv_shortname)
        result["csv_seoName"] = from_str(self.csv_seo_name)
        result["csv_sixCharAbbr"] = from_str(self.csv_six_char_abbr)
        result["fbs"] = from_bool(self.fbs)
        result["fcs"] = from_bool(self.fcs)
        result["group"] = from_str(self.group)
        result["power_five"] = from_bool(self.power_five)
        result["group_of_five"] = from_bool(self.group_of_five)
        result["independent"] = from_bool(self.independent)
        result["conference"] = to_class(Conference, self.conference)
        result["division"] = from_none(self.division)
        result["conferenceAbbr"] = from_str(self.conference_abbr)
        result["level"] = from_str(self.level)
        result["nick"] = from_str(self.nick)
        result["teamId"] = from_str(str(self.team_team_id))
        result["teamType"] = from_str(self.team_type)
        result["abbr"] = from_str(self.abbr)
        result["cityState"] = from_str(self.city_state)
        result["fullName"] = from_str(self.full_name)
        result["source"] = from_str(self.source)
        result["season"] = from_int(self.season)
        result["last_updt_ts"] = self.last_updt_ts.isoformat()
        return result


def team_from_dict(s: Any) -> Team:
    return Team.from_dict(s)


def team_to_dict(x: Team) -> Any:
    return to_class(Team, x)

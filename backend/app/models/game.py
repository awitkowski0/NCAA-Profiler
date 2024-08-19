from enum import Enum
from typing import Optional, Any, List, Dict, TypeVar, Type, cast, Callable
from datetime import datetime
import dateutil.parser


T = TypeVar("T")
EnumT = TypeVar("EnumT", bound=Enum)


def from_float(x: Any) -> float:
    assert isinstance(x, (float, int)) and not isinstance(x, bool)
    return float(x)


def from_int(x: Any) -> int:
    assert isinstance(x, int) and not isinstance(x, bool)
    return x


def from_str(x: Any) -> str:
    assert isinstance(x, str)
    return x


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


def from_bool(x: Any) -> bool:
    assert isinstance(x, bool)
    return x


def to_enum(c: Type[EnumT], x: Any) -> EnumT:
    assert isinstance(x, c)
    return x.value


def to_float(x: Any) -> float:
    assert isinstance(x, (int, float))
    return x


def to_class(c: Type[T], x: Any) -> dict:
    assert isinstance(x, c)
    return cast(Any, x).to_dict()


def from_list(f: Callable[[Any], T], x: Any) -> List[T]:
    assert isinstance(x, list)
    return [f(y) for y in x]


def from_dict(f: Callable[[Any], T], x: Any) -> Dict[str, T]:
    assert isinstance(x, dict)
    return { k: f(v) for (k, v) in x.items() }


def from_datetime(x: Any) -> datetime:
    return dateutil.parser.parse(x)


class PurplePffRole(Enum):
    COVERAGE = "Coverage"
    PASS_RUSH = "Pass Rush"


class PurplePff:
    pff_role: PurplePffRole
    pff_grade: float
    player_depth: int
    stance_type: str
    pff_press: Optional[str]
    pff_deftechnique: Optional[int]
    box_player: Optional[bool]
    pff_pressure: Optional[str]
    pff_hit: Optional[str]
    pff_hurry: Optional[str]

    def __init__(self, pff_role: PurplePffRole, pff_grade: float, player_depth: int, stance_type: str, pff_press: Optional[str], pff_deftechnique: Optional[int], box_player: Optional[bool], pff_pressure: Optional[str], pff_hit: Optional[str], pff_hurry: Optional[str]) -> None:
        self.pff_role = pff_role
        self.pff_grade = pff_grade
        self.player_depth = player_depth
        self.stance_type = stance_type
        self.pff_press = pff_press
        self.pff_deftechnique = pff_deftechnique
        self.box_player = box_player
        self.pff_pressure = pff_pressure
        self.pff_hit = pff_hit
        self.pff_hurry = pff_hurry

    @staticmethod
    def from_dict(obj: Any) -> 'PurplePff':
        assert isinstance(obj, dict)
        pff_role = PurplePffRole(obj.get("pff_role"))
        pff_grade = from_float(obj.get("pff_grade"))
        player_depth = from_int(obj.get("player_depth"))
        stance_type = from_str(obj.get("stance_type"))
        pff_press = from_union([from_str, from_none], obj.get("pff_press"))
        pff_deftechnique = from_union([from_int, from_none], obj.get("pff_deftechnique"))
        box_player = from_union([from_bool, from_none], obj.get("box_player"))
        pff_pressure = from_union([from_str, from_none], obj.get("pff_pressure"))
        pff_hit = from_union([from_str, from_none], obj.get("pff_hit"))
        pff_hurry = from_union([from_str, from_none], obj.get("pff_hurry"))
        return PurplePff(pff_role, pff_grade, player_depth, stance_type, pff_press, pff_deftechnique, box_player, pff_pressure, pff_hit, pff_hurry)

    def to_dict(self) -> dict:
        result: dict = {}
        result["pff_role"] = to_enum(PurplePffRole, self.pff_role)
        result["pff_grade"] = to_float(self.pff_grade)
        result["player_depth"] = from_int(self.player_depth)
        result["stance_type"] = from_str(self.stance_type)
        if self.pff_press is not None:
            result["pff_press"] = from_union([from_str, from_none], self.pff_press)
        if self.pff_deftechnique is not None:
            result["pff_deftechnique"] = from_union([from_int, from_none], self.pff_deftechnique)
        if self.box_player is not None:
            result["box_player"] = from_union([from_bool, from_none], self.box_player)
        if self.pff_pressure is not None:
            result["pff_pressure"] = from_union([from_str, from_none], self.pff_pressure)
        if self.pff_hit is not None:
            result["pff_hit"] = from_union([from_str, from_none], self.pff_hit)
        if self.pff_hurry is not None:
            result["pff_hurry"] = from_union([from_str, from_none], self.pff_hurry)
        return result


class DPathCustom:
    pff: PurplePff

    def __init__(self, pff: PurplePff) -> None:
        self.pff = pff

    @staticmethod
    def from_dict(obj: Any) -> 'DPathCustom':
        assert isinstance(obj, dict)
        pff = PurplePff.from_dict(obj.get("pff"))
        return DPathCustom(pff)

    def to_dict(self) -> dict:
        result: dict = {}
        result["pff"] = to_class(PurplePff, self.pff)
        return result


class KalmanAlignment:
    start: int
    end: int

    def __init__(self, start: int, end: int) -> None:
        self.start = start
        self.end = end

    @staticmethod
    def from_dict(obj: Any) -> 'KalmanAlignment':
        assert isinstance(obj, dict)
        start = from_int(obj.get("start"))
        end = from_int(obj.get("end"))
        return KalmanAlignment(start, end)

    def to_dict(self) -> dict:
        result: dict = {}
        result["start"] = from_int(self.start)
        result["end"] = from_int(self.end)
        return result


class PosGroup(Enum):
    DB = "DB"
    DL = "DL"
    LB = "LB"
    OL = "OL"
    QB = "QB"
    RB = "RB"
    TE = "TE"
    WR = "WR"


class Player:
    id: Optional[str]
    jersey: int
    pos_group: PosGroup
    position: str
    short_name: str
    player_id: Optional[str]

    def __init__(self, id: Optional[str], jersey: int, pos_group: PosGroup, position: str, short_name: str, player_id: Optional[str]) -> None:
        self.id = id
        self.jersey = jersey
        self.pos_group = pos_group
        self.position = position
        self.short_name = short_name
        self.player_id = player_id

    @staticmethod
    def from_dict(obj: Any) -> 'Player':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("_id"))
        jersey = from_int(obj.get("jersey"))
        pos_group = PosGroup(obj.get("pos_group"))
        position = from_str(obj.get("position"))
        short_name = from_str(obj.get("short_name"))
        player_id = from_union([from_str, from_none], obj.get("player_id"))
        return Player(id, jersey, pos_group, position, short_name, player_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["_id"] = from_union([from_str, from_none], self.id)
        result["jersey"] = from_int(self.jersey)
        result["pos_group"] = to_enum(PosGroup, self.pos_group)
        result["position"] = from_str(self.position)
        result["short_name"] = from_str(self.short_name)
        if self.player_id is not None:
            result["player_id"] = from_union([from_str, from_none], self.player_id)
        return result


class DPathMatchup:
    player: Player
    team: str
    rel0: List[float]
    skill_num: str
    lua: str

    def __init__(self, player: Player, team: str, rel0: List[float], skill_num: str, lua: str) -> None:
        self.player = player
        self.team = team
        self.rel0 = rel0
        self.skill_num = skill_num
        self.lua = lua

    @staticmethod
    def from_dict(obj: Any) -> 'DPathMatchup':
        assert isinstance(obj, dict)
        player = Player.from_dict(obj.get("player"))
        team = from_str(obj.get("team"))
        rel0 = from_list(from_float, obj.get("rel0"))
        skill_num = from_str(obj.get("skill_num"))
        lua = from_str(obj.get("lua"))
        return DPathMatchup(player, team, rel0, skill_num, lua)

    def to_dict(self) -> dict:
        result: dict = {}
        result["player"] = to_class(Player, self.player)
        result["team"] = from_str(self.team)
        result["rel0"] = from_list(to_float, self.rel0)
        result["skill_num"] = from_str(self.skill_num)
        result["lua"] = from_str(self.lua)
        return result


class DPathMatchupPostsnap:
    player: Player
    separation: float

    def __init__(self, player: Player, separation: float) -> None:
        self.player = player
        self.separation = separation

    @staticmethod
    def from_dict(obj: Any) -> 'DPathMatchupPostsnap':
        assert isinstance(obj, dict)
        player = Player.from_dict(obj.get("player"))
        separation = from_float(obj.get("separation"))
        return DPathMatchupPostsnap(player, separation)

    def to_dict(self) -> dict:
        result: dict = {}
        result["player"] = to_class(Player, self.player)
        result["separation"] = to_float(self.separation)
        return result


class Pressure:
    player: Player
    team: Optional[str]
    distance: float
    lua: str

    def __init__(self, player: Player, team: Optional[str], distance: float, lua: str) -> None:
        self.player = player
        self.team = team
        self.distance = distance
        self.lua = lua

    @staticmethod
    def from_dict(obj: Any) -> 'Pressure':
        assert isinstance(obj, dict)
        player = Player.from_dict(obj.get("player"))
        team = from_union([from_str, from_none], obj.get("team"))
        distance = from_float(obj.get("distance"))
        lua = from_str(obj.get("lua"))
        return Pressure(player, team, distance, lua)

    def to_dict(self) -> dict:
        result: dict = {}
        result["player"] = to_class(Player, self.player)
        if self.team is not None:
            result["team"] = from_union([from_str, from_none], self.team)
        result["distance"] = to_float(self.distance)
        result["lua"] = from_str(self.lua)
        return result


class MaxCel:
    frame: int
    max: float

    def __init__(self, frame: int, max: float) -> None:
        self.frame = frame
        self.max = max

    @staticmethod
    def from_dict(obj: Any) -> 'MaxCel':
        assert isinstance(obj, dict)
        frame = from_int(obj.get("frame"))
        max = from_float(obj.get("max"))
        return MaxCel(frame, max)

    def to_dict(self) -> dict:
        result: dict = {}
        result["frame"] = from_int(self.frame)
        result["max"] = to_float(self.max)
        return result


class DPath:
    passes_homography_qc: bool
    pff_player_id: int
    player: Player
    rel0: List[float]
    pff_rel0: List[float]
    lua: str
    abs_path: List[List[float]]
    raw_path: List[List[float]]
    rel_path: List[List[float]]
    play_path: List[List[float]]
    n_frames_on_screen: int
    kalman_path: List[List[float]]
    kalman_path_w_motion: List[List[float]]
    kalman_speed: List[float]
    kalman_acceleration: List[float]
    kalman_direction: List[int]
    kalman_distance: List[float]
    deltad: List[float]
    max_speed: float
    kalman_alignment: KalmanAlignment
    play_travelled: float
    dist_travelled: float
    max_accel: MaxCel
    max_decel: MaxCel
    hs_yards: int
    speed_profile: List[float]
    max_speed_first_10_yds: float
    max_speed_10_yds_20_yds: Optional[float]
    avg_speed_over_10_yds: float
    avg_speed_over_20_yds: Optional[float]
    pixel_path: List[List[int]]
    on_line: bool
    stance_3_pt: bool
    stance_2_pt: bool
    in_box: bool
    rating: str
    pass_rusher: bool
    in_press: bool
    custom: DPathCustom
    matchup: Optional[DPathMatchup]
    doubleteamed_postsnap: bool
    the_1_v1_postsnap: bool
    matchup_postsnap: Optional[DPathMatchupPostsnap]
    move: Optional[str]
    pass_rush: bool
    unblocked: bool
    pass_rush_win: bool
    telemetry_position_group: str
    telemetry_position: str
    matchups: Optional[List[Pressure]]
    the_2_pt_stance_detail: Optional[str]

    def __init__(self, passes_homography_qc: bool, pff_player_id: int, player: Player, rel0: List[float], pff_rel0: List[float], lua: str, abs_path: List[List[float]], raw_path: List[List[float]], rel_path: List[List[float]], play_path: List[List[float]], n_frames_on_screen: int, kalman_path: List[List[float]], kalman_path_w_motion: List[List[float]], kalman_speed: List[float], kalman_acceleration: List[float], kalman_direction: List[int], kalman_distance: List[float], deltad: List[float], max_speed: float, kalman_alignment: KalmanAlignment, play_travelled: float, dist_travelled: float, max_accel: MaxCel, max_decel: MaxCel, hs_yards: int, speed_profile: List[float], max_speed_first_10_yds: float, max_speed_10_yds_20_yds: Optional[float], avg_speed_over_10_yds: float, avg_speed_over_20_yds: Optional[float], pixel_path: List[List[int]], on_line: bool, stance_3_pt: bool, stance_2_pt: bool, in_box: bool, rating: str, pass_rusher: bool, in_press: bool, custom: DPathCustom, matchup: Optional[DPathMatchup], doubleteamed_postsnap: bool, the_1_v1_postsnap: bool, matchup_postsnap: Optional[DPathMatchupPostsnap], move: Optional[str], pass_rush: bool, unblocked: bool, pass_rush_win: bool, telemetry_position_group: str, telemetry_position: str, matchups: Optional[List[Pressure]], the_2_pt_stance_detail: Optional[str]) -> None:
        self.passes_homography_qc = passes_homography_qc
        self.pff_player_id = pff_player_id
        self.player = player
        self.rel0 = rel0
        self.pff_rel0 = pff_rel0
        self.lua = lua
        self.abs_path = abs_path
        self.raw_path = raw_path
        self.rel_path = rel_path
        self.play_path = play_path
        self.n_frames_on_screen = n_frames_on_screen
        self.kalman_path = kalman_path
        self.kalman_path_w_motion = kalman_path_w_motion
        self.kalman_speed = kalman_speed
        self.kalman_acceleration = kalman_acceleration
        self.kalman_direction = kalman_direction
        self.kalman_distance = kalman_distance
        self.deltad = deltad
        self.max_speed = max_speed
        self.kalman_alignment = kalman_alignment
        self.play_travelled = play_travelled
        self.dist_travelled = dist_travelled
        self.max_accel = max_accel
        self.max_decel = max_decel
        self.hs_yards = hs_yards
        self.speed_profile = speed_profile
        self.max_speed_first_10_yds = max_speed_first_10_yds
        self.max_speed_10_yds_20_yds = max_speed_10_yds_20_yds
        self.avg_speed_over_10_yds = avg_speed_over_10_yds
        self.avg_speed_over_20_yds = avg_speed_over_20_yds
        self.pixel_path = pixel_path
        self.on_line = on_line
        self.stance_3_pt = stance_3_pt
        self.stance_2_pt = stance_2_pt
        self.in_box = in_box
        self.rating = rating
        self.pass_rusher = pass_rusher
        self.in_press = in_press
        self.custom = custom
        self.matchup = matchup
        self.doubleteamed_postsnap = doubleteamed_postsnap
        self.the_1_v1_postsnap = the_1_v1_postsnap
        self.matchup_postsnap = matchup_postsnap
        self.move = move
        self.pass_rush = pass_rush
        self.unblocked = unblocked
        self.pass_rush_win = pass_rush_win
        self.telemetry_position_group = telemetry_position_group
        self.telemetry_position = telemetry_position
        self.matchups = matchups
        self.the_2_pt_stance_detail = the_2_pt_stance_detail

    @staticmethod
    def from_dict(obj: Any) -> 'DPath':
        assert isinstance(obj, dict)
        passes_homography_qc = from_bool(obj.get("passes_homography_qc"))
        pff_player_id = from_int(obj.get("pff_player_id"))
        player = Player.from_dict(obj.get("player"))
        rel0 = from_list(from_float, obj.get("rel0"))
        pff_rel0 = from_list(from_float, obj.get("pff_rel0"))
        lua = from_str(obj.get("lua"))
        abs_path = from_list(lambda x: from_list(from_float, x), obj.get("abs_path"))
        raw_path = from_list(lambda x: from_list(from_float, x), obj.get("raw_path"))
        rel_path = from_list(lambda x: from_list(from_float, x), obj.get("rel_path"))
        play_path = from_list(lambda x: from_list(from_float, x), obj.get("play_path"))
        n_frames_on_screen = from_int(obj.get("n_frames_on_screen"))
        kalman_path = from_list(lambda x: from_list(from_float, x), obj.get("kalman_path"))
        kalman_path_w_motion = from_list(lambda x: from_list(from_float, x), obj.get("kalman_path_w_motion"))
        kalman_speed = from_list(from_float, obj.get("kalman_speed"))
        kalman_acceleration = from_list(from_float, obj.get("kalman_acceleration"))
        kalman_direction = from_list(from_int, obj.get("kalman_direction"))
        kalman_distance = from_list(from_float, obj.get("kalman_distance"))
        deltad = from_list(from_float, obj.get("deltad"))
        max_speed = from_float(obj.get("max_speed"))
        kalman_alignment = KalmanAlignment.from_dict(obj.get("kalman_alignment"))
        play_travelled = from_float(obj.get("play_travelled"))
        dist_travelled = from_float(obj.get("dist_travelled"))
        max_accel = MaxCel.from_dict(obj.get("max_accel"))
        max_decel = MaxCel.from_dict(obj.get("max_decel"))
        hs_yards = from_int(obj.get("hs_yards"))
        speed_profile = from_list(from_float, obj.get("speed_profile"))
        max_speed_first_10_yds = from_float(obj.get("max_speed_first_10yds"))
        max_speed_10_yds_20_yds = from_union([from_float, from_none], obj.get("max_speed_10yds_20yds"))
        avg_speed_over_10_yds = from_float(obj.get("avg_speed_over_10yds"))
        avg_speed_over_20_yds = from_union([from_float, from_none], obj.get("avg_speed_over_20yds"))
        pixel_path = from_list(lambda x: from_list(from_int, x), obj.get("pixel_path"))
        on_line = from_bool(obj.get("on_line"))
        stance_3_pt = from_bool(obj.get("stance_3pt"))
        stance_2_pt = from_bool(obj.get("stance_2pt"))
        in_box = from_bool(obj.get("in_box"))
        rating = from_str(obj.get("rating"))
        pass_rusher = from_bool(obj.get("pass_rusher"))
        in_press = from_bool(obj.get("in_press"))
        custom = DPathCustom.from_dict(obj.get("custom"))
        matchup = from_union([DPathMatchup.from_dict, from_none], obj.get("matchup"))
        doubleteamed_postsnap = from_bool(obj.get("doubleteamed_postsnap"))
        the_1_v1_postsnap = from_bool(obj.get("1v1_postsnap"))
        matchup_postsnap = from_union([DPathMatchupPostsnap.from_dict, from_none], obj.get("matchup_postsnap"))
        move = from_union([from_str, from_none], obj.get("move"))
        pass_rush = from_bool(obj.get("pass_rush"))
        unblocked = from_bool(obj.get("unblocked"))
        pass_rush_win = from_bool(obj.get("pass_rush_win"))
        telemetry_position_group = from_str(obj.get("telemetry_position_group"))
        telemetry_position = from_str(obj.get("telemetry_position"))
        matchups = from_union([lambda x: from_list(Pressure.from_dict, x), from_none], obj.get("matchups"))
        the_2_pt_stance_detail = from_union([from_str, from_none], obj.get("2pt_stance_detail"))
        return DPath(passes_homography_qc, pff_player_id, player, rel0, pff_rel0, lua, abs_path, raw_path, rel_path, play_path, n_frames_on_screen, kalman_path, kalman_path_w_motion, kalman_speed, kalman_acceleration, kalman_direction, kalman_distance, deltad, max_speed, kalman_alignment, play_travelled, dist_travelled, max_accel, max_decel, hs_yards, speed_profile, max_speed_first_10_yds, max_speed_10_yds_20_yds, avg_speed_over_10_yds, avg_speed_over_20_yds, pixel_path, on_line, stance_3_pt, stance_2_pt, in_box, rating, pass_rusher, in_press, custom, matchup, doubleteamed_postsnap, the_1_v1_postsnap, matchup_postsnap, move, pass_rush, unblocked, pass_rush_win, telemetry_position_group, telemetry_position, matchups, the_2_pt_stance_detail)

    def to_dict(self) -> dict:
        result: dict = {}
        result["passes_homography_qc"] = from_bool(self.passes_homography_qc)
        result["pff_player_id"] = from_int(self.pff_player_id)
        result["player"] = to_class(Player, self.player)
        result["rel0"] = from_list(to_float, self.rel0)
        result["pff_rel0"] = from_list(to_float, self.pff_rel0)
        result["lua"] = from_str(self.lua)
        result["abs_path"] = from_list(lambda x: from_list(to_float, x), self.abs_path)
        result["raw_path"] = from_list(lambda x: from_list(to_float, x), self.raw_path)
        result["rel_path"] = from_list(lambda x: from_list(to_float, x), self.rel_path)
        result["play_path"] = from_list(lambda x: from_list(to_float, x), self.play_path)
        result["n_frames_on_screen"] = from_int(self.n_frames_on_screen)
        result["kalman_path"] = from_list(lambda x: from_list(to_float, x), self.kalman_path)
        result["kalman_path_w_motion"] = from_list(lambda x: from_list(to_float, x), self.kalman_path_w_motion)
        result["kalman_speed"] = from_list(to_float, self.kalman_speed)
        result["kalman_acceleration"] = from_list(to_float, self.kalman_acceleration)
        result["kalman_direction"] = from_list(from_int, self.kalman_direction)
        result["kalman_distance"] = from_list(to_float, self.kalman_distance)
        result["deltad"] = from_list(to_float, self.deltad)
        result["max_speed"] = to_float(self.max_speed)
        result["kalman_alignment"] = to_class(KalmanAlignment, self.kalman_alignment)
        result["play_travelled"] = to_float(self.play_travelled)
        result["dist_travelled"] = to_float(self.dist_travelled)
        result["max_accel"] = to_class(MaxCel, self.max_accel)
        result["max_decel"] = to_class(MaxCel, self.max_decel)
        result["hs_yards"] = from_int(self.hs_yards)
        result["speed_profile"] = from_list(to_float, self.speed_profile)
        result["max_speed_first_10yds"] = to_float(self.max_speed_first_10_yds)
        if self.max_speed_10_yds_20_yds is not None:
            result["max_speed_10yds_20yds"] = from_union([to_float, from_none], self.max_speed_10_yds_20_yds)
        result["avg_speed_over_10yds"] = to_float(self.avg_speed_over_10_yds)
        if self.avg_speed_over_20_yds is not None:
            result["avg_speed_over_20yds"] = from_union([to_float, from_none], self.avg_speed_over_20_yds)
        result["pixel_path"] = from_list(lambda x: from_list(from_int, x), self.pixel_path)
        result["on_line"] = from_bool(self.on_line)
        result["stance_3pt"] = from_bool(self.stance_3_pt)
        result["stance_2pt"] = from_bool(self.stance_2_pt)
        result["in_box"] = from_bool(self.in_box)
        result["rating"] = from_str(self.rating)
        result["pass_rusher"] = from_bool(self.pass_rusher)
        result["in_press"] = from_bool(self.in_press)
        result["custom"] = to_class(DPathCustom, self.custom)
        if self.matchup is not None:
            result["matchup"] = from_union([lambda x: to_class(DPathMatchup, x), from_none], self.matchup)
        result["doubleteamed_postsnap"] = from_bool(self.doubleteamed_postsnap)
        result["1v1_postsnap"] = from_bool(self.the_1_v1_postsnap)
        if self.matchup_postsnap is not None:
            result["matchup_postsnap"] = from_union([lambda x: to_class(DPathMatchupPostsnap, x), from_none], self.matchup_postsnap)
        if self.move is not None:
            result["move"] = from_union([from_str, from_none], self.move)
        result["pass_rush"] = from_bool(self.pass_rush)
        result["unblocked"] = from_bool(self.unblocked)
        result["pass_rush_win"] = from_bool(self.pass_rush_win)
        result["telemetry_position_group"] = from_str(self.telemetry_position_group)
        result["telemetry_position"] = from_str(self.telemetry_position)
        if self.matchups is not None:
            result["matchups"] = from_union([lambda x: from_list(lambda x: to_class(Pressure, x), x), from_none], self.matchups)
        if self.the_2_pt_stance_detail is not None:
            result["2pt_stance_detail"] = from_union([from_str, from_none], self.the_2_pt_stance_detail)
        return result


class Events:
    ball_snap: int
    pass_forward: int
    o_length: int
    d_length: int
    length: int
    pass_arrived: int
    pass_outcome_incomplete: int

    def __init__(self, ball_snap: int, pass_forward: int, o_length: int, d_length: int, length: int, pass_arrived: int, pass_outcome_incomplete: int) -> None:
        self.ball_snap = ball_snap
        self.pass_forward = pass_forward
        self.o_length = o_length
        self.d_length = d_length
        self.length = length
        self.pass_arrived = pass_arrived
        self.pass_outcome_incomplete = pass_outcome_incomplete

    @staticmethod
    def from_dict(obj: Any) -> 'Events':
        assert isinstance(obj, dict)
        ball_snap = from_int(obj.get("ball_snap"))
        pass_forward = from_int(obj.get("pass_forward"))
        o_length = from_int(obj.get("o_length"))
        d_length = from_int(obj.get("d_length"))
        length = from_int(obj.get("length"))
        pass_arrived = from_int(obj.get("pass_arrived"))
        pass_outcome_incomplete = from_int(obj.get("pass_outcome_incomplete"))
        return Events(ball_snap, pass_forward, o_length, d_length, length, pass_arrived, pass_outcome_incomplete)

    def to_dict(self) -> dict:
        result: dict = {}
        result["ball_snap"] = from_int(self.ball_snap)
        result["pass_forward"] = from_int(self.pass_forward)
        result["o_length"] = from_int(self.o_length)
        result["d_length"] = from_int(self.d_length)
        result["length"] = from_int(self.length)
        result["pass_arrived"] = from_int(self.pass_arrived)
        result["pass_outcome_incomplete"] = from_int(self.pass_outcome_incomplete)
        return result


class Formation:
    pass_strength: str
    run_strength: str
    formation_base: str

    def __init__(self, pass_strength: str, run_strength: str, formation_base: str) -> None:
        self.pass_strength = pass_strength
        self.run_strength = run_strength
        self.formation_base = formation_base

    @staticmethod
    def from_dict(obj: Any) -> 'Formation':
        assert isinstance(obj, dict)
        pass_strength = from_str(obj.get("pass_strength"))
        run_strength = from_str(obj.get("run_strength"))
        formation_base = from_str(obj.get("formation_base"))
        return Formation(pass_strength, run_strength, formation_base)

    def to_dict(self) -> dict:
        result: dict = {}
        result["pass_strength"] = from_str(self.pass_strength)
        result["run_strength"] = from_str(self.run_strength)
        result["formation_base"] = from_str(self.formation_base)
        return result


class FluffyPffRole(Enum):
    PASS = "Pass"
    PASS_BLOCK = "Pass Block"
    PASS_ROUTE = "Pass Route"


class FluffyPff:
    motion: str
    pff_grade: int
    pff_role: FluffyPffRole
    stance_type: int
    pff_route: Optional[str]
    pff_route_name: Optional[str]
    route_depth: Optional[int]
    on_los: Optional[str]
    hit_allowed: Optional[str]

    def __init__(self, motion: str, pff_grade: int, pff_role: FluffyPffRole, stance_type: int, pff_route: Optional[str], pff_route_name: Optional[str], route_depth: Optional[int], on_los: Optional[str], hit_allowed: Optional[str]) -> None:
        self.motion = motion
        self.pff_grade = pff_grade
        self.pff_role = pff_role
        self.stance_type = stance_type
        self.pff_route = pff_route
        self.pff_route_name = pff_route_name
        self.route_depth = route_depth
        self.on_los = on_los
        self.hit_allowed = hit_allowed

    @staticmethod
    def from_dict(obj: Any) -> 'FluffyPff':
        assert isinstance(obj, dict)
        motion = from_str(obj.get("motion"))
        pff_grade = from_int(obj.get("pff_grade"))
        pff_role = FluffyPffRole(obj.get("pff_role"))
        stance_type = from_int(obj.get("stance_type"))
        pff_route = from_union([from_str, from_none], obj.get("pff_route"))
        pff_route_name = from_union([from_str, from_none], obj.get("pff_route_name"))
        route_depth = from_union([from_int, from_none], obj.get("route_depth"))
        on_los = from_union([from_str, from_none], obj.get("on_los"))
        hit_allowed = from_union([from_str, from_none], obj.get("hit_allowed"))
        return FluffyPff(motion, pff_grade, pff_role, stance_type, pff_route, pff_route_name, route_depth, on_los, hit_allowed)

    def to_dict(self) -> dict:
        result: dict = {}
        result["motion"] = from_str(self.motion)
        result["pff_grade"] = from_int(self.pff_grade)
        result["pff_role"] = to_enum(FluffyPffRole, self.pff_role)
        result["stance_type"] = from_int(self.stance_type)
        if self.pff_route is not None:
            result["pff_route"] = from_union([from_str, from_none], self.pff_route)
        if self.pff_route_name is not None:
            result["pff_route_name"] = from_union([from_str, from_none], self.pff_route_name)
        if self.route_depth is not None:
            result["route_depth"] = from_union([from_int, from_none], self.route_depth)
        if self.on_los is not None:
            result["on_los"] = from_union([from_str, from_none], self.on_los)
        if self.hit_allowed is not None:
            result["hit_allowed"] = from_union([from_str, from_none], self.hit_allowed)
        return result


class OPathCustom:
    pff: FluffyPff

    def __init__(self, pff: FluffyPff) -> None:
        self.pff = pff

    @staticmethod
    def from_dict(obj: Any) -> 'OPathCustom':
        assert isinstance(obj, dict)
        pff = FluffyPff.from_dict(obj.get("pff"))
        return OPathCustom(pff)

    def to_dict(self) -> dict:
        result: dict = {}
        result["pff"] = to_class(FluffyPff, self.pff)
        return result


class LosOnOff(Enum):
    OFF = "off"
    ON = "on"


class OPathMatchup:
    player: Player
    team: str
    rel0: List[float]

    def __init__(self, player: Player, team: str, rel0: List[float]) -> None:
        self.player = player
        self.team = team
        self.rel0 = rel0

    @staticmethod
    def from_dict(obj: Any) -> 'OPathMatchup':
        assert isinstance(obj, dict)
        player = Player.from_dict(obj.get("player"))
        team = from_str(obj.get("team"))
        rel0 = from_list(from_float, obj.get("rel0"))
        return OPathMatchup(player, team, rel0)

    def to_dict(self) -> dict:
        result: dict = {}
        result["player"] = to_class(Player, self.player)
        result["team"] = from_str(self.team)
        result["rel0"] = from_list(to_float, self.rel0)
        return result


class OPathMatchupPostsnap:
    player: Player

    def __init__(self, player: Player) -> None:
        self.player = player

    @staticmethod
    def from_dict(obj: Any) -> 'OPathMatchupPostsnap':
        assert isinstance(obj, dict)
        player = Player.from_dict(obj.get("player"))
        return OPathMatchupPostsnap(player)

    def to_dict(self) -> dict:
        result: dict = {}
        result["player"] = to_class(Player, self.player)
        return result


class OPath:
    passes_homography_qc: bool
    pff_player_id: int
    player: Player
    rel0: List[float]
    pff_rel0: List[float]
    lua: str
    abs_path: List[List[float]]
    raw_path: List[List[float]]
    rel_path: List[List[float]]
    play_path: List[List[float]]
    n_frames_on_screen: int
    kalman_path: List[List[float]]
    kalman_path_w_motion: List[List[float]]
    kalman_speed: List[float]
    kalman_acceleration: List[float]
    kalman_direction: List[int]
    kalman_distance: List[float]
    deltad: List[float]
    max_speed: float
    kalman_alignment: KalmanAlignment
    play_travelled: float
    dist_travelled: float
    max_accel: MaxCel
    max_decel: MaxCel
    hs_yards: float
    speed_profile: List[float]
    max_speed_first_10_yds: Optional[float]
    max_speed_10_yds_20_yds: Optional[float]
    avg_speed_over_10_yds: Optional[float]
    avg_speed_over_20_yds: Optional[float]
    distance_from_ball: float
    angle_from_ball: float
    emol_rel0_x: Optional[float]
    skill_num: Optional[str]
    los_on_off: LosOnOff
    pixel_path: List[List[int]]
    custom: OPathCustom
    side: Optional[str]
    skill_num_temp: Optional[int]
    rating: str
    matchup: Optional[OPathMatchup]
    tt_release: Optional[float]
    matchup_postsnap: Optional[OPathMatchupPostsnap]
    pff_simple_route: Optional[str]
    targeted: bool
    telemetry_position_group: str
    telemetry_position: str
    combo_block_postsnap: Optional[bool]
    the_1_v1_postsnap: Optional[bool]

    def __init__(self, passes_homography_qc: bool, pff_player_id: int, player: Player, rel0: List[float], pff_rel0: List[float], lua: str, abs_path: List[List[float]], raw_path: List[List[float]], rel_path: List[List[float]], play_path: List[List[float]], n_frames_on_screen: int, kalman_path: List[List[float]], kalman_path_w_motion: List[List[float]], kalman_speed: List[float], kalman_acceleration: List[float], kalman_direction: List[int], kalman_distance: List[float], deltad: List[float], max_speed: float, kalman_alignment: KalmanAlignment, play_travelled: float, dist_travelled: float, max_accel: MaxCel, max_decel: MaxCel, hs_yards: float, speed_profile: List[float], max_speed_first_10_yds: Optional[float], max_speed_10_yds_20_yds: Optional[float], avg_speed_over_10_yds: Optional[float], avg_speed_over_20_yds: Optional[float], distance_from_ball: float, angle_from_ball: float, emol_rel0_x: Optional[float], skill_num: Optional[str], los_on_off: LosOnOff, pixel_path: List[List[int]], custom: OPathCustom, side: Optional[str], skill_num_temp: Optional[int], rating: str, matchup: Optional[OPathMatchup], tt_release: Optional[float], matchup_postsnap: Optional[OPathMatchupPostsnap], pff_simple_route: Optional[str], targeted: bool, telemetry_position_group: str, telemetry_position: str, combo_block_postsnap: Optional[bool], the_1_v1_postsnap: Optional[bool]) -> None:
        self.passes_homography_qc = passes_homography_qc
        self.pff_player_id = pff_player_id
        self.player = player
        self.rel0 = rel0
        self.pff_rel0 = pff_rel0
        self.lua = lua
        self.abs_path = abs_path
        self.raw_path = raw_path
        self.rel_path = rel_path
        self.play_path = play_path
        self.n_frames_on_screen = n_frames_on_screen
        self.kalman_path = kalman_path
        self.kalman_path_w_motion = kalman_path_w_motion
        self.kalman_speed = kalman_speed
        self.kalman_acceleration = kalman_acceleration
        self.kalman_direction = kalman_direction
        self.kalman_distance = kalman_distance
        self.deltad = deltad
        self.max_speed = max_speed
        self.kalman_alignment = kalman_alignment
        self.play_travelled = play_travelled
        self.dist_travelled = dist_travelled
        self.max_accel = max_accel
        self.max_decel = max_decel
        self.hs_yards = hs_yards
        self.speed_profile = speed_profile
        self.max_speed_first_10_yds = max_speed_first_10_yds
        self.max_speed_10_yds_20_yds = max_speed_10_yds_20_yds
        self.avg_speed_over_10_yds = avg_speed_over_10_yds
        self.avg_speed_over_20_yds = avg_speed_over_20_yds
        self.distance_from_ball = distance_from_ball
        self.angle_from_ball = angle_from_ball
        self.emol_rel0_x = emol_rel0_x
        self.skill_num = skill_num
        self.los_on_off = los_on_off
        self.pixel_path = pixel_path
        self.custom = custom
        self.side = side
        self.skill_num_temp = skill_num_temp
        self.rating = rating
        self.matchup = matchup
        self.tt_release = tt_release
        self.matchup_postsnap = matchup_postsnap
        self.pff_simple_route = pff_simple_route
        self.targeted = targeted
        self.telemetry_position_group = telemetry_position_group
        self.telemetry_position = telemetry_position
        self.combo_block_postsnap = combo_block_postsnap
        self.the_1_v1_postsnap = the_1_v1_postsnap

    @staticmethod
    def from_dict(obj: Any) -> 'OPath':
        assert isinstance(obj, dict)
        passes_homography_qc = from_bool(obj.get("passes_homography_qc"))
        pff_player_id = from_int(obj.get("pff_player_id"))
        player = Player.from_dict(obj.get("player"))
        rel0 = from_list(from_float, obj.get("rel0"))
        pff_rel0 = from_list(from_float, obj.get("pff_rel0"))
        lua = from_str(obj.get("lua"))
        abs_path = from_list(lambda x: from_list(from_float, x), obj.get("abs_path"))
        raw_path = from_list(lambda x: from_list(from_float, x), obj.get("raw_path"))
        rel_path = from_list(lambda x: from_list(from_float, x), obj.get("rel_path"))
        play_path = from_list(lambda x: from_list(from_float, x), obj.get("play_path"))
        n_frames_on_screen = from_int(obj.get("n_frames_on_screen"))
        kalman_path = from_list(lambda x: from_list(from_float, x), obj.get("kalman_path"))
        kalman_path_w_motion = from_list(lambda x: from_list(from_float, x), obj.get("kalman_path_w_motion"))
        kalman_speed = from_list(from_float, obj.get("kalman_speed"))
        kalman_acceleration = from_list(from_float, obj.get("kalman_acceleration"))
        kalman_direction = from_list(from_int, obj.get("kalman_direction"))
        kalman_distance = from_list(from_float, obj.get("kalman_distance"))
        deltad = from_list(from_float, obj.get("deltad"))
        max_speed = from_float(obj.get("max_speed"))
        kalman_alignment = KalmanAlignment.from_dict(obj.get("kalman_alignment"))
        play_travelled = from_float(obj.get("play_travelled"))
        dist_travelled = from_float(obj.get("dist_travelled"))
        max_accel = MaxCel.from_dict(obj.get("max_accel"))
        max_decel = MaxCel.from_dict(obj.get("max_decel"))
        hs_yards = from_float(obj.get("hs_yards"))
        speed_profile = from_list(from_float, obj.get("speed_profile"))
        max_speed_first_10_yds = from_union([from_float, from_none], obj.get("max_speed_first_10yds"))
        max_speed_10_yds_20_yds = from_union([from_float, from_none], obj.get("max_speed_10yds_20yds"))
        avg_speed_over_10_yds = from_union([from_float, from_none], obj.get("avg_speed_over_10yds"))
        avg_speed_over_20_yds = from_union([from_float, from_none], obj.get("avg_speed_over_20yds"))
        distance_from_ball = from_float(obj.get("distance_from_ball"))
        angle_from_ball = from_float(obj.get("angle_from_ball"))
        emol_rel0_x = from_union([from_float, from_none], obj.get("emol_rel0_x"))
        skill_num = from_union([from_str, from_none], obj.get("skill_num"))
        los_on_off = LosOnOff(obj.get("los_on_off"))
        pixel_path = from_list(lambda x: from_list(from_int, x), obj.get("pixel_path"))
        custom = OPathCustom.from_dict(obj.get("custom"))
        side = from_union([from_str, from_none], obj.get("side"))
        skill_num_temp = from_union([from_int, from_none], obj.get("skill_num_temp"))
        rating = from_str(obj.get("rating"))
        matchup = from_union([OPathMatchup.from_dict, from_none], obj.get("matchup"))
        tt_release = from_union([from_float, from_none], obj.get("tt_release"))
        matchup_postsnap = from_union([OPathMatchupPostsnap.from_dict, from_none], obj.get("matchup_postsnap"))
        pff_simple_route = from_union([from_str, from_none], obj.get("pff_simple_route"))
        targeted = from_bool(obj.get("targeted"))
        telemetry_position_group = from_str(obj.get("telemetry_position_group"))
        telemetry_position = from_str(obj.get("telemetry_position"))
        combo_block_postsnap = from_union([from_bool, from_none], obj.get("combo_block_postsnap"))
        the_1_v1_postsnap = from_union([from_bool, from_none], obj.get("1v1_postsnap"))
        return OPath(passes_homography_qc, pff_player_id, player, rel0, pff_rel0, lua, abs_path, raw_path, rel_path, play_path, n_frames_on_screen, kalman_path, kalman_path_w_motion, kalman_speed, kalman_acceleration, kalman_direction, kalman_distance, deltad, max_speed, kalman_alignment, play_travelled, dist_travelled, max_accel, max_decel, hs_yards, speed_profile, max_speed_first_10_yds, max_speed_10_yds_20_yds, avg_speed_over_10_yds, avg_speed_over_20_yds, distance_from_ball, angle_from_ball, emol_rel0_x, skill_num, los_on_off, pixel_path, custom, side, skill_num_temp, rating, matchup, tt_release, matchup_postsnap, pff_simple_route, targeted, telemetry_position_group, telemetry_position, combo_block_postsnap, the_1_v1_postsnap)

    def to_dict(self) -> dict:
        result: dict = {}
        result["passes_homography_qc"] = from_bool(self.passes_homography_qc)
        result["pff_player_id"] = from_int(self.pff_player_id)
        result["player"] = to_class(Player, self.player)
        result["rel0"] = from_list(to_float, self.rel0)
        result["pff_rel0"] = from_list(to_float, self.pff_rel0)
        result["lua"] = from_str(self.lua)
        result["abs_path"] = from_list(lambda x: from_list(to_float, x), self.abs_path)
        result["raw_path"] = from_list(lambda x: from_list(to_float, x), self.raw_path)
        result["rel_path"] = from_list(lambda x: from_list(to_float, x), self.rel_path)
        result["play_path"] = from_list(lambda x: from_list(to_float, x), self.play_path)
        result["n_frames_on_screen"] = from_int(self.n_frames_on_screen)
        result["kalman_path"] = from_list(lambda x: from_list(to_float, x), self.kalman_path)
        result["kalman_path_w_motion"] = from_list(lambda x: from_list(to_float, x), self.kalman_path_w_motion)
        result["kalman_speed"] = from_list(to_float, self.kalman_speed)
        result["kalman_acceleration"] = from_list(to_float, self.kalman_acceleration)
        result["kalman_direction"] = from_list(from_int, self.kalman_direction)
        result["kalman_distance"] = from_list(to_float, self.kalman_distance)
        result["deltad"] = from_list(to_float, self.deltad)
        result["max_speed"] = to_float(self.max_speed)
        result["kalman_alignment"] = to_class(KalmanAlignment, self.kalman_alignment)
        result["play_travelled"] = to_float(self.play_travelled)
        result["dist_travelled"] = to_float(self.dist_travelled)
        result["max_accel"] = to_class(MaxCel, self.max_accel)
        result["max_decel"] = to_class(MaxCel, self.max_decel)
        result["hs_yards"] = to_float(self.hs_yards)
        result["speed_profile"] = from_list(to_float, self.speed_profile)
        if self.max_speed_first_10_yds is not None:
            result["max_speed_first_10yds"] = from_union([to_float, from_none], self.max_speed_first_10_yds)
        if self.max_speed_10_yds_20_yds is not None:
            result["max_speed_10yds_20yds"] = from_union([to_float, from_none], self.max_speed_10_yds_20_yds)
        if self.avg_speed_over_10_yds is not None:
            result["avg_speed_over_10yds"] = from_union([to_float, from_none], self.avg_speed_over_10_yds)
        if self.avg_speed_over_20_yds is not None:
            result["avg_speed_over_20yds"] = from_union([to_float, from_none], self.avg_speed_over_20_yds)
        result["distance_from_ball"] = to_float(self.distance_from_ball)
        result["angle_from_ball"] = to_float(self.angle_from_ball)
        if self.emol_rel0_x is not None:
            result["emol_rel0_x"] = from_union([to_float, from_none], self.emol_rel0_x)
        if self.skill_num is not None:
            result["skill_num"] = from_union([from_str, from_none], self.skill_num)
        result["los_on_off"] = to_enum(LosOnOff, self.los_on_off)
        result["pixel_path"] = from_list(lambda x: from_list(from_int, x), self.pixel_path)
        result["custom"] = to_class(OPathCustom, self.custom)
        if self.side is not None:
            result["side"] = from_union([from_str, from_none], self.side)
        if self.skill_num_temp is not None:
            result["skill_num_temp"] = from_union([from_int, from_none], self.skill_num_temp)
        result["rating"] = from_str(self.rating)
        if self.matchup is not None:
            result["matchup"] = from_union([lambda x: to_class(OPathMatchup, x), from_none], self.matchup)
        if self.tt_release is not None:
            result["tt_release"] = from_union([to_float, from_none], self.tt_release)
        if self.matchup_postsnap is not None:
            result["matchup_postsnap"] = from_union([lambda x: to_class(OPathMatchupPostsnap, x), from_none], self.matchup_postsnap)
        if self.pff_simple_route is not None:
            result["pff_simple_route"] = from_union([from_str, from_none], self.pff_simple_route)
        result["targeted"] = from_bool(self.targeted)
        result["telemetry_position_group"] = from_str(self.telemetry_position_group)
        result["telemetry_position"] = from_str(self.telemetry_position)
        if self.combo_block_postsnap is not None:
            result["combo_block_postsnap"] = from_union([from_bool, from_none], self.combo_block_postsnap)
        if self.the_1_v1_postsnap is not None:
            result["1v1_postsnap"] = from_union([from_bool, from_none], self.the_1_v1_postsnap)
        return result


class Overlay:
    pixel_paths: Dict[str, List[List[int]]]
    video_start_frame: int

    def __init__(self, pixel_paths: Dict[str, List[List[int]]], video_start_frame: int) -> None:
        self.pixel_paths = pixel_paths
        self.video_start_frame = video_start_frame

    @staticmethod
    def from_dict(obj: Any) -> 'Overlay':
        assert isinstance(obj, dict)
        pixel_paths = from_dict(lambda x: from_list(lambda x: from_list(from_int, x), x), obj.get("pixel_paths"))
        video_start_frame = from_int(obj.get("video_start_frame"))
        return Overlay(pixel_paths, video_start_frame)

    def to_dict(self) -> dict:
        result: dict = {}
        result["pixel_paths"] = from_dict(lambda x: from_list(lambda x: from_list(from_int, x), x), self.pixel_paths)
        result["video_start_frame"] = from_int(self.video_start_frame)
        return result


class DBlitzer:
    jersey: int
    lua: str
    player_id: str
    pos_group: PosGroup
    position: str
    rel0: List[float]
    short_name: str
    blitz_gap: Optional[str]
    rush_gap: Optional[str]
    rush_type: Optional[str]
    stunt_gap: Optional[str]

    def __init__(self, jersey: int, lua: str, player_id: str, pos_group: PosGroup, position: str, rel0: List[float], short_name: str, blitz_gap: Optional[str], rush_gap: Optional[str], rush_type: Optional[str], stunt_gap: Optional[str]) -> None:
        self.jersey = jersey
        self.lua = lua
        self.player_id = player_id
        self.pos_group = pos_group
        self.position = position
        self.rel0 = rel0
        self.short_name = short_name
        self.blitz_gap = blitz_gap
        self.rush_gap = rush_gap
        self.rush_type = rush_type
        self.stunt_gap = stunt_gap

    @staticmethod
    def from_dict(obj: Any) -> 'DBlitzer':
        assert isinstance(obj, dict)
        jersey = from_int(obj.get("jersey"))
        lua = from_str(obj.get("lua"))
        player_id = from_str(obj.get("player_id"))
        pos_group = PosGroup(obj.get("pos_group"))
        position = from_str(obj.get("position"))
        rel0 = from_list(from_float, obj.get("rel0"))
        short_name = from_str(obj.get("short_name"))
        blitz_gap = from_union([from_str, from_none], obj.get("blitz_gap"))
        rush_gap = from_union([from_str, from_none], obj.get("rush_gap"))
        rush_type = from_union([from_str, from_none], obj.get("rush_type"))
        stunt_gap = from_union([from_str, from_none], obj.get("stunt_gap"))
        return DBlitzer(jersey, lua, player_id, pos_group, position, rel0, short_name, blitz_gap, rush_gap, rush_type, stunt_gap)

    def to_dict(self) -> dict:
        result: dict = {}
        result["jersey"] = from_int(self.jersey)
        result["lua"] = from_str(self.lua)
        result["player_id"] = from_str(self.player_id)
        result["pos_group"] = to_enum(PosGroup, self.pos_group)
        result["position"] = from_str(self.position)
        result["rel0"] = from_list(to_float, self.rel0)
        result["short_name"] = from_str(self.short_name)
        if self.blitz_gap is not None:
            result["blitz_gap"] = from_union([from_str, from_none], self.blitz_gap)
        if self.rush_gap is not None:
            result["rush_gap"] = from_union([from_str, from_none], self.rush_gap)
        if self.rush_type is not None:
            result["rush_type"] = from_union([from_str, from_none], self.rush_type)
        if self.stunt_gap is not None:
            result["stunt_gap"] = from_union([from_str, from_none], self.stunt_gap)
        return result


class GapsBlitzedCount:
    ld: int
    rb: int
    rd: int
    lb: int
    la: int
    lc: int
    rc: int
    ra: int

    def __init__(self, ld: int, rb: int, rd: int, lb: int, la: int, lc: int, rc: int, ra: int) -> None:
        self.ld = ld
        self.rb = rb
        self.rd = rd
        self.lb = lb
        self.la = la
        self.lc = lc
        self.rc = rc
        self.ra = ra

    @staticmethod
    def from_dict(obj: Any) -> 'GapsBlitzedCount':
        assert isinstance(obj, dict)
        ld = from_int(obj.get("LD"))
        rb = from_int(obj.get("RB"))
        rd = from_int(obj.get("RD"))
        lb = from_int(obj.get("LB"))
        la = from_int(obj.get("LA"))
        lc = from_int(obj.get("LC"))
        rc = from_int(obj.get("RC"))
        ra = from_int(obj.get("RA"))
        return GapsBlitzedCount(ld, rb, rd, lb, la, lc, rc, ra)

    def to_dict(self) -> dict:
        result: dict = {}
        result["LD"] = from_int(self.ld)
        result["RB"] = from_int(self.rb)
        result["RD"] = from_int(self.rd)
        result["LB"] = from_int(self.lb)
        result["LA"] = from_int(self.la)
        result["LC"] = from_int(self.lc)
        result["RC"] = from_int(self.rc)
        result["RA"] = from_int(self.ra)
        return result


class Pressures:
    pressure_type_exotic: bool
    pressure_type_general: str
    pressure_type_positions: List[Any]

    def __init__(self, pressure_type_exotic: bool, pressure_type_general: str, pressure_type_positions: List[Any]) -> None:
        self.pressure_type_exotic = pressure_type_exotic
        self.pressure_type_general = pressure_type_general
        self.pressure_type_positions = pressure_type_positions

    @staticmethod
    def from_dict(obj: Any) -> 'Pressures':
        assert isinstance(obj, dict)
        pressure_type_exotic = from_bool(obj.get("pressure_type_exotic"))
        pressure_type_general = from_str(obj.get("pressure_type_general"))
        pressure_type_positions = from_list(lambda x: x, obj.get("pressure_type_positions"))
        return Pressures(pressure_type_exotic, pressure_type_general, pressure_type_positions)

    def to_dict(self) -> dict:
        result: dict = {}
        result["pressure_type_exotic"] = from_bool(self.pressure_type_exotic)
        result["pressure_type_general"] = from_str(self.pressure_type_general)
        result["pressure_type_positions"] = from_list(lambda x: x, self.pressure_type_positions)
        return result


class PlayD:
    stunt: bool
    time_to_pressure: float
    num_dl_drop: int
    blitzdog: bool
    pass_rush_result: str
    middle_of_field_abs_post_snap: str
    middle_of_field_abs_at_snap: str
    num_rushers: int
    blitzers: List[str]
    d_blitzers: List[DBlitzer]
    d_rushers: List[DBlitzer]
    d_stunters: List[DBlitzer]
    num_pass_coverage: int
    missed_tackles: List[Any]
    num_deep_db: int
    lb_covering_rb: bool
    pressures: Pressures
    max_penetration: float
    max_penetration_player: str
    secondary_rotation: str
    lb_depth: float
    gaps_blitzed: List[str]
    gaps_blitzed_count: GapsBlitzedCount
    num_swarm: int
    rushers_left: List[str]
    rushers_right: List[str]
    num_rushers_db: int
    num_rushers_dl: int
    num_rushers_lb: int
    num_rushers_left: int
    num_rushers_right: int
    rushers: List[str]
    force_defender_left: str
    force_defender_right: str
    stunt_location: str
    stunt_time_post_snap: float
    stunt_type: str
    stunting_players: List[str]
    penetrator: str
    looper: str
    num_stunters: int
    pass_rush_win: bool

    def __init__(self, stunt: bool, time_to_pressure: float, num_dl_drop: int, blitzdog: bool, pass_rush_result: str, middle_of_field_abs_post_snap: str, middle_of_field_abs_at_snap: str, num_rushers: int, blitzers: List[str], d_blitzers: List[DBlitzer], d_rushers: List[DBlitzer], d_stunters: List[DBlitzer], num_pass_coverage: int, missed_tackles: List[Any], num_deep_db: int, lb_covering_rb: bool, pressures: Pressures, max_penetration: float, max_penetration_player: str, secondary_rotation: str, lb_depth: float, gaps_blitzed: List[str], gaps_blitzed_count: GapsBlitzedCount, num_swarm: int, rushers_left: List[str], rushers_right: List[str], num_rushers_db: int, num_rushers_dl: int, num_rushers_lb: int, num_rushers_left: int, num_rushers_right: int, rushers: List[str], force_defender_left: str, force_defender_right: str, stunt_location: str, stunt_time_post_snap: float, stunt_type: str, stunting_players: List[str], penetrator: str, looper: str, num_stunters: int, pass_rush_win: bool) -> None:
        self.stunt = stunt
        self.time_to_pressure = time_to_pressure
        self.num_dl_drop = num_dl_drop
        self.blitzdog = blitzdog
        self.pass_rush_result = pass_rush_result
        self.middle_of_field_abs_post_snap = middle_of_field_abs_post_snap
        self.middle_of_field_abs_at_snap = middle_of_field_abs_at_snap
        self.num_rushers = num_rushers
        self.blitzers = blitzers
        self.d_blitzers = d_blitzers
        self.d_rushers = d_rushers
        self.d_stunters = d_stunters
        self.num_pass_coverage = num_pass_coverage
        self.missed_tackles = missed_tackles
        self.num_deep_db = num_deep_db
        self.lb_covering_rb = lb_covering_rb
        self.pressures = pressures
        self.max_penetration = max_penetration
        self.max_penetration_player = max_penetration_player
        self.secondary_rotation = secondary_rotation
        self.lb_depth = lb_depth
        self.gaps_blitzed = gaps_blitzed
        self.gaps_blitzed_count = gaps_blitzed_count
        self.num_swarm = num_swarm
        self.rushers_left = rushers_left
        self.rushers_right = rushers_right
        self.num_rushers_db = num_rushers_db
        self.num_rushers_dl = num_rushers_dl
        self.num_rushers_lb = num_rushers_lb
        self.num_rushers_left = num_rushers_left
        self.num_rushers_right = num_rushers_right
        self.rushers = rushers
        self.force_defender_left = force_defender_left
        self.force_defender_right = force_defender_right
        self.stunt_location = stunt_location
        self.stunt_time_post_snap = stunt_time_post_snap
        self.stunt_type = stunt_type
        self.stunting_players = stunting_players
        self.penetrator = penetrator
        self.looper = looper
        self.num_stunters = num_stunters
        self.pass_rush_win = pass_rush_win

    @staticmethod
    def from_dict(obj: Any) -> 'PlayD':
        assert isinstance(obj, dict)
        stunt = from_bool(obj.get("stunt"))
        time_to_pressure = from_float(obj.get("time_to_pressure"))
        num_dl_drop = from_int(obj.get("num_dl_drop"))
        blitzdog = from_bool(obj.get("blitzdog"))
        pass_rush_result = from_str(obj.get("pass_rush_result"))
        middle_of_field_abs_post_snap = from_str(obj.get("middle_of_field_abs_post_snap"))
        middle_of_field_abs_at_snap = from_str(obj.get("middle_of_field_abs_at_snap"))
        num_rushers = from_int(obj.get("num_rushers"))
        blitzers = from_list(from_str, obj.get("blitzers"))
        d_blitzers = from_list(DBlitzer.from_dict, obj.get("d_blitzers"))
        d_rushers = from_list(DBlitzer.from_dict, obj.get("d_rushers"))
        d_stunters = from_list(DBlitzer.from_dict, obj.get("d_stunters"))
        num_pass_coverage = from_int(obj.get("num_pass_coverage"))
        missed_tackles = from_list(lambda x: x, obj.get("missed_tackles"))
        num_deep_db = from_int(obj.get("num_deep_db"))
        lb_covering_rb = from_bool(obj.get("lb_covering_rb"))
        pressures = Pressures.from_dict(obj.get("pressures"))
        max_penetration = from_float(obj.get("max_penetration"))
        max_penetration_player = from_str(obj.get("max_penetration_player"))
        secondary_rotation = from_str(obj.get("secondary_rotation"))
        lb_depth = from_float(obj.get("lb_depth"))
        gaps_blitzed = from_list(from_str, obj.get("gaps_blitzed"))
        gaps_blitzed_count = GapsBlitzedCount.from_dict(obj.get("gaps_blitzed_count"))
        num_swarm = from_int(obj.get("num_swarm"))
        rushers_left = from_list(from_str, obj.get("rushers_left"))
        rushers_right = from_list(from_str, obj.get("rushers_right"))
        num_rushers_db = from_int(obj.get("num_rushers_db"))
        num_rushers_dl = from_int(obj.get("num_rushers_dl"))
        num_rushers_lb = from_int(obj.get("num_rushers_lb"))
        num_rushers_left = from_int(obj.get("num_rushers_left"))
        num_rushers_right = from_int(obj.get("num_rushers_right"))
        rushers = from_list(from_str, obj.get("rushers"))
        force_defender_left = from_str(obj.get("force_defender_left"))
        force_defender_right = from_str(obj.get("force_defender_right"))
        stunt_location = from_str(obj.get("stunt_location"))
        stunt_time_post_snap = from_float(obj.get("stunt_time_post_snap"))
        stunt_type = from_str(obj.get("stunt_type"))
        stunting_players = from_list(from_str, obj.get("stunting_players"))
        penetrator = from_str(obj.get("penetrator"))
        looper = from_str(obj.get("looper"))
        num_stunters = from_int(obj.get("num_stunters"))
        pass_rush_win = from_bool(obj.get("pass_rush_win"))
        return PlayD(stunt, time_to_pressure, num_dl_drop, blitzdog, pass_rush_result, middle_of_field_abs_post_snap, middle_of_field_abs_at_snap, num_rushers, blitzers, d_blitzers, d_rushers, d_stunters, num_pass_coverage, missed_tackles, num_deep_db, lb_covering_rb, pressures, max_penetration, max_penetration_player, secondary_rotation, lb_depth, gaps_blitzed, gaps_blitzed_count, num_swarm, rushers_left, rushers_right, num_rushers_db, num_rushers_dl, num_rushers_lb, num_rushers_left, num_rushers_right, rushers, force_defender_left, force_defender_right, stunt_location, stunt_time_post_snap, stunt_type, stunting_players, penetrator, looper, num_stunters, pass_rush_win)

    def to_dict(self) -> dict:
        result: dict = {}
        result["stunt"] = from_bool(self.stunt)
        result["time_to_pressure"] = to_float(self.time_to_pressure)
        result["num_dl_drop"] = from_int(self.num_dl_drop)
        result["blitzdog"] = from_bool(self.blitzdog)
        result["pass_rush_result"] = from_str(self.pass_rush_result)
        result["middle_of_field_abs_post_snap"] = from_str(self.middle_of_field_abs_post_snap)
        result["middle_of_field_abs_at_snap"] = from_str(self.middle_of_field_abs_at_snap)
        result["num_rushers"] = from_int(self.num_rushers)
        result["blitzers"] = from_list(from_str, self.blitzers)
        result["d_blitzers"] = from_list(lambda x: to_class(DBlitzer, x), self.d_blitzers)
        result["d_rushers"] = from_list(lambda x: to_class(DBlitzer, x), self.d_rushers)
        result["d_stunters"] = from_list(lambda x: to_class(DBlitzer, x), self.d_stunters)
        result["num_pass_coverage"] = from_int(self.num_pass_coverage)
        result["missed_tackles"] = from_list(lambda x: x, self.missed_tackles)
        result["num_deep_db"] = from_int(self.num_deep_db)
        result["lb_covering_rb"] = from_bool(self.lb_covering_rb)
        result["pressures"] = to_class(Pressures, self.pressures)
        result["max_penetration"] = to_float(self.max_penetration)
        result["max_penetration_player"] = from_str(self.max_penetration_player)
        result["secondary_rotation"] = from_str(self.secondary_rotation)
        result["lb_depth"] = to_float(self.lb_depth)
        result["gaps_blitzed"] = from_list(from_str, self.gaps_blitzed)
        result["gaps_blitzed_count"] = to_class(GapsBlitzedCount, self.gaps_blitzed_count)
        result["num_swarm"] = from_int(self.num_swarm)
        result["rushers_left"] = from_list(from_str, self.rushers_left)
        result["rushers_right"] = from_list(from_str, self.rushers_right)
        result["num_rushers_db"] = from_int(self.num_rushers_db)
        result["num_rushers_dl"] = from_int(self.num_rushers_dl)
        result["num_rushers_lb"] = from_int(self.num_rushers_lb)
        result["num_rushers_left"] = from_int(self.num_rushers_left)
        result["num_rushers_right"] = from_int(self.num_rushers_right)
        result["rushers"] = from_list(from_str, self.rushers)
        result["force_defender_left"] = from_str(self.force_defender_left)
        result["force_defender_right"] = from_str(self.force_defender_right)
        result["stunt_location"] = from_str(self.stunt_location)
        result["stunt_time_post_snap"] = to_float(self.stunt_time_post_snap)
        result["stunt_type"] = from_str(self.stunt_type)
        result["stunting_players"] = from_list(from_str, self.stunting_players)
        result["penetrator"] = from_str(self.penetrator)
        result["looper"] = from_str(self.looper)
        result["num_stunters"] = from_int(self.num_stunters)
        result["pass_rush_win"] = from_bool(self.pass_rush_win)
        return result


class PlayO:
    c_pass_block_direction: str
    qb_drop_type: str
    catchable: bool
    deep_pass: bool
    draw: bool
    option: bool
    play_action: bool
    screen: bool
    trick_play: bool
    check_route: bool
    chip_route: bool
    pass_direction: str
    pass_width: int
    pump_fake: bool
    qb_moved_off_spot: bool
    qb_reset: bool
    run_pass_option: bool
    num_pass_blockers: int
    rb_pass_pro_v_lb: bool
    rb_pass_pro_v_db: bool
    rb_backfield_route_v_man: bool
    air_yardage: int
    pass_yardage_beyond_sticks: int
    air_distance: float
    targeted_defensed_type: str
    pass_type: str
    hit_allowed_by: List[str]
    hurry_allowed_by: List[Any]
    pressure_allowed_by: List[str]
    sack_allowed_by: List[Any]
    targeted_pff_simple_route: str
    player_pff_simple_routes: List[str]
    skill_pff_simple_routes: List[str]
    qb_drop_depth: float
    num_receivers: int
    pass_blockers: List[str]
    rb_pass_block_side: List[Any]
    rb_pass_block_side_detail: List[Any]
    thrown_under_pressure: bool
    pass_block_win: bool

    def __init__(self, c_pass_block_direction: str, qb_drop_type: str, catchable: bool, deep_pass: bool, draw: bool, option: bool, play_action: bool, screen: bool, trick_play: bool, check_route: bool, chip_route: bool, pass_direction: str, pass_width: int, pump_fake: bool, qb_moved_off_spot: bool, qb_reset: bool, run_pass_option: bool, num_pass_blockers: int, rb_pass_pro_v_lb: bool, rb_pass_pro_v_db: bool, rb_backfield_route_v_man: bool, air_yardage: int, pass_yardage_beyond_sticks: int, air_distance: float, targeted_defensed_type: str, pass_type: str, hit_allowed_by: List[str], hurry_allowed_by: List[Any], pressure_allowed_by: List[str], sack_allowed_by: List[Any], targeted_pff_simple_route: str, player_pff_simple_routes: List[str], skill_pff_simple_routes: List[str], qb_drop_depth: float, num_receivers: int, pass_blockers: List[str], rb_pass_block_side: List[Any], rb_pass_block_side_detail: List[Any], thrown_under_pressure: bool, pass_block_win: bool) -> None:
        self.c_pass_block_direction = c_pass_block_direction
        self.qb_drop_type = qb_drop_type
        self.catchable = catchable
        self.deep_pass = deep_pass
        self.draw = draw
        self.option = option
        self.play_action = play_action
        self.screen = screen
        self.trick_play = trick_play
        self.check_route = check_route
        self.chip_route = chip_route
        self.pass_direction = pass_direction
        self.pass_width = pass_width
        self.pump_fake = pump_fake
        self.qb_moved_off_spot = qb_moved_off_spot
        self.qb_reset = qb_reset
        self.run_pass_option = run_pass_option
        self.num_pass_blockers = num_pass_blockers
        self.rb_pass_pro_v_lb = rb_pass_pro_v_lb
        self.rb_pass_pro_v_db = rb_pass_pro_v_db
        self.rb_backfield_route_v_man = rb_backfield_route_v_man
        self.air_yardage = air_yardage
        self.pass_yardage_beyond_sticks = pass_yardage_beyond_sticks
        self.air_distance = air_distance
        self.targeted_defensed_type = targeted_defensed_type
        self.pass_type = pass_type
        self.hit_allowed_by = hit_allowed_by
        self.hurry_allowed_by = hurry_allowed_by
        self.pressure_allowed_by = pressure_allowed_by
        self.sack_allowed_by = sack_allowed_by
        self.targeted_pff_simple_route = targeted_pff_simple_route
        self.player_pff_simple_routes = player_pff_simple_routes
        self.skill_pff_simple_routes = skill_pff_simple_routes
        self.qb_drop_depth = qb_drop_depth
        self.num_receivers = num_receivers
        self.pass_blockers = pass_blockers
        self.rb_pass_block_side = rb_pass_block_side
        self.rb_pass_block_side_detail = rb_pass_block_side_detail
        self.thrown_under_pressure = thrown_under_pressure
        self.pass_block_win = pass_block_win

    @staticmethod
    def from_dict(obj: Any) -> 'PlayO':
        assert isinstance(obj, dict)
        c_pass_block_direction = from_str(obj.get("c_pass_block_direction"))
        qb_drop_type = from_str(obj.get("qb_drop_type"))
        catchable = from_bool(obj.get("catchable"))
        deep_pass = from_bool(obj.get("deep_pass"))
        draw = from_bool(obj.get("draw"))
        option = from_bool(obj.get("option"))
        play_action = from_bool(obj.get("play_action"))
        screen = from_bool(obj.get("screen"))
        trick_play = from_bool(obj.get("trick_play"))
        check_route = from_bool(obj.get("check_route"))
        chip_route = from_bool(obj.get("chip_route"))
        pass_direction = from_str(obj.get("pass_direction"))
        pass_width = from_int(obj.get("pass_width"))
        pump_fake = from_bool(obj.get("pump_fake"))
        qb_moved_off_spot = from_bool(obj.get("qb_moved_off_spot"))
        qb_reset = from_bool(obj.get("qb_reset"))
        run_pass_option = from_bool(obj.get("run_pass_option"))
        num_pass_blockers = from_int(obj.get("num_pass_blockers"))
        rb_pass_pro_v_lb = from_bool(obj.get("rb_pass_pro_v_lb"))
        rb_pass_pro_v_db = from_bool(obj.get("rb_pass_pro_v_db"))
        rb_backfield_route_v_man = from_bool(obj.get("rb_backfield_route_v_man"))
        air_yardage = from_int(obj.get("air_yardage"))
        pass_yardage_beyond_sticks = from_int(obj.get("pass_yardage_beyond_sticks"))
        air_distance = from_float(obj.get("air_distance"))
        targeted_defensed_type = from_str(obj.get("targeted_defensed_type"))
        pass_type = from_str(obj.get("pass_type"))
        hit_allowed_by = from_list(from_str, obj.get("hit_allowed_by"))
        hurry_allowed_by = from_list(lambda x: x, obj.get("hurry_allowed_by"))
        pressure_allowed_by = from_list(from_str, obj.get("pressure_allowed_by"))
        sack_allowed_by = from_list(lambda x: x, obj.get("sack_allowed_by"))
        targeted_pff_simple_route = from_str(obj.get("targeted_pff_simple_route"))
        player_pff_simple_routes = from_list(from_str, obj.get("player_pff_simple_routes"))
        skill_pff_simple_routes = from_list(from_str, obj.get("skill_pff_simple_routes"))
        qb_drop_depth = from_float(obj.get("qb_drop_depth"))
        num_receivers = from_int(obj.get("num_receivers"))
        pass_blockers = from_list(from_str, obj.get("pass_blockers"))
        rb_pass_block_side = from_list(lambda x: x, obj.get("rb_pass_block_side"))
        rb_pass_block_side_detail = from_list(lambda x: x, obj.get("rb_pass_block_side_detail"))
        thrown_under_pressure = from_bool(obj.get("thrown_under_pressure"))
        pass_block_win = from_bool(obj.get("pass_block_win"))
        return PlayO(c_pass_block_direction, qb_drop_type, catchable, deep_pass, draw, option, play_action, screen, trick_play, check_route, chip_route, pass_direction, pass_width, pump_fake, qb_moved_off_spot, qb_reset, run_pass_option, num_pass_blockers, rb_pass_pro_v_lb, rb_pass_pro_v_db, rb_backfield_route_v_man, air_yardage, pass_yardage_beyond_sticks, air_distance, targeted_defensed_type, pass_type, hit_allowed_by, hurry_allowed_by, pressure_allowed_by, sack_allowed_by, targeted_pff_simple_route, player_pff_simple_routes, skill_pff_simple_routes, qb_drop_depth, num_receivers, pass_blockers, rb_pass_block_side, rb_pass_block_side_detail, thrown_under_pressure, pass_block_win)

    def to_dict(self) -> dict:
        result: dict = {}
        result["c_pass_block_direction"] = from_str(self.c_pass_block_direction)
        result["qb_drop_type"] = from_str(self.qb_drop_type)
        result["catchable"] = from_bool(self.catchable)
        result["deep_pass"] = from_bool(self.deep_pass)
        result["draw"] = from_bool(self.draw)
        result["option"] = from_bool(self.option)
        result["play_action"] = from_bool(self.play_action)
        result["screen"] = from_bool(self.screen)
        result["trick_play"] = from_bool(self.trick_play)
        result["check_route"] = from_bool(self.check_route)
        result["chip_route"] = from_bool(self.chip_route)
        result["pass_direction"] = from_str(self.pass_direction)
        result["pass_width"] = from_int(self.pass_width)
        result["pump_fake"] = from_bool(self.pump_fake)
        result["qb_moved_off_spot"] = from_bool(self.qb_moved_off_spot)
        result["qb_reset"] = from_bool(self.qb_reset)
        result["run_pass_option"] = from_bool(self.run_pass_option)
        result["num_pass_blockers"] = from_int(self.num_pass_blockers)
        result["rb_pass_pro_v_lb"] = from_bool(self.rb_pass_pro_v_lb)
        result["rb_pass_pro_v_db"] = from_bool(self.rb_pass_pro_v_db)
        result["rb_backfield_route_v_man"] = from_bool(self.rb_backfield_route_v_man)
        result["air_yardage"] = from_int(self.air_yardage)
        result["pass_yardage_beyond_sticks"] = from_int(self.pass_yardage_beyond_sticks)
        result["air_distance"] = to_float(self.air_distance)
        result["targeted_defensed_type"] = from_str(self.targeted_defensed_type)
        result["pass_type"] = from_str(self.pass_type)
        result["hit_allowed_by"] = from_list(from_str, self.hit_allowed_by)
        result["hurry_allowed_by"] = from_list(lambda x: x, self.hurry_allowed_by)
        result["pressure_allowed_by"] = from_list(from_str, self.pressure_allowed_by)
        result["sack_allowed_by"] = from_list(lambda x: x, self.sack_allowed_by)
        result["targeted_pff_simple_route"] = from_str(self.targeted_pff_simple_route)
        result["player_pff_simple_routes"] = from_list(from_str, self.player_pff_simple_routes)
        result["skill_pff_simple_routes"] = from_list(from_str, self.skill_pff_simple_routes)
        result["qb_drop_depth"] = to_float(self.qb_drop_depth)
        result["num_receivers"] = from_int(self.num_receivers)
        result["pass_blockers"] = from_list(from_str, self.pass_blockers)
        result["rb_pass_block_side"] = from_list(lambda x: x, self.rb_pass_block_side)
        result["rb_pass_block_side_detail"] = from_list(lambda x: x, self.rb_pass_block_side_detail)
        result["thrown_under_pressure"] = from_bool(self.thrown_under_pressure)
        result["pass_block_win"] = from_bool(self.pass_block_win)
        return result


class PresnapD:
    d_participation: List[str]
    d_participation_info: List[Player]
    num_def_in_box: int
    personnel_d_on_play: int
    db_cushion_avg: float
    db_soft_press: int
    db_off: int
    db_shade_inside: int
    db_shade_inside_strong: int
    db_shade_outside: int
    db_shade_outside_strong: int
    dl_on_play: int
    lb_on_play: int
    dbs_on_play: int
    db_on_play: int
    de_on_play: int
    cb_on_play: int
    dt_on_play: int
    fs_on_play: int
    ilb_on_play: int
    olb_on_play: int
    mlb_on_play: int
    nt_on_play: int
    s_on_play: int
    ss_on_play: int
    sum_dt_on_play: int
    sum_ilb_on_play: int
    sum_s_on_play: int
    def_front: str
    n_on_line: int
    n_3_pt_stance: int
    n_2_pt_stance: int
    def_in_2_pt_stance: List[str]
    def_in_3_pt_stance: List[str]
    db_press: int
    players_in_press: List[str]
    players_in_soft_press: List[str]
    players_in_off: List[str]
    defensive_look: str
    defensive_look_2: str
    box_players: List[str]

    def __init__(self, d_participation: List[str], d_participation_info: List[Player], num_def_in_box: int, personnel_d_on_play: int, db_cushion_avg: float, db_soft_press: int, db_off: int, db_shade_inside: int, db_shade_inside_strong: int, db_shade_outside: int, db_shade_outside_strong: int, dl_on_play: int, lb_on_play: int, dbs_on_play: int, db_on_play: int, de_on_play: int, cb_on_play: int, dt_on_play: int, fs_on_play: int, ilb_on_play: int, olb_on_play: int, mlb_on_play: int, nt_on_play: int, s_on_play: int, ss_on_play: int, sum_dt_on_play: int, sum_ilb_on_play: int, sum_s_on_play: int, def_front: str, n_on_line: int, n_3_pt_stance: int, n_2_pt_stance: int, def_in_2_pt_stance: List[str], def_in_3_pt_stance: List[str], db_press: int, players_in_press: List[str], players_in_soft_press: List[str], players_in_off: List[str], defensive_look: str, defensive_look_2: str, box_players: List[str]) -> None:
        self.d_participation = d_participation
        self.d_participation_info = d_participation_info
        self.num_def_in_box = num_def_in_box
        self.personnel_d_on_play = personnel_d_on_play
        self.db_cushion_avg = db_cushion_avg
        self.db_soft_press = db_soft_press
        self.db_off = db_off
        self.db_shade_inside = db_shade_inside
        self.db_shade_inside_strong = db_shade_inside_strong
        self.db_shade_outside = db_shade_outside
        self.db_shade_outside_strong = db_shade_outside_strong
        self.dl_on_play = dl_on_play
        self.lb_on_play = lb_on_play
        self.dbs_on_play = dbs_on_play
        self.db_on_play = db_on_play
        self.de_on_play = de_on_play
        self.cb_on_play = cb_on_play
        self.dt_on_play = dt_on_play
        self.fs_on_play = fs_on_play
        self.ilb_on_play = ilb_on_play
        self.olb_on_play = olb_on_play
        self.mlb_on_play = mlb_on_play
        self.nt_on_play = nt_on_play
        self.s_on_play = s_on_play
        self.ss_on_play = ss_on_play
        self.sum_dt_on_play = sum_dt_on_play
        self.sum_ilb_on_play = sum_ilb_on_play
        self.sum_s_on_play = sum_s_on_play
        self.def_front = def_front
        self.n_on_line = n_on_line
        self.n_3_pt_stance = n_3_pt_stance
        self.n_2_pt_stance = n_2_pt_stance
        self.def_in_2_pt_stance = def_in_2_pt_stance
        self.def_in_3_pt_stance = def_in_3_pt_stance
        self.db_press = db_press
        self.players_in_press = players_in_press
        self.players_in_soft_press = players_in_soft_press
        self.players_in_off = players_in_off
        self.defensive_look = defensive_look
        self.defensive_look_2 = defensive_look_2
        self.box_players = box_players

    @staticmethod
    def from_dict(obj: Any) -> 'PresnapD':
        assert isinstance(obj, dict)
        d_participation = from_list(from_str, obj.get("d_participation"))
        d_participation_info = from_list(Player.from_dict, obj.get("d_participation_info"))
        num_def_in_box = from_int(obj.get("num_def_in_box"))
        personnel_d_on_play = int(from_str(obj.get("personnel_d_on_play")))
        db_cushion_avg = from_float(obj.get("db_cushion_avg"))
        db_soft_press = from_int(obj.get("db_soft_press"))
        db_off = from_int(obj.get("db_off"))
        db_shade_inside = from_int(obj.get("db_shade_inside"))
        db_shade_inside_strong = from_int(obj.get("db_shade_inside_strong"))
        db_shade_outside = from_int(obj.get("db_shade_outside"))
        db_shade_outside_strong = from_int(obj.get("db_shade_outside_strong"))
        dl_on_play = from_int(obj.get("dl_on_play"))
        lb_on_play = from_int(obj.get("lb_on_play"))
        dbs_on_play = from_int(obj.get("dbs_on_play"))
        db_on_play = from_int(obj.get("db_on_play"))
        de_on_play = from_int(obj.get("de_on_play"))
        cb_on_play = from_int(obj.get("cb_on_play"))
        dt_on_play = from_int(obj.get("dt_on_play"))
        fs_on_play = from_int(obj.get("fs_on_play"))
        ilb_on_play = from_int(obj.get("ilb_on_play"))
        olb_on_play = from_int(obj.get("olb_on_play"))
        mlb_on_play = from_int(obj.get("mlb_on_play"))
        nt_on_play = from_int(obj.get("nt_on_play"))
        s_on_play = from_int(obj.get("s_on_play"))
        ss_on_play = from_int(obj.get("ss_on_play"))
        sum_dt_on_play = from_int(obj.get("sum_dt_on_play"))
        sum_ilb_on_play = from_int(obj.get("sum_ilb_on_play"))
        sum_s_on_play = from_int(obj.get("sum_s_on_play"))
        def_front = from_str(obj.get("def_front"))
        n_on_line = from_int(obj.get("n_on_line"))
        n_3_pt_stance = from_int(obj.get("n_3pt_stance"))
        n_2_pt_stance = from_int(obj.get("n_2pt_stance"))
        def_in_2_pt_stance = from_list(from_str, obj.get("def_in_2pt_stance"))
        def_in_3_pt_stance = from_list(from_str, obj.get("def_in_3pt_stance"))
        db_press = from_int(obj.get("db_press"))
        players_in_press = from_list(from_str, obj.get("players_in_press"))
        players_in_soft_press = from_list(from_str, obj.get("players_in_soft_press"))
        players_in_off = from_list(from_str, obj.get("players_in_off"))
        defensive_look = from_str(obj.get("defensive_look"))
        defensive_look_2 = from_str(obj.get("defensive_look_2"))
        box_players = from_list(from_str, obj.get("box_players"))
        return PresnapD(d_participation, d_participation_info, num_def_in_box, personnel_d_on_play, db_cushion_avg, db_soft_press, db_off, db_shade_inside, db_shade_inside_strong, db_shade_outside, db_shade_outside_strong, dl_on_play, lb_on_play, dbs_on_play, db_on_play, de_on_play, cb_on_play, dt_on_play, fs_on_play, ilb_on_play, olb_on_play, mlb_on_play, nt_on_play, s_on_play, ss_on_play, sum_dt_on_play, sum_ilb_on_play, sum_s_on_play, def_front, n_on_line, n_3_pt_stance, n_2_pt_stance, def_in_2_pt_stance, def_in_3_pt_stance, db_press, players_in_press, players_in_soft_press, players_in_off, defensive_look, defensive_look_2, box_players)

    def to_dict(self) -> dict:
        result: dict = {}
        result["d_participation"] = from_list(from_str, self.d_participation)
        result["d_participation_info"] = from_list(lambda x: to_class(Player, x), self.d_participation_info)
        result["num_def_in_box"] = from_int(self.num_def_in_box)
        result["personnel_d_on_play"] = from_str(str(self.personnel_d_on_play))
        result["db_cushion_avg"] = to_float(self.db_cushion_avg)
        result["db_soft_press"] = from_int(self.db_soft_press)
        result["db_off"] = from_int(self.db_off)
        result["db_shade_inside"] = from_int(self.db_shade_inside)
        result["db_shade_inside_strong"] = from_int(self.db_shade_inside_strong)
        result["db_shade_outside"] = from_int(self.db_shade_outside)
        result["db_shade_outside_strong"] = from_int(self.db_shade_outside_strong)
        result["dl_on_play"] = from_int(self.dl_on_play)
        result["lb_on_play"] = from_int(self.lb_on_play)
        result["dbs_on_play"] = from_int(self.dbs_on_play)
        result["db_on_play"] = from_int(self.db_on_play)
        result["de_on_play"] = from_int(self.de_on_play)
        result["cb_on_play"] = from_int(self.cb_on_play)
        result["dt_on_play"] = from_int(self.dt_on_play)
        result["fs_on_play"] = from_int(self.fs_on_play)
        result["ilb_on_play"] = from_int(self.ilb_on_play)
        result["olb_on_play"] = from_int(self.olb_on_play)
        result["mlb_on_play"] = from_int(self.mlb_on_play)
        result["nt_on_play"] = from_int(self.nt_on_play)
        result["s_on_play"] = from_int(self.s_on_play)
        result["ss_on_play"] = from_int(self.ss_on_play)
        result["sum_dt_on_play"] = from_int(self.sum_dt_on_play)
        result["sum_ilb_on_play"] = from_int(self.sum_ilb_on_play)
        result["sum_s_on_play"] = from_int(self.sum_s_on_play)
        result["def_front"] = from_str(self.def_front)
        result["n_on_line"] = from_int(self.n_on_line)
        result["n_3pt_stance"] = from_int(self.n_3_pt_stance)
        result["n_2pt_stance"] = from_int(self.n_2_pt_stance)
        result["def_in_2pt_stance"] = from_list(from_str, self.def_in_2_pt_stance)
        result["def_in_3pt_stance"] = from_list(from_str, self.def_in_3_pt_stance)
        result["db_press"] = from_int(self.db_press)
        result["players_in_press"] = from_list(from_str, self.players_in_press)
        result["players_in_soft_press"] = from_list(from_str, self.players_in_soft_press)
        result["players_in_off"] = from_list(from_str, self.players_in_off)
        result["defensive_look"] = from_str(self.defensive_look)
        result["defensive_look_2"] = from_str(self.defensive_look_2)
        result["box_players"] = from_list(from_str, self.box_players)
        return result


class PresnapO:
    personnel_o_on_play: int
    no_huddle: int
    off_formation_unbalanced: int
    trick_look: int
    bunch: bool
    stacks: bool
    shift_motion: bool
    qb_on_play: int
    wr_on_play: int
    te_on_play: int
    fb_on_play: int
    rb_on_play: int
    ol_on_play: int
    o_participation: List[str]
    players_against_press: List[str]
    players_against_soft_press: List[str]
    players_against_off: List[str]
    skill_positions: List[str]
    n_wider_paint: int
    n_on_paint: int
    n_inside_paint: int
    far_split_r: float
    far_split_l: float
    formation_width: float
    receiver_presnap_alignments: Dict[str, List[str]]
    on_los_skill_pos_group: List[PosGroup]
    avg_ol_split: float
    backfield_players: List[Any]
    backfield_pos_group: List[Any]
    num_off_los_te: int
    num_on_los_te: int
    off_los_te: List[Any]
    on_los_te: List[Any]
    o_participation_info: List[Player]
    offensive_centroid_at_snap: List[float]
    off_attached_centroid_at_snap: List[float]
    off_in_2_pt_stance: List[str]
    off_in_3_pt_stance: List[str]
    ol_width: float
    unbalanced_line: bool
    skill_players: List[str]
    on_los_skill_players: List[str]
    extra_ol_players: List[Any]

    def __init__(self, personnel_o_on_play: int, no_huddle: int, off_formation_unbalanced: int, trick_look: int, bunch: bool, stacks: bool, shift_motion: bool, qb_on_play: int, wr_on_play: int, te_on_play: int, fb_on_play: int, rb_on_play: int, ol_on_play: int, o_participation: List[str], players_against_press: List[str], players_against_soft_press: List[str], players_against_off: List[str], skill_positions: List[str], n_wider_paint: int, n_on_paint: int, n_inside_paint: int, far_split_r: float, far_split_l: float, formation_width: float, receiver_presnap_alignments: Dict[str, List[str]], on_los_skill_pos_group: List[PosGroup], avg_ol_split: float, backfield_players: List[Any], backfield_pos_group: List[Any], num_off_los_te: int, num_on_los_te: int, off_los_te: List[Any], on_los_te: List[Any], o_participation_info: List[Player], offensive_centroid_at_snap: List[float], off_attached_centroid_at_snap: List[float], off_in_2_pt_stance: List[str], off_in_3_pt_stance: List[str], ol_width: float, unbalanced_line: bool, skill_players: List[str], on_los_skill_players: List[str], extra_ol_players: List[Any]) -> None:
        self.personnel_o_on_play = personnel_o_on_play
        self.no_huddle = no_huddle
        self.off_formation_unbalanced = off_formation_unbalanced
        self.trick_look = trick_look
        self.bunch = bunch
        self.stacks = stacks
        self.shift_motion = shift_motion
        self.qb_on_play = qb_on_play
        self.wr_on_play = wr_on_play
        self.te_on_play = te_on_play
        self.fb_on_play = fb_on_play
        self.rb_on_play = rb_on_play
        self.ol_on_play = ol_on_play
        self.o_participation = o_participation
        self.players_against_press = players_against_press
        self.players_against_soft_press = players_against_soft_press
        self.players_against_off = players_against_off
        self.skill_positions = skill_positions
        self.n_wider_paint = n_wider_paint
        self.n_on_paint = n_on_paint
        self.n_inside_paint = n_inside_paint
        self.far_split_r = far_split_r
        self.far_split_l = far_split_l
        self.formation_width = formation_width
        self.receiver_presnap_alignments = receiver_presnap_alignments
        self.on_los_skill_pos_group = on_los_skill_pos_group
        self.avg_ol_split = avg_ol_split
        self.backfield_players = backfield_players
        self.backfield_pos_group = backfield_pos_group
        self.num_off_los_te = num_off_los_te
        self.num_on_los_te = num_on_los_te
        self.off_los_te = off_los_te
        self.on_los_te = on_los_te
        self.o_participation_info = o_participation_info
        self.offensive_centroid_at_snap = offensive_centroid_at_snap
        self.off_attached_centroid_at_snap = off_attached_centroid_at_snap
        self.off_in_2_pt_stance = off_in_2_pt_stance
        self.off_in_3_pt_stance = off_in_3_pt_stance
        self.ol_width = ol_width
        self.unbalanced_line = unbalanced_line
        self.skill_players = skill_players
        self.on_los_skill_players = on_los_skill_players
        self.extra_ol_players = extra_ol_players

    @staticmethod
    def from_dict(obj: Any) -> 'PresnapO':
        assert isinstance(obj, dict)
        personnel_o_on_play = int(from_str(obj.get("personnel_o_on_play")))
        no_huddle = from_int(obj.get("no_huddle"))
        off_formation_unbalanced = from_int(obj.get("off_formation_unbalanced"))
        trick_look = from_int(obj.get("trick_look"))
        bunch = from_bool(obj.get("bunch"))
        stacks = from_bool(obj.get("stacks"))
        shift_motion = from_bool(obj.get("shift_motion"))
        qb_on_play = from_int(obj.get("qb_on_play"))
        wr_on_play = from_int(obj.get("wr_on_play"))
        te_on_play = from_int(obj.get("te_on_play"))
        fb_on_play = from_int(obj.get("fb_on_play"))
        rb_on_play = from_int(obj.get("rb_on_play"))
        ol_on_play = from_int(obj.get("ol_on_play"))
        o_participation = from_list(from_str, obj.get("o_participation"))
        players_against_press = from_list(from_str, obj.get("players_against_press"))
        players_against_soft_press = from_list(from_str, obj.get("players_against_soft_press"))
        players_against_off = from_list(from_str, obj.get("players_against_off"))
        skill_positions = from_list(from_str, obj.get("skill_positions"))
        n_wider_paint = from_int(obj.get("n_wider_paint"))
        n_on_paint = from_int(obj.get("n_on_paint"))
        n_inside_paint = from_int(obj.get("n_inside_paint"))
        far_split_r = from_float(obj.get("far_split_r"))
        far_split_l = from_float(obj.get("far_split_l"))
        formation_width = from_float(obj.get("formation_width"))
        receiver_presnap_alignments = from_dict(lambda x: from_list(from_str, x), obj.get("receiver_presnap_alignments"))
        on_los_skill_pos_group = from_list(PosGroup, obj.get("on_los_skill_pos_group"))
        avg_ol_split = from_float(obj.get("avg_ol_split"))
        backfield_players = from_list(lambda x: x, obj.get("backfield_players"))
        backfield_pos_group = from_list(lambda x: x, obj.get("backfield_pos_group"))
        num_off_los_te = from_int(obj.get("num_off_los_te"))
        num_on_los_te = from_int(obj.get("num_on_los_te"))
        off_los_te = from_list(lambda x: x, obj.get("off_los_te"))
        on_los_te = from_list(lambda x: x, obj.get("on_los_te"))
        o_participation_info = from_list(Player.from_dict, obj.get("o_participation_info"))
        offensive_centroid_at_snap = from_list(from_float, obj.get("offensive_centroid_at_snap"))
        off_attached_centroid_at_snap = from_list(from_float, obj.get("off_attached_centroid_at_snap"))
        off_in_2_pt_stance = from_list(from_str, obj.get("off_in_2pt_stance"))
        off_in_3_pt_stance = from_list(from_str, obj.get("off_in_3pt_stance"))
        ol_width = from_float(obj.get("ol_width"))
        unbalanced_line = from_bool(obj.get("unbalanced_line"))
        skill_players = from_list(from_str, obj.get("skill_players"))
        on_los_skill_players = from_list(from_str, obj.get("on_los_skill_players"))
        extra_ol_players = from_list(lambda x: x, obj.get("extra_ol_players"))
        return PresnapO(personnel_o_on_play, no_huddle, off_formation_unbalanced, trick_look, bunch, stacks, shift_motion, qb_on_play, wr_on_play, te_on_play, fb_on_play, rb_on_play, ol_on_play, o_participation, players_against_press, players_against_soft_press, players_against_off, skill_positions, n_wider_paint, n_on_paint, n_inside_paint, far_split_r, far_split_l, formation_width, receiver_presnap_alignments, on_los_skill_pos_group, avg_ol_split, backfield_players, backfield_pos_group, num_off_los_te, num_on_los_te, off_los_te, on_los_te, o_participation_info, offensive_centroid_at_snap, off_attached_centroid_at_snap, off_in_2_pt_stance, off_in_3_pt_stance, ol_width, unbalanced_line, skill_players, on_los_skill_players, extra_ol_players)

    def to_dict(self) -> dict:
        result: dict = {}
        result["personnel_o_on_play"] = from_str(str(self.personnel_o_on_play))
        result["no_huddle"] = from_int(self.no_huddle)
        result["off_formation_unbalanced"] = from_int(self.off_formation_unbalanced)
        result["trick_look"] = from_int(self.trick_look)
        result["bunch"] = from_bool(self.bunch)
        result["stacks"] = from_bool(self.stacks)
        result["shift_motion"] = from_bool(self.shift_motion)
        result["qb_on_play"] = from_int(self.qb_on_play)
        result["wr_on_play"] = from_int(self.wr_on_play)
        result["te_on_play"] = from_int(self.te_on_play)
        result["fb_on_play"] = from_int(self.fb_on_play)
        result["rb_on_play"] = from_int(self.rb_on_play)
        result["ol_on_play"] = from_int(self.ol_on_play)
        result["o_participation"] = from_list(from_str, self.o_participation)
        result["players_against_press"] = from_list(from_str, self.players_against_press)
        result["players_against_soft_press"] = from_list(from_str, self.players_against_soft_press)
        result["players_against_off"] = from_list(from_str, self.players_against_off)
        result["skill_positions"] = from_list(from_str, self.skill_positions)
        result["n_wider_paint"] = from_int(self.n_wider_paint)
        result["n_on_paint"] = from_int(self.n_on_paint)
        result["n_inside_paint"] = from_int(self.n_inside_paint)
        result["far_split_r"] = to_float(self.far_split_r)
        result["far_split_l"] = to_float(self.far_split_l)
        result["formation_width"] = to_float(self.formation_width)
        result["receiver_presnap_alignments"] = from_dict(lambda x: from_list(from_str, x), self.receiver_presnap_alignments)
        result["on_los_skill_pos_group"] = from_list(lambda x: to_enum(PosGroup, x), self.on_los_skill_pos_group)
        result["avg_ol_split"] = to_float(self.avg_ol_split)
        result["backfield_players"] = from_list(lambda x: x, self.backfield_players)
        result["backfield_pos_group"] = from_list(lambda x: x, self.backfield_pos_group)
        result["num_off_los_te"] = from_int(self.num_off_los_te)
        result["num_on_los_te"] = from_int(self.num_on_los_te)
        result["off_los_te"] = from_list(lambda x: x, self.off_los_te)
        result["on_los_te"] = from_list(lambda x: x, self.on_los_te)
        result["o_participation_info"] = from_list(lambda x: to_class(Player, x), self.o_participation_info)
        result["offensive_centroid_at_snap"] = from_list(to_float, self.offensive_centroid_at_snap)
        result["off_attached_centroid_at_snap"] = from_list(to_float, self.off_attached_centroid_at_snap)
        result["off_in_2pt_stance"] = from_list(from_str, self.off_in_2_pt_stance)
        result["off_in_3pt_stance"] = from_list(from_str, self.off_in_3_pt_stance)
        result["ol_width"] = to_float(self.ol_width)
        result["unbalanced_line"] = from_bool(self.unbalanced_line)
        result["skill_players"] = from_list(from_str, self.skill_players)
        result["on_los_skill_players"] = from_list(from_str, self.on_los_skill_players)
        result["extra_ol_players"] = from_list(lambda x: x, self.extra_ol_players)
        return result


class GsisMeta:
    scoring: bool

    def __init__(self, scoring: bool) -> None:
        self.scoring = scoring

    @staticmethod
    def from_dict(obj: Any) -> 'GsisMeta':
        assert isinstance(obj, dict)
        scoring = from_bool(obj.get("scoring"))
        return GsisMeta(scoring)

    def to_dict(self) -> dict:
        result: dict = {}
        result["scoring"] = from_bool(self.scoring)
        return result


class Result:
    play_type: str
    play_type_intent: str
    play_success_outcome: bool
    gsis_meta: GsisMeta

    def __init__(self, play_type: str, play_type_intent: str, play_success_outcome: bool, gsis_meta: GsisMeta) -> None:
        self.play_type = play_type
        self.play_type_intent = play_type_intent
        self.play_success_outcome = play_success_outcome
        self.gsis_meta = gsis_meta

    @staticmethod
    def from_dict(obj: Any) -> 'Result':
        assert isinstance(obj, dict)
        play_type = from_str(obj.get("play_type"))
        play_type_intent = from_str(obj.get("play_type_intent"))
        play_success_outcome = from_bool(obj.get("play_success_outcome"))
        gsis_meta = GsisMeta.from_dict(obj.get("gsis_meta"))
        return Result(play_type, play_type_intent, play_success_outcome, gsis_meta)

    def to_dict(self) -> dict:
        result: dict = {}
        result["play_type"] = from_str(self.play_type)
        result["play_type_intent"] = from_str(self.play_type_intent)
        result["play_success_outcome"] = from_bool(self.play_success_outcome)
        result["gsis_meta"] = to_class(GsisMeta, self.gsis_meta)
        return result


class Schedule:
    game_date: str
    game_key: int
    season: int
    week: str
    season_type: str
    home: str
    visitor: str

    def __init__(self, game_date: str, game_key: int, season: int, week: str, season_type: str, home: str, visitor: str) -> None:
        self.game_date = game_date
        self.game_key = game_key
        self.season = season
        self.week = week
        self.season_type = season_type
        self.home = home
        self.visitor = visitor

    @staticmethod
    def from_dict(obj: Any) -> 'Schedule':
        assert isinstance(obj, dict)
        game_date = from_str(obj.get("game_date"))
        game_key = int(from_str(obj.get("game_key")))
        season = from_int(obj.get("season"))
        week = from_str(obj.get("week"))
        season_type = from_str(obj.get("season_type"))
        home = from_str(obj.get("home"))
        visitor = from_str(obj.get("visitor"))
        return Schedule(game_date, game_key, season, week, season_type, home, visitor)

    def to_dict(self) -> dict:
        result: dict = {}
        result["game_date"] = from_str(self.game_date)
        result["game_key"] = from_str(str(self.game_key))
        result["season"] = from_int(self.season)
        result["week"] = from_str(self.week)
        result["season_type"] = from_str(self.season_type)
        result["home"] = from_str(self.home)
        result["visitor"] = from_str(self.visitor)
        return result


class End:
    event: str
    telemetry_yardline: int

    def __init__(self, event: str, telemetry_yardline: int) -> None:
        self.event = event
        self.telemetry_yardline = telemetry_yardline

    @staticmethod
    def from_dict(obj: Any) -> 'End':
        assert isinstance(obj, dict)
        event = from_str(obj.get("event"))
        telemetry_yardline = from_int(obj.get("telemetry_yardline"))
        return End(event, telemetry_yardline)

    def to_dict(self) -> dict:
        result: dict = {}
        result["event"] = from_str(self.event)
        result["telemetry_yardline"] = from_int(self.telemetry_yardline)
        return result


class Play:
    play_in_drive: int
    down: int
    play_id: str
    play_type: str
    result_yards: int
    ytg: int
    personnel_d: int
    personnel_o: int
    first_down: int

    def __init__(self, play_in_drive: int, down: int, play_id: str, play_type: str, result_yards: int, ytg: int, personnel_d: int, personnel_o: int, first_down: int) -> None:
        self.play_in_drive = play_in_drive
        self.down = down
        self.play_id = play_id
        self.play_type = play_type
        self.result_yards = result_yards
        self.ytg = ytg
        self.personnel_d = personnel_d
        self.personnel_o = personnel_o
        self.first_down = first_down

    @staticmethod
    def from_dict(obj: Any) -> 'Play':
        assert isinstance(obj, dict)
        play_in_drive = from_int(obj.get("play_in_drive"))
        down = from_int(obj.get("down"))
        play_id = from_str(obj.get("play_id"))
        play_type = from_str(obj.get("play_type"))
        result_yards = from_int(obj.get("result_yards"))
        ytg = from_int(obj.get("ytg"))
        personnel_d = int(from_str(obj.get("personnel_d")))
        personnel_o = int(from_str(obj.get("personnel_o")))
        first_down = from_int(obj.get("first_down"))
        return Play(play_in_drive, down, play_id, play_type, result_yards, ytg, personnel_d, personnel_o, first_down)

    def to_dict(self) -> dict:
        result: dict = {}
        result["play_in_drive"] = from_int(self.play_in_drive)
        result["down"] = from_int(self.down)
        result["play_id"] = from_str(self.play_id)
        result["play_type"] = from_str(self.play_type)
        result["result_yards"] = from_int(self.result_yards)
        result["ytg"] = from_int(self.ytg)
        result["personnel_d"] = from_str(str(self.personnel_d))
        result["personnel_o"] = from_str(str(self.personnel_o))
        result["first_down"] = from_int(self.first_down)
        return result


class Scoreboard:
    alabama: int
    kansas_st: int

    def __init__(self, alabama: int, kansas_st: int) -> None:
        self.alabama = alabama
        self.kansas_st = kansas_st

    @staticmethod
    def from_dict(obj: Any) -> 'Scoreboard':
        assert isinstance(obj, dict)
        alabama = from_int(obj.get("alabama"))
        kansas_st = from_int(obj.get("kansas-st"))
        return Scoreboard(alabama, kansas_st)

    def to_dict(self) -> dict:
        result: dict = {}
        result["alabama"] = from_int(self.alabama)
        result["kansas-st"] = from_int(self.kansas_st)
        return result


class Score:
    poss_score_diff: int
    scoreboard: Scoreboard

    def __init__(self, poss_score_diff: int, scoreboard: Scoreboard) -> None:
        self.poss_score_diff = poss_score_diff
        self.scoreboard = scoreboard

    @staticmethod
    def from_dict(obj: Any) -> 'Score':
        assert isinstance(obj, dict)
        poss_score_diff = from_int(obj.get("poss_score_diff"))
        scoreboard = Scoreboard.from_dict(obj.get("scoreboard"))
        return Score(poss_score_diff, scoreboard)

    def to_dict(self) -> dict:
        result: dict = {}
        result["poss_score_diff"] = from_int(self.poss_score_diff)
        result["scoreboard"] = to_class(Scoreboard, self.scoreboard)
        return result


class Drive:
    team_drive_number: int
    off_play_in_drive: int
    play_in_game: int
    score: Score
    start: End
    end: End
    plays: List[Play]
    prev_play: Play
    yards: int
    first_downs: int
    yards_penalized: int

    def __init__(self, team_drive_number: int, off_play_in_drive: int, play_in_game: int, score: Score, start: End, end: End, plays: List[Play], prev_play: Play, yards: int, first_downs: int, yards_penalized: int) -> None:
        self.team_drive_number = team_drive_number
        self.off_play_in_drive = off_play_in_drive
        self.play_in_game = play_in_game
        self.score = score
        self.start = start
        self.end = end
        self.plays = plays
        self.prev_play = prev_play
        self.yards = yards
        self.first_downs = first_downs
        self.yards_penalized = yards_penalized

    @staticmethod
    def from_dict(obj: Any) -> 'Drive':
        assert isinstance(obj, dict)
        team_drive_number = from_int(obj.get("team_drive_number"))
        off_play_in_drive = from_int(obj.get("off_play_in_drive"))
        play_in_game = from_int(obj.get("play_in_game"))
        score = Score.from_dict(obj.get("score"))
        start = End.from_dict(obj.get("start"))
        end = End.from_dict(obj.get("end"))
        plays = from_list(Play.from_dict, obj.get("plays"))
        prev_play = Play.from_dict(obj.get("prev_play"))
        yards = from_int(obj.get("yards"))
        first_downs = from_int(obj.get("first_downs"))
        yards_penalized = from_int(obj.get("yards_penalized"))
        return Drive(team_drive_number, off_play_in_drive, play_in_game, score, start, end, plays, prev_play, yards, first_downs, yards_penalized)

    def to_dict(self) -> dict:
        result: dict = {}
        result["team_drive_number"] = from_int(self.team_drive_number)
        result["off_play_in_drive"] = from_int(self.off_play_in_drive)
        result["play_in_game"] = from_int(self.play_in_game)
        result["score"] = to_class(Score, self.score)
        result["start"] = to_class(End, self.start)
        result["end"] = to_class(End, self.end)
        result["plays"] = from_list(lambda x: to_class(Play, x), self.plays)
        result["prev_play"] = to_class(Play, self.prev_play)
        result["yards"] = from_int(self.yards)
        result["first_downs"] = from_int(self.first_downs)
        result["yards_penalized"] = from_int(self.yards_penalized)
        return result


class Situation:
    garbage_time: int
    two_minute: int
    score_differential: int
    time_remaining_qtr: float
    time_remaining_half: float
    time_remaining_game: float
    drive: Drive

    def __init__(self, garbage_time: int, two_minute: int, score_differential: int, time_remaining_qtr: float, time_remaining_half: float, time_remaining_game: float, drive: Drive) -> None:
        self.garbage_time = garbage_time
        self.two_minute = two_minute
        self.score_differential = score_differential
        self.time_remaining_qtr = time_remaining_qtr
        self.time_remaining_half = time_remaining_half
        self.time_remaining_game = time_remaining_game
        self.drive = drive

    @staticmethod
    def from_dict(obj: Any) -> 'Situation':
        assert isinstance(obj, dict)
        garbage_time = from_int(obj.get("garbage_time"))
        two_minute = from_int(obj.get("two_minute"))
        score_differential = from_int(obj.get("score_differential"))
        time_remaining_qtr = from_float(obj.get("time_remaining_qtr"))
        time_remaining_half = from_float(obj.get("time_remaining_half"))
        time_remaining_game = from_float(obj.get("time_remaining_game"))
        drive = Drive.from_dict(obj.get("drive"))
        return Situation(garbage_time, two_minute, score_differential, time_remaining_qtr, time_remaining_half, time_remaining_game, drive)

    def to_dict(self) -> dict:
        result: dict = {}
        result["garbage_time"] = from_int(self.garbage_time)
        result["two_minute"] = from_int(self.two_minute)
        result["score_differential"] = from_int(self.score_differential)
        result["time_remaining_qtr"] = to_float(self.time_remaining_qtr)
        result["time_remaining_half"] = to_float(self.time_remaining_half)
        result["time_remaining_game"] = to_float(self.time_remaining_game)
        result["drive"] = to_class(Drive, self.drive)
        return result


class TargetNearestDefenderArrived:
    distance: float
    lua: str
    player: Player
    positioning_field: str
    positioning_relative: str
    rel_xy: List[float]

    def __init__(self, distance: float, lua: str, player: Player, positioning_field: str, positioning_relative: str, rel_xy: List[float]) -> None:
        self.distance = distance
        self.lua = lua
        self.player = player
        self.positioning_field = positioning_field
        self.positioning_relative = positioning_relative
        self.rel_xy = rel_xy

    @staticmethod
    def from_dict(obj: Any) -> 'TargetNearestDefenderArrived':
        assert isinstance(obj, dict)
        distance = from_float(obj.get("distance"))
        lua = from_str(obj.get("lua"))
        player = Player.from_dict(obj.get("player"))
        positioning_field = from_str(obj.get("positioning_field"))
        positioning_relative = from_str(obj.get("positioning_relative"))
        rel_xy = from_list(from_float, obj.get("rel_xy"))
        return TargetNearestDefenderArrived(distance, lua, player, positioning_field, positioning_relative, rel_xy)

    def to_dict(self) -> dict:
        result: dict = {}
        result["distance"] = to_float(self.distance)
        result["lua"] = from_str(self.lua)
        result["player"] = to_class(Player, self.player)
        result["positioning_field"] = from_str(self.positioning_field)
        result["positioning_relative"] = from_str(self.positioning_relative)
        result["rel_xy"] = from_list(to_float, self.rel_xy)
        return result


class Metrica:
    qb_launch_point: List[float]
    target_at_pass: List[float]
    target_at_arrived: List[float]
    target_depth: float
    target_at_arrived_abs: List[float]
    target_dist_from_boundary: float
    target_dist_from_cof: float
    target_lua: str
    target_separation_pass: float
    target_nearest_defender_pass: TargetNearestDefenderArrived
    target_next_nearest_defender_pass: TargetNearestDefenderArrived
    target_separation_arrived: float
    target_nearest_defender_arrived: TargetNearestDefenderArrived
    target_next_nearest_defender_arrived: TargetNearestDefenderArrived
    target_ground_covered: float
    def_ground_covered: float
    target_double_coverage: bool
    target_skill: str

    def __init__(self, qb_launch_point: List[float], target_at_pass: List[float], target_at_arrived: List[float], target_depth: float, target_at_arrived_abs: List[float], target_dist_from_boundary: float, target_dist_from_cof: float, target_lua: str, target_separation_pass: float, target_nearest_defender_pass: TargetNearestDefenderArrived, target_next_nearest_defender_pass: TargetNearestDefenderArrived, target_separation_arrived: float, target_nearest_defender_arrived: TargetNearestDefenderArrived, target_next_nearest_defender_arrived: TargetNearestDefenderArrived, target_ground_covered: float, def_ground_covered: float, target_double_coverage: bool, target_skill: str) -> None:
        self.qb_launch_point = qb_launch_point
        self.target_at_pass = target_at_pass
        self.target_at_arrived = target_at_arrived
        self.target_depth = target_depth
        self.target_at_arrived_abs = target_at_arrived_abs
        self.target_dist_from_boundary = target_dist_from_boundary
        self.target_dist_from_cof = target_dist_from_cof
        self.target_lua = target_lua
        self.target_separation_pass = target_separation_pass
        self.target_nearest_defender_pass = target_nearest_defender_pass
        self.target_next_nearest_defender_pass = target_next_nearest_defender_pass
        self.target_separation_arrived = target_separation_arrived
        self.target_nearest_defender_arrived = target_nearest_defender_arrived
        self.target_next_nearest_defender_arrived = target_next_nearest_defender_arrived
        self.target_ground_covered = target_ground_covered
        self.def_ground_covered = def_ground_covered
        self.target_double_coverage = target_double_coverage
        self.target_skill = target_skill

    @staticmethod
    def from_dict(obj: Any) -> 'Metrica':
        assert isinstance(obj, dict)
        qb_launch_point = from_list(from_float, obj.get("qb_launch_point"))
        target_at_pass = from_list(from_float, obj.get("target_at_pass"))
        target_at_arrived = from_list(from_float, obj.get("target_at_arrived"))
        target_depth = from_float(obj.get("target_depth"))
        target_at_arrived_abs = from_list(from_float, obj.get("target_at_arrived_abs"))
        target_dist_from_boundary = from_float(obj.get("target_dist_from_boundary"))
        target_dist_from_cof = from_float(obj.get("target_dist_from_cof"))
        target_lua = from_str(obj.get("target_lua"))
        target_separation_pass = from_float(obj.get("target_separation_pass"))
        target_nearest_defender_pass = TargetNearestDefenderArrived.from_dict(obj.get("target_nearest_defender_pass"))
        target_next_nearest_defender_pass = TargetNearestDefenderArrived.from_dict(obj.get("target_next_nearest_defender_pass"))
        target_separation_arrived = from_float(obj.get("target_separation_arrived"))
        target_nearest_defender_arrived = TargetNearestDefenderArrived.from_dict(obj.get("target_nearest_defender_arrived"))
        target_next_nearest_defender_arrived = TargetNearestDefenderArrived.from_dict(obj.get("target_next_nearest_defender_arrived"))
        target_ground_covered = from_float(obj.get("target_ground_covered"))
        def_ground_covered = from_float(obj.get("def_ground_covered"))
        target_double_coverage = from_bool(obj.get("target_double_coverage"))
        target_skill = from_str(obj.get("target_skill"))
        return Metrica(qb_launch_point, target_at_pass, target_at_arrived, target_depth, target_at_arrived_abs, target_dist_from_boundary, target_dist_from_cof, target_lua, target_separation_pass, target_nearest_defender_pass, target_next_nearest_defender_pass, target_separation_arrived, target_nearest_defender_arrived, target_next_nearest_defender_arrived, target_ground_covered, def_ground_covered, target_double_coverage, target_skill)

    def to_dict(self) -> dict:
        result: dict = {}
        result["qb_launch_point"] = from_list(to_float, self.qb_launch_point)
        result["target_at_pass"] = from_list(to_float, self.target_at_pass)
        result["target_at_arrived"] = from_list(to_float, self.target_at_arrived)
        result["target_depth"] = to_float(self.target_depth)
        result["target_at_arrived_abs"] = from_list(to_float, self.target_at_arrived_abs)
        result["target_dist_from_boundary"] = to_float(self.target_dist_from_boundary)
        result["target_dist_from_cof"] = to_float(self.target_dist_from_cof)
        result["target_lua"] = from_str(self.target_lua)
        result["target_separation_pass"] = to_float(self.target_separation_pass)
        result["target_nearest_defender_pass"] = to_class(TargetNearestDefenderArrived, self.target_nearest_defender_pass)
        result["target_next_nearest_defender_pass"] = to_class(TargetNearestDefenderArrived, self.target_next_nearest_defender_pass)
        result["target_separation_arrived"] = to_float(self.target_separation_arrived)
        result["target_nearest_defender_arrived"] = to_class(TargetNearestDefenderArrived, self.target_nearest_defender_arrived)
        result["target_next_nearest_defender_arrived"] = to_class(TargetNearestDefenderArrived, self.target_next_nearest_defender_arrived)
        result["target_ground_covered"] = to_float(self.target_ground_covered)
        result["def_ground_covered"] = to_float(self.def_ground_covered)
        result["target_double_coverage"] = from_bool(self.target_double_coverage)
        result["target_skill"] = from_str(self.target_skill)
        return result


class Timing:
    ttp: float

    def __init__(self, ttp: float) -> None:
        self.ttp = ttp

    @staticmethod
    def from_dict(obj: Any) -> 'Timing':
        assert isinstance(obj, dict)
        ttp = from_float(obj.get("ttp"))
        return Timing(ttp)

    def to_dict(self) -> dict:
        result: dict = {}
        result["ttp"] = to_float(self.ttp)
        return result


class Summary:
    tfl: bool
    completion: bool
    metrica: Metrica
    target: Player
    pressure: List[Pressure]
    protection: List[TargetNearestDefenderArrived]
    result_yds: int
    tackle_assist_by: List[Any]
    pass_breakup_by: Player
    primary_coverage_by: Player
    target_pass_coverage_by: Player
    passer: Player
    timing: Timing
    lop: int
    third_conv: str

    def __init__(self, tfl: bool, completion: bool, metrica: Metrica, target: Player, pressure: List[Pressure], protection: List[TargetNearestDefenderArrived], result_yds: int, tackle_assist_by: List[Any], pass_breakup_by: Player, primary_coverage_by: Player, target_pass_coverage_by: Player, passer: Player, timing: Timing, lop: int, third_conv: str) -> None:
        self.tfl = tfl
        self.completion = completion
        self.metrica = metrica
        self.target = target
        self.pressure = pressure
        self.protection = protection
        self.result_yds = result_yds
        self.tackle_assist_by = tackle_assist_by
        self.pass_breakup_by = pass_breakup_by
        self.primary_coverage_by = primary_coverage_by
        self.target_pass_coverage_by = target_pass_coverage_by
        self.passer = passer
        self.timing = timing
        self.lop = lop
        self.third_conv = third_conv

    @staticmethod
    def from_dict(obj: Any) -> 'Summary':
        assert isinstance(obj, dict)
        tfl = from_bool(obj.get("tfl"))
        completion = from_bool(obj.get("completion"))
        metrica = Metrica.from_dict(obj.get("metrica"))
        target = Player.from_dict(obj.get("target"))
        pressure = from_list(Pressure.from_dict, obj.get("pressure"))
        protection = from_list(TargetNearestDefenderArrived.from_dict, obj.get("protection"))
        result_yds = from_int(obj.get("result_yds"))
        tackle_assist_by = from_list(lambda x: x, obj.get("tackle_assist_by"))
        pass_breakup_by = Player.from_dict(obj.get("pass_breakup_by"))
        primary_coverage_by = Player.from_dict(obj.get("primary_coverage_by"))
        target_pass_coverage_by = Player.from_dict(obj.get("target_pass_coverage_by"))
        passer = Player.from_dict(obj.get("passer"))
        timing = Timing.from_dict(obj.get("timing"))
        lop = from_int(obj.get("lop"))
        third_conv = from_str(obj.get("third_conv"))
        return Summary(tfl, completion, metrica, target, pressure, protection, result_yds, tackle_assist_by, pass_breakup_by, primary_coverage_by, target_pass_coverage_by, passer, timing, lop, third_conv)

    def to_dict(self) -> dict:
        result: dict = {}
        result["tfl"] = from_bool(self.tfl)
        result["completion"] = from_bool(self.completion)
        result["metrica"] = to_class(Metrica, self.metrica)
        result["target"] = to_class(Player, self.target)
        result["pressure"] = from_list(lambda x: to_class(Pressure, x), self.pressure)
        result["protection"] = from_list(lambda x: to_class(TargetNearestDefenderArrived, x), self.protection)
        result["result_yds"] = from_int(self.result_yds)
        result["tackle_assist_by"] = from_list(lambda x: x, self.tackle_assist_by)
        result["pass_breakup_by"] = to_class(Player, self.pass_breakup_by)
        result["primary_coverage_by"] = to_class(Player, self.primary_coverage_by)
        result["target_pass_coverage_by"] = to_class(Player, self.target_pass_coverage_by)
        result["passer"] = to_class(Player, self.passer)
        result["timing"] = to_class(Timing, self.timing)
        result["lop"] = from_int(self.lop)
        result["third_conv"] = from_str(self.third_conv)
        return result


class Stats:
    summary: Summary

    def __init__(self, summary: Summary) -> None:
        self.summary = summary

    @staticmethod
    def from_dict(obj: Any) -> 'Stats':
        assert isinstance(obj, dict)
        summary = Summary.from_dict(obj.get("summary"))
        return Stats(summary)

    def to_dict(self) -> dict:
        result: dict = {}
        result["summary"] = to_class(Summary, self.summary)
        return result


class Game:
    id: str
    game_id: int
    play_id: int
    pff_gameid: int
    pff_playid: int
    play_number: int
    offense: str
    defense: str
    down: int
    yards_to_go: int
    yardline: str
    ball0: List[float]
    los_telemetry: int
    quarter: int
    game_clock: str
    hash: str
    special_teams: bool
    play_clock: int
    play_type: str
    personnel: int
    formation_base: str
    formation_code: str
    receiver_buckets: List[int]
    is_penalty: bool
    qb_pos: str
    schedule: Schedule
    situation: Situation
    presnap_o: PresnapO
    presnap_d: PresnapD
    play_d: PlayD
    play_o: PlayO
    stats: Stats
    result: Result
    pass_strength: str
    run_strength: str
    skill_r_qty: int
    skill_l_qty: int
    num_backfield: int
    num_tight: int
    num_slot: int
    num_wide: int
    condensed_formation: bool
    attached_formation: bool
    formation: Formation
    o_paths: List[OPath]
    n_in_box: int
    d_paths: List[DPath]
    field_side: str
    boundary_side: str
    tracking: bool
    overlay: Overlay
    sliq_id: str
    sliq_game_id: int
    events: Events
    ol_extremes: List[float]
    roster_rb_count: int
    roster_te_count: int
    roster_wr_count: int
    backfield_buckets: List[int]
    n_linemen: int
    te_pair: bool
    stacks: bool
    bunch: bool
    is_scoring: bool
    te_trio: bool
    document_hash: str
    last_updt_ts: datetime

    def __init__(self, id: str, game_id: int, play_id: int, pff_gameid: int, pff_playid: int, play_number: int, offense: str, defense: str, down: int, yards_to_go: int, yardline: str, ball0: List[float], los_telemetry: int, quarter: int, game_clock: str, hash: str, special_teams: bool, play_clock: int, play_type: str, personnel: int, formation_base: str, formation_code: str, receiver_buckets: List[int], is_penalty: bool, qb_pos: str, schedule: Schedule, situation: Situation, presnap_o: PresnapO, presnap_d: PresnapD, play_d: PlayD, play_o: PlayO, stats: Stats, result: Result, pass_strength: str, run_strength: str, skill_r_qty: int, skill_l_qty: int, num_backfield: int, num_tight: int, num_slot: int, num_wide: int, condensed_formation: bool, attached_formation: bool, formation: Formation, o_paths: List[OPath], n_in_box: int, d_paths: List[DPath], field_side: str, boundary_side: str, tracking: bool, overlay: Overlay, sliq_id: str, sliq_game_id: int, events: Events, ol_extremes: List[float], roster_rb_count: int, roster_te_count: int, roster_wr_count: int, backfield_buckets: List[int], n_linemen: int, te_pair: bool, stacks: bool, bunch: bool, is_scoring: bool, te_trio: bool, document_hash: str, last_updt_ts: datetime) -> None:
        self.id = id
        self.game_id = game_id
        self.play_id = play_id
        self.pff_gameid = pff_gameid
        self.pff_playid = pff_playid
        self.play_number = play_number
        self.offense = offense
        self.defense = defense
        self.down = down
        self.yards_to_go = yards_to_go
        self.yardline = yardline
        self.ball0 = ball0
        self.los_telemetry = los_telemetry
        self.quarter = quarter
        self.game_clock = game_clock
        self.hash = hash
        self.special_teams = special_teams
        self.play_clock = play_clock
        self.play_type = play_type
        self.personnel = personnel
        self.formation_base = formation_base
        self.formation_code = formation_code
        self.receiver_buckets = receiver_buckets
        self.is_penalty = is_penalty
        self.qb_pos = qb_pos
        self.schedule = schedule
        self.situation = situation
        self.presnap_o = presnap_o
        self.presnap_d = presnap_d
        self.play_d = play_d
        self.play_o = play_o
        self.stats = stats
        self.result = result
        self.pass_strength = pass_strength
        self.run_strength = run_strength
        self.skill_r_qty = skill_r_qty
        self.skill_l_qty = skill_l_qty
        self.num_backfield = num_backfield
        self.num_tight = num_tight
        self.num_slot = num_slot
        self.num_wide = num_wide
        self.condensed_formation = condensed_formation
        self.attached_formation = attached_formation
        self.formation = formation
        self.o_paths = o_paths
        self.n_in_box = n_in_box
        self.d_paths = d_paths
        self.field_side = field_side
        self.boundary_side = boundary_side
        self.tracking = tracking
        self.overlay = overlay
        self.sliq_id = sliq_id
        self.sliq_game_id = sliq_game_id
        self.events = events
        self.ol_extremes = ol_extremes
        self.roster_rb_count = roster_rb_count
        self.roster_te_count = roster_te_count
        self.roster_wr_count = roster_wr_count
        self.backfield_buckets = backfield_buckets
        self.n_linemen = n_linemen
        self.te_pair = te_pair
        self.stacks = stacks
        self.bunch = bunch
        self.is_scoring = is_scoring
        self.te_trio = te_trio
        self.document_hash = document_hash
        self.last_updt_ts = last_updt_ts

    @staticmethod
    def from_dict(obj: Any) -> 'Game':
        assert isinstance(obj, dict)
        id = from_str(obj.get("_id"))
        game_id = from_int(obj.get("game_id"))
        play_id = from_int(obj.get("play_id"))
        pff_gameid = from_int(obj.get("pff_GAMEID"))
        pff_playid = from_int(obj.get("pff_PLAYID"))
        play_number = from_int(obj.get("play_number"))
        offense = from_str(obj.get("offense"))
        defense = from_str(obj.get("defense"))
        down = from_int(obj.get("down"))
        yards_to_go = from_int(obj.get("yards_to_go"))
        yardline = from_str(obj.get("yardline"))
        ball0 = from_list(from_float, obj.get("ball0"))
        los_telemetry = from_int(obj.get("los_telemetry"))
        quarter = from_int(obj.get("quarter"))
        game_clock = from_str(obj.get("game_clock"))
        hash = from_str(obj.get("hash"))
        special_teams = from_bool(obj.get("special_teams"))
        play_clock = from_int(obj.get("play_clock"))
        play_type = from_str(obj.get("play_type"))
        personnel = int(from_str(obj.get("personnel")))
        formation_base = from_str(obj.get("formation_base"))
        formation_code = from_str(obj.get("formation_code"))
        receiver_buckets = from_list(from_int, obj.get("receiver_buckets"))
        is_penalty = from_bool(obj.get("is_penalty"))
        qb_pos = from_str(obj.get("qb_pos"))
        schedule = Schedule.from_dict(obj.get("schedule"))
        situation = Situation.from_dict(obj.get("situation"))
        presnap_o = PresnapO.from_dict(obj.get("presnap_o"))
        presnap_d = PresnapD.from_dict(obj.get("presnap_d"))
        play_d = PlayD.from_dict(obj.get("play_d"))
        play_o = PlayO.from_dict(obj.get("play_o"))
        stats = Stats.from_dict(obj.get("stats"))
        result = Result.from_dict(obj.get("result"))
        pass_strength = from_str(obj.get("pass_strength"))
        run_strength = from_str(obj.get("run_strength"))
        skill_r_qty = from_int(obj.get("skill_r_qty"))
        skill_l_qty = from_int(obj.get("skill_l_qty"))
        num_backfield = from_int(obj.get("num_backfield"))
        num_tight = from_int(obj.get("num_tight"))
        num_slot = from_int(obj.get("num_slot"))
        num_wide = from_int(obj.get("num_wide"))
        condensed_formation = from_bool(obj.get("condensed_formation"))
        attached_formation = from_bool(obj.get("attached_formation"))
        formation = Formation.from_dict(obj.get("formation"))
        o_paths = from_list(OPath.from_dict, obj.get("o_paths"))
        n_in_box = from_int(obj.get("n_in_box"))
        d_paths = from_list(DPath.from_dict, obj.get("d_paths"))
        field_side = from_str(obj.get("field_side"))
        boundary_side = from_str(obj.get("boundary_side"))
        tracking = from_bool(obj.get("tracking"))
        overlay = Overlay.from_dict(obj.get("overlay"))
        sliq_id = from_str(obj.get("sliq_id"))
        sliq_game_id = from_int(obj.get("sliq_game_id"))
        events = Events.from_dict(obj.get("events"))
        ol_extremes = from_list(from_float, obj.get("ol_extremes"))
        roster_rb_count = from_int(obj.get("roster_rb_count"))
        roster_te_count = from_int(obj.get("roster_te_count"))
        roster_wr_count = from_int(obj.get("roster_wr_count"))
        backfield_buckets = from_list(from_int, obj.get("backfield_buckets"))
        n_linemen = from_int(obj.get("n_linemen"))
        te_pair = from_bool(obj.get("te_pair"))
        stacks = from_bool(obj.get("stacks"))
        bunch = from_bool(obj.get("bunch"))
        is_scoring = from_bool(obj.get("is_scoring"))
        te_trio = from_bool(obj.get("te_trio"))
        document_hash = from_str(obj.get("document_hash"))
        last_updt_ts = from_datetime(obj.get("last_updt_ts"))
        return Game(id, game_id, play_id, pff_gameid, pff_playid, play_number, offense, defense, down, yards_to_go, yardline, ball0, los_telemetry, quarter, game_clock, hash, special_teams, play_clock, play_type, personnel, formation_base, formation_code, receiver_buckets, is_penalty, qb_pos, schedule, situation, presnap_o, presnap_d, play_d, play_o, stats, result, pass_strength, run_strength, skill_r_qty, skill_l_qty, num_backfield, num_tight, num_slot, num_wide, condensed_formation, attached_formation, formation, o_paths, n_in_box, d_paths, field_side, boundary_side, tracking, overlay, sliq_id, sliq_game_id, events, ol_extremes, roster_rb_count, roster_te_count, roster_wr_count, backfield_buckets, n_linemen, te_pair, stacks, bunch, is_scoring, te_trio, document_hash, last_updt_ts)

    def to_dict(self) -> dict:
        result: dict = {}
        result["_id"] = from_str(self.id)
        result["game_id"] = from_int(self.game_id)
        result["play_id"] = from_int(self.play_id)
        result["pff_GAMEID"] = from_int(self.pff_gameid)
        result["pff_PLAYID"] = from_int(self.pff_playid)
        result["play_number"] = from_int(self.play_number)
        result["offense"] = from_str(self.offense)
        result["defense"] = from_str(self.defense)
        result["down"] = from_int(self.down)
        result["yards_to_go"] = from_int(self.yards_to_go)
        result["yardline"] = from_str(self.yardline)
        result["ball0"] = from_list(to_float, self.ball0)
        result["los_telemetry"] = from_int(self.los_telemetry)
        result["quarter"] = from_int(self.quarter)
        result["game_clock"] = from_str(self.game_clock)
        result["hash"] = from_str(self.hash)
        result["special_teams"] = from_bool(self.special_teams)
        result["play_clock"] = from_int(self.play_clock)
        result["play_type"] = from_str(self.play_type)
        result["personnel"] = from_str(str(self.personnel))
        result["formation_base"] = from_str(self.formation_base)
        result["formation_code"] = from_str(self.formation_code)
        result["receiver_buckets"] = from_list(from_int, self.receiver_buckets)
        result["is_penalty"] = from_bool(self.is_penalty)
        result["qb_pos"] = from_str(self.qb_pos)
        result["schedule"] = to_class(Schedule, self.schedule)
        result["situation"] = to_class(Situation, self.situation)
        result["presnap_o"] = to_class(PresnapO, self.presnap_o)
        result["presnap_d"] = to_class(PresnapD, self.presnap_d)
        result["play_d"] = to_class(PlayD, self.play_d)
        result["play_o"] = to_class(PlayO, self.play_o)
        result["stats"] = to_class(Stats, self.stats)
        result["result"] = to_class(Result, self.result)
        result["pass_strength"] = from_str(self.pass_strength)
        result["run_strength"] = from_str(self.run_strength)
        result["skill_r_qty"] = from_int(self.skill_r_qty)
        result["skill_l_qty"] = from_int(self.skill_l_qty)
        result["num_backfield"] = from_int(self.num_backfield)
        result["num_tight"] = from_int(self.num_tight)
        result["num_slot"] = from_int(self.num_slot)
        result["num_wide"] = from_int(self.num_wide)
        result["condensed_formation"] = from_bool(self.condensed_formation)
        result["attached_formation"] = from_bool(self.attached_formation)
        result["formation"] = to_class(Formation, self.formation)
        result["o_paths"] = from_list(lambda x: to_class(OPath, x), self.o_paths)
        result["n_in_box"] = from_int(self.n_in_box)
        result["d_paths"] = from_list(lambda x: to_class(DPath, x), self.d_paths)
        result["field_side"] = from_str(self.field_side)
        result["boundary_side"] = from_str(self.boundary_side)
        result["tracking"] = from_bool(self.tracking)
        result["overlay"] = to_class(Overlay, self.overlay)
        result["sliq_id"] = from_str(self.sliq_id)
        result["sliq_game_id"] = from_int(self.sliq_game_id)
        result["events"] = to_class(Events, self.events)
        result["ol_extremes"] = from_list(to_float, self.ol_extremes)
        result["roster_rb_count"] = from_int(self.roster_rb_count)
        result["roster_te_count"] = from_int(self.roster_te_count)
        result["roster_wr_count"] = from_int(self.roster_wr_count)
        result["backfield_buckets"] = from_list(from_int, self.backfield_buckets)
        result["n_linemen"] = from_int(self.n_linemen)
        result["te_pair"] = from_bool(self.te_pair)
        result["stacks"] = from_bool(self.stacks)
        result["bunch"] = from_bool(self.bunch)
        result["is_scoring"] = from_bool(self.is_scoring)
        result["te_trio"] = from_bool(self.te_trio)
        result["document_hash"] = from_str(self.document_hash)
        result["last_updt_ts"] = self.last_updt_ts.isoformat()
        return result


def game_from_dict(s: Any) -> Game:
    return Game.from_dict(s)


def game_to_dict(x: Game) -> Any:
    return to_class(Game, x)

// To parse this data:
//
//   import { Convert, Play } from "./file";
//
//   const play = Convert.toPlay(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Play {
    _id:                 string;
    game_id:             number;
    play_id:             number;
    pff_GAMEID:          number;
    pff_PLAYID:          number;
    play_number:         number;
    offense:             string;
    defense:             string;
    down:                number;
    yards_to_go:         number;
    yardline:            string;
    ball0:               number[];
    los_telemetry:       number;
    quarter:             number;
    game_clock:          string;
    hash:                string;
    special_teams:       boolean;
    play_clock:          number;
    play_type:           string;
    personnel:           string;
    formation_base:      string;
    formation_code:      string;
    receiver_buckets:    number[];
    is_penalty:          boolean;
    qb_pos:              string;
    schedule:            Schedule;
    situation:           Situation;
    presnap_o:           PresnapO;
    presnap_d:           PresnapD;
    play_d:              PlayD;
    play_o:              PlayO;
    stats:               Stats;
    result:              Result;
    pass_strength:       string;
    run_strength:        string;
    skill_r_qty:         number;
    skill_l_qty:         number;
    num_backfield:       number;
    num_tight:           number;
    num_slot:            number;
    num_wide:            number;
    condensed_formation: boolean;
    attached_formation:  boolean;
    formation:           Formation;
    o_paths:             OPath[];
    n_in_box:            number;
    d_paths:             DPath[];
    field_side:          string;
    boundary_side:       string;
    tracking:            boolean;
    overlay:             Overlay;
    sliq_id:             string;
    sliq_game_id:        number;
    events:              Events;
    ol_extremes:         number[];
    roster_rb_count:     number;
    roster_te_count:     number;
    roster_wr_count:     number;
    backfield_buckets:   number[];
    n_linemen:           number;
    te_pair:             boolean;
    stacks:              boolean;
    bunch:               boolean;
    is_scoring:          boolean;
    te_trio:             boolean;
    document_hash:       string;
}

export interface DPath {
    passes_homography_qc:     boolean;
    pff_player_id:            number;
    player:                   Player;
    rel0:                     number[];
    pff_rel0:                 number[];
    lua:                      string;
    abs_path:                 number[][];
    raw_path:                 number[][];
    rel_path:                 number[][];
    play_path:                number[][];
    n_frames_on_screen:       number;
    kalman_path:              number[][];
    kalman_path_w_motion:     number[][];
    kalman_speed:             number[];
    kalman_acceleration:      number[];
    kalman_direction:         number[];
    kalman_distance:          number[];
    deltad:                   number[];
    max_speed:                number;
    kalman_alignment:         KalmanAlignment;
    play_travelled:           number;
    dist_travelled:           number;
    max_accel:                MaxCel;
    max_decel:                MaxCel;
    hs_yards:                 number;
    speed_profile:            number[];
    max_speed_first_10yds:    number;
    max_speed_10yds_20yds?:   number;
    avg_speed_over_10yds:     number;
    avg_speed_over_20yds?:    number;
    pixel_path:               number[][];
    on_line:                  boolean;
    stance_3pt:               boolean;
    stance_2pt:               boolean;
    in_box:                   boolean;
    rating:                   string;
    pass_rusher:              boolean;
    in_press:                 boolean;
    custom:                   DPathCustom;
    matchup?:                 PurpleMatchup;
    doubleteamed_postsnap:    boolean;
    "1v1_postsnap":           boolean;
    matchup_postsnap?:        DPathMatchupPostsnap;
    move?:                    string;
    pass_rush:                boolean;
    unblocked:                boolean;
    pass_rush_win:            boolean;
    telemetry_position_group: string;
    telemetry_position:       string;
    matchups?:                MatchupElement[];
    "2pt_stance_detail"?:     string;
}

export interface DPathCustom {
    pff: PurplePff;
}

export interface PurplePff {
    pff_role:          PurplePffRole;
    pff_grade:         number;
    player_depth:      number;
    stance_type:       string;
    pff_press?:        string;
    pff_deftechnique?: number;
    box_player?:       boolean;
    pff_pressure?:     string;
    pff_hit?:          string;
    pff_hurry?:        string;
}

export enum PurplePffRole {
    Coverage = "Coverage",
    PassRush = "Pass Rush",
}

export interface KalmanAlignment {
    start: number;
    end:   number;
}

export interface PurpleMatchup {
    player:    Player;
    team:      string;
    rel0:      number[];
    skill_num: string;
    lua:       string;
}

export interface Player {
    _id?:       string;
    jersey:     number;
    pos_group:  PosGroup;
    position:   string;
    short_name: string;
    player_id?: string;
}

export enum PosGroup {
    DB = "DB",
    DL = "DL",
    LB = "LB",
    Ol = "OL",
    Qb = "QB",
    Rb = "RB",
    Te = "TE",
    Wr = "WR",
}

export interface DPathMatchupPostsnap {
    player:     Player;
    separation: number;
}

export interface MatchupElement {
    player:   Player;
    team?:    string;
    distance: number;
    lua:      string;
}

export interface MaxCel {
    frame: number;
    max:   number;
}

export interface Events {
    ball_snap:               number;
    pass_forward:            number;
    o_length:                number;
    d_length:                number;
    length:                  number;
    pass_arrived:            number;
    pass_outcome_incomplete: number;
}

export interface Formation {
    pass_strength:  string;
    run_strength:   string;
    formation_base: string;
}

export interface OPath {
    passes_homography_qc:     boolean;
    pff_player_id:            number;
    player:                   Player;
    rel0:                     number[];
    pff_rel0:                 number[];
    lua:                      string;
    abs_path:                 number[][];
    raw_path:                 number[][];
    rel_path:                 number[][];
    play_path:                number[][];
    n_frames_on_screen:       number;
    kalman_path:              number[][];
    kalman_path_w_motion:     number[][];
    kalman_speed:             number[];
    kalman_acceleration:      number[];
    kalman_direction:         number[];
    kalman_distance:          number[];
    deltad:                   number[];
    max_speed:                number;
    kalman_alignment:         KalmanAlignment;
    play_travelled:           number;
    dist_travelled:           number;
    max_accel:                MaxCel;
    max_decel:                MaxCel;
    hs_yards:                 number;
    speed_profile:            number[];
    max_speed_first_10yds?:   number;
    max_speed_10yds_20yds?:   number;
    avg_speed_over_10yds?:    number;
    avg_speed_over_20yds?:    number;
    distance_from_ball:       number;
    angle_from_ball:          number;
    emol_rel0_x?:             number;
    skill_num?:               string;
    los_on_off:               LosOnOff;
    pixel_path:               number[][];
    custom:                   OPathCustom;
    side?:                    string;
    skill_num_temp?:          number;
    rating:                   string;
    matchup?:                 OPathMatchup;
    tt_release?:              number;
    matchup_postsnap?:        OPathMatchupPostsnap;
    pff_simple_route?:        string;
    targeted:                 boolean;
    telemetry_position_group: string;
    telemetry_position:       string;
    combo_block_postsnap?:    boolean;
    "1v1_postsnap"?:          boolean;
}

export interface OPathCustom {
    pff: FluffyPff;
}

export interface FluffyPff {
    motion:          string;
    pff_grade:       number;
    pff_role:        FluffyPffRole;
    stance_type:     number;
    pff_route?:      string;
    pff_route_name?: string;
    route_depth?:    number;
    on_los?:         string;
    hit_allowed?:    string;
}

export enum FluffyPffRole {
    Pass = "Pass",
    PassBlock = "Pass Block",
    PassRoute = "Pass Route",
}

export enum LosOnOff {
    Off = "off",
    On = "on",
}

export interface OPathMatchup {
    player: Player;
    team:   string;
    rel0:   number[];
}

export interface OPathMatchupPostsnap {
    player: Player;
}

export interface Overlay {
    pixel_paths:       { [key: string]: number[][] };
    video_start_frame: number;
}

export interface PlayD {
    stunt:                         boolean;
    time_to_pressure:              number;
    num_dl_drop:                   number;
    blitzdog:                      boolean;
    pass_rush_result:              string;
    middle_of_field_abs_post_snap: string;
    middle_of_field_abs_at_snap:   string;
    num_rushers:                   number;
    blitzers:                      string[];
    d_blitzers:                    DBlitzer[];
    d_rushers:                     DBlitzer[];
    d_stunters:                    DBlitzer[];
    num_pass_coverage:             number;
    missed_tackles:                any[];
    num_deep_db:                   number;
    lb_covering_rb:                boolean;
    pressures:                     Pressures;
    max_penetration:               number;
    max_penetration_player:        string;
    secondary_rotation:            string;
    lb_depth:                      number;
    gaps_blitzed:                  string[];
    gaps_blitzed_count:            GapsBlitzedCount;
    num_swarm:                     number;
    rushers_left:                  string[];
    rushers_right:                 string[];
    num_rushers_db:                number;
    num_rushers_dl:                number;
    num_rushers_lb:                number;
    num_rushers_left:              number;
    num_rushers_right:             number;
    rushers:                       string[];
    force_defender_left:           string;
    force_defender_right:          string;
    stunt_location:                string;
    stunt_time_post_snap:          number;
    stunt_type:                    string;
    stunting_players:              string[];
    penetrator:                    string;
    looper:                        string;
    num_stunters:                  number;
    pass_rush_win:                 boolean;
}

export interface DBlitzer {
    jersey:     number;
    lua:        string;
    player_id:  string;
    pos_group:  PosGroup;
    position:   string;
    rel0:       number[];
    short_name: string;
    blitz_gap?: string;
    rush_gap?:  string;
    rush_type?: string;
    stunt_gap?: string;
}

export interface GapsBlitzedCount {
    LD: number;
    RB: number;
    RD: number;
    LB: number;
    LA: number;
    LC: number;
    RC: number;
    RA: number;
}

export interface Pressures {
    pressure_type_exotic:    boolean;
    pressure_type_general:   string;
    pressure_type_positions: any[];
}

export interface PlayO {
    c_pass_block_direction:     string;
    qb_drop_type:               string;
    catchable:                  boolean;
    deep_pass:                  boolean;
    draw:                       boolean;
    option:                     boolean;
    play_action:                boolean;
    screen:                     boolean;
    trick_play:                 boolean;
    check_route:                boolean;
    chip_route:                 boolean;
    pass_direction:             string;
    pass_width:                 number;
    pump_fake:                  boolean;
    qb_moved_off_spot:          boolean;
    qb_reset:                   boolean;
    run_pass_option:            boolean;
    num_pass_blockers:          number;
    rb_pass_pro_v_lb:           boolean;
    rb_pass_pro_v_db:           boolean;
    rb_backfield_route_v_man:   boolean;
    air_yardage:                number;
    pass_yardage_beyond_sticks: number;
    air_distance:               number;
    targeted_defensed_type:     string;
    pass_type:                  string;
    hit_allowed_by:             string[];
    hurry_allowed_by:           any[];
    pressure_allowed_by:        string[];
    sack_allowed_by:            any[];
    targeted_pff_simple_route:  string;
    player_pff_simple_routes:   string[];
    skill_pff_simple_routes:    string[];
    qb_drop_depth:              number;
    num_receivers:              number;
    pass_blockers:              string[];
    rb_pass_block_side:         any[];
    rb_pass_block_side_detail:  any[];
    thrown_under_pressure:      boolean;
    pass_block_win:             boolean;
}

export interface PresnapD {
    d_participation:         string[];
    d_participation_info:    Player[];
    num_def_in_box:          number;
    personnel_d_on_play:     string;
    db_cushion_avg:          number;
    db_soft_press:           number;
    db_off:                  number;
    db_shade_inside:         number;
    db_shade_inside_strong:  number;
    db_shade_outside:        number;
    db_shade_outside_strong: number;
    dl_on_play:              number;
    lb_on_play:              number;
    dbs_on_play:             number;
    db_on_play:              number;
    de_on_play:              number;
    cb_on_play:              number;
    dt_on_play:              number;
    fs_on_play:              number;
    ilb_on_play:             number;
    olb_on_play:             number;
    mlb_on_play:             number;
    nt_on_play:              number;
    s_on_play:               number;
    ss_on_play:              number;
    sum_dt_on_play:          number;
    sum_ilb_on_play:         number;
    sum_s_on_play:           number;
    def_front:               string;
    n_on_line:               number;
    n_3pt_stance:            number;
    n_2pt_stance:            number;
    def_in_2pt_stance:       string[];
    def_in_3pt_stance:       string[];
    db_press:                number;
    players_in_press:        string[];
    players_in_soft_press:   string[];
    players_in_off:          string[];
    defensive_look:          string;
    defensive_look_2:        string;
    box_players:             string[];
}

export interface PresnapO {
    personnel_o_on_play:           string;
    no_huddle:                     number;
    off_formation_unbalanced:      number;
    trick_look:                    number;
    bunch:                         boolean;
    stacks:                        boolean;
    shift_motion:                  boolean;
    qb_on_play:                    number;
    wr_on_play:                    number;
    te_on_play:                    number;
    fb_on_play:                    number;
    rb_on_play:                    number;
    ol_on_play:                    number;
    o_participation:               string[];
    players_against_press:         string[];
    players_against_soft_press:    string[];
    players_against_off:           string[];
    skill_positions:               string[];
    n_wider_paint:                 number;
    n_on_paint:                    number;
    n_inside_paint:                number;
    far_split_r:                   number;
    far_split_l:                   number;
    formation_width:               number;
    receiver_presnap_alignments:   { [key: string]: string[] };
    on_los_skill_pos_group:        PosGroup[];
    avg_ol_split:                  number;
    backfield_players:             any[];
    backfield_pos_group:           any[];
    num_off_los_te:                number;
    num_on_los_te:                 number;
    off_los_te:                    any[];
    on_los_te:                     any[];
    o_participation_info:          Player[];
    offensive_centroid_at_snap:    number[];
    off_attached_centroid_at_snap: number[];
    off_in_2pt_stance:             string[];
    off_in_3pt_stance:             string[];
    ol_width:                      number;
    unbalanced_line:               boolean;
    skill_players:                 string[];
    on_los_skill_players:          string[];
    extra_ol_players:              any[];
}

export interface Result {
    play_type:            string;
    play_type_intent:     string;
    play_success_outcome: boolean;
    gsis_meta:            GsisMeta;
}

export interface GsisMeta {
    scoring: boolean;
}

export interface Schedule {
    game_date:   string;
    game_key:    string;
    season:      number;
    week:        string;
    season_type: string;
    home:        string;
    visitor:     string;
}

export interface Situation {
    garbage_time:        number;
    two_minute:          number;
    score_differential:  number;
    time_remaining_qtr:  number;
    time_remaining_half: number;
    time_remaining_game: number;
    drive:               Drive;
}

export interface Drive {
    team_drive_number: number;
    off_play_in_drive: number;
    play_in_game:      number;
    score:             Score;
    start:             End;
    end:               End;
    plays:             PrevPlayElement[];
    prev_play:         PrevPlayElement;
    yards:             number;
    first_downs:       number;
    yards_penalized:   number;
}

export interface End {
    event:              string;
    telemetry_yardline: number;
}

export interface PrevPlayElement {
    play_in_drive: number;
    down:          number;
    play_id:       string;
    play_type:     string;
    result_yards:  number;
    ytg:           number;
    personnel_d:   string;
    personnel_o:   string;
    first_down:    number;
}

export interface Score {
    poss_score_diff: number;
    scoreboard:      Scoreboard;
}

export interface Scoreboard {
    alabama:     number;
    "kansas-st": number;
}

export interface Stats {
    summary: Summary;
}

export interface Summary {
    tfl:                     boolean;
    completion:              boolean;
    metrica:                 Metrica;
    target:                  Player;
    pressure:                MatchupElement[];
    protection:              TargetNearestDefenderArrived[];
    result_yds:              number;
    tackle_assist_by:        any[];
    pass_breakup_by:         Player;
    primary_coverage_by:     Player;
    target_pass_coverage_by: Player;
    passer:                  Player;
    timing:                  Timing;
    lop:                     number;
    third_conv:              string;
}

export interface Metrica {
    qb_launch_point:                      number[];
    target_at_pass:                       number[];
    target_at_arrived:                    number[];
    target_depth:                         number;
    target_at_arrived_abs:                number[];
    target_dist_from_boundary:            number;
    target_dist_from_cof:                 number;
    target_lua:                           string;
    target_separation_pass:               number;
    target_nearest_defender_pass:         TargetNearestDefenderArrived;
    target_next_nearest_defender_pass:    TargetNearestDefenderArrived;
    target_separation_arrived:            number;
    target_nearest_defender_arrived:      TargetNearestDefenderArrived;
    target_next_nearest_defender_arrived: TargetNearestDefenderArrived;
    target_ground_covered:                number;
    def_ground_covered:                   number;
    target_double_coverage:               boolean;
    target_skill:                         string;
}

export interface TargetNearestDefenderArrived {
    distance:             number;
    lua:                  string;
    player:               Player;
    positioning_field:    string;
    positioning_relative: string;
    rel_xy:               number[];
}

export interface Timing {
    ttp: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime

export class Convert {
    public static toPlay(json: string): Play {
        return cast(JSON.parse(json), r("Play"));
    }

    public static playToJson(value: Play): string {
        return JSON.stringify(uncast(value, r("Play")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Play": o([
        { json: "_id", js: "_id", typ: "" },
        { json: "game_id", js: "game_id", typ: 0 },
        { json: "play_id", js: "play_id", typ: 0 },
        { json: "pff_GAMEID", js: "pff_GAMEID", typ: 0 },
        { json: "pff_PLAYID", js: "pff_PLAYID", typ: 0 },
        { json: "play_number", js: "play_number", typ: 0 },
        { json: "offense", js: "offense", typ: "" },
        { json: "defense", js: "defense", typ: "" },
        { json: "down", js: "down", typ: 0 },
        { json: "yards_to_go", js: "yards_to_go", typ: 0 },
        { json: "yardline", js: "yardline", typ: "" },
        { json: "ball0", js: "ball0", typ: a(3.14) },
        { json: "los_telemetry", js: "los_telemetry", typ: 0 },
        { json: "quarter", js: "quarter", typ: 0 },
        { json: "game_clock", js: "game_clock", typ: "" },
        { json: "hash", js: "hash", typ: "" },
        { json: "special_teams", js: "special_teams", typ: true },
        { json: "play_clock", js: "play_clock", typ: 0 },
        { json: "play_type", js: "play_type", typ: "" },
        { json: "personnel", js: "personnel", typ: "" },
        { json: "formation_base", js: "formation_base", typ: "" },
        { json: "formation_code", js: "formation_code", typ: "" },
        { json: "receiver_buckets", js: "receiver_buckets", typ: a(0) },
        { json: "is_penalty", js: "is_penalty", typ: true },
        { json: "qb_pos", js: "qb_pos", typ: "" },
        { json: "schedule", js: "schedule", typ: r("Schedule") },
        { json: "situation", js: "situation", typ: r("Situation") },
        { json: "presnap_o", js: "presnap_o", typ: r("PresnapO") },
        { json: "presnap_d", js: "presnap_d", typ: r("PresnapD") },
        { json: "play_d", js: "play_d", typ: r("PlayD") },
        { json: "play_o", js: "play_o", typ: r("PlayO") },
        { json: "stats", js: "stats", typ: r("Stats") },
        { json: "result", js: "result", typ: r("Result") },
        { json: "pass_strength", js: "pass_strength", typ: "" },
        { json: "run_strength", js: "run_strength", typ: "" },
        { json: "skill_r_qty", js: "skill_r_qty", typ: 0 },
        { json: "skill_l_qty", js: "skill_l_qty", typ: 0 },
        { json: "num_backfield", js: "num_backfield", typ: 0 },
        { json: "num_tight", js: "num_tight", typ: 0 },
        { json: "num_slot", js: "num_slot", typ: 0 },
        { json: "num_wide", js: "num_wide", typ: 0 },
        { json: "condensed_formation", js: "condensed_formation", typ: true },
        { json: "attached_formation", js: "attached_formation", typ: true },
        { json: "formation", js: "formation", typ: r("Formation") },
        { json: "o_paths", js: "o_paths", typ: a(r("OPath")) },
        { json: "n_in_box", js: "n_in_box", typ: 0 },
        { json: "d_paths", js: "d_paths", typ: a(r("DPath")) },
        { json: "field_side", js: "field_side", typ: "" },
        { json: "boundary_side", js: "boundary_side", typ: "" },
        { json: "tracking", js: "tracking", typ: true },
        { json: "overlay", js: "overlay", typ: r("Overlay") },
        { json: "sliq_id", js: "sliq_id", typ: "" },
        { json: "sliq_game_id", js: "sliq_game_id", typ: 0 },
        { json: "events", js: "events", typ: r("Events") },
        { json: "ol_extremes", js: "ol_extremes", typ: a(3.14) },
        { json: "roster_rb_count", js: "roster_rb_count", typ: 0 },
        { json: "roster_te_count", js: "roster_te_count", typ: 0 },
        { json: "roster_wr_count", js: "roster_wr_count", typ: 0 },
        { json: "backfield_buckets", js: "backfield_buckets", typ: a(0) },
        { json: "n_linemen", js: "n_linemen", typ: 0 },
        { json: "te_pair", js: "te_pair", typ: true },
        { json: "stacks", js: "stacks", typ: true },
        { json: "bunch", js: "bunch", typ: true },
        { json: "is_scoring", js: "is_scoring", typ: true },
        { json: "te_trio", js: "te_trio", typ: true },
        { json: "document_hash", js: "document_hash", typ: "" },
    ], false),
    "DPath": o([
        { json: "passes_homography_qc", js: "passes_homography_qc", typ: true },
        { json: "pff_player_id", js: "pff_player_id", typ: 0 },
        { json: "player", js: "player", typ: r("Player") },
        { json: "rel0", js: "rel0", typ: a(3.14) },
        { json: "pff_rel0", js: "pff_rel0", typ: a(3.14) },
        { json: "lua", js: "lua", typ: "" },
        { json: "abs_path", js: "abs_path", typ: a(a(3.14)) },
        { json: "raw_path", js: "raw_path", typ: a(a(3.14)) },
        { json: "rel_path", js: "rel_path", typ: a(a(3.14)) },
        { json: "play_path", js: "play_path", typ: a(a(3.14)) },
        { json: "n_frames_on_screen", js: "n_frames_on_screen", typ: 0 },
        { json: "kalman_path", js: "kalman_path", typ: a(a(3.14)) },
        { json: "kalman_path_w_motion", js: "kalman_path_w_motion", typ: a(a(3.14)) },
        { json: "kalman_speed", js: "kalman_speed", typ: a(3.14) },
        { json: "kalman_acceleration", js: "kalman_acceleration", typ: a(3.14) },
        { json: "kalman_direction", js: "kalman_direction", typ: a(0) },
        { json: "kalman_distance", js: "kalman_distance", typ: a(3.14) },
        { json: "deltad", js: "deltad", typ: a(3.14) },
        { json: "max_speed", js: "max_speed", typ: 3.14 },
        { json: "kalman_alignment", js: "kalman_alignment", typ: r("KalmanAlignment") },
        { json: "play_travelled", js: "play_travelled", typ: 3.14 },
        { json: "dist_travelled", js: "dist_travelled", typ: 3.14 },
        { json: "max_accel", js: "max_accel", typ: r("MaxCel") },
        { json: "max_decel", js: "max_decel", typ: r("MaxCel") },
        { json: "hs_yards", js: "hs_yards", typ: 0 },
        { json: "speed_profile", js: "speed_profile", typ: a(3.14) },
        { json: "max_speed_first_10yds", js: "max_speed_first_10yds", typ: 3.14 },
        { json: "max_speed_10yds_20yds", js: "max_speed_10yds_20yds", typ: u(undefined, 3.14) },
        { json: "avg_speed_over_10yds", js: "avg_speed_over_10yds", typ: 3.14 },
        { json: "avg_speed_over_20yds", js: "avg_speed_over_20yds", typ: u(undefined, 3.14) },
        { json: "pixel_path", js: "pixel_path", typ: a(a(0)) },
        { json: "on_line", js: "on_line", typ: true },
        { json: "stance_3pt", js: "stance_3pt", typ: true },
        { json: "stance_2pt", js: "stance_2pt", typ: true },
        { json: "in_box", js: "in_box", typ: true },
        { json: "rating", js: "rating", typ: "" },
        { json: "pass_rusher", js: "pass_rusher", typ: true },
        { json: "in_press", js: "in_press", typ: true },
        { json: "custom", js: "custom", typ: r("DPathCustom") },
        { json: "matchup", js: "matchup", typ: u(undefined, r("PurpleMatchup")) },
        { json: "doubleteamed_postsnap", js: "doubleteamed_postsnap", typ: true },
        { json: "1v1_postsnap", js: "1v1_postsnap", typ: true },
        { json: "matchup_postsnap", js: "matchup_postsnap", typ: u(undefined, r("DPathMatchupPostsnap")) },
        { json: "move", js: "move", typ: u(undefined, "") },
        { json: "pass_rush", js: "pass_rush", typ: true },
        { json: "unblocked", js: "unblocked", typ: true },
        { json: "pass_rush_win", js: "pass_rush_win", typ: true },
        { json: "telemetry_position_group", js: "telemetry_position_group", typ: "" },
        { json: "telemetry_position", js: "telemetry_position", typ: "" },
        { json: "matchups", js: "matchups", typ: u(undefined, a(r("MatchupElement"))) },
        { json: "2pt_stance_detail", js: "2pt_stance_detail", typ: u(undefined, "") },
    ], false),
    "DPathCustom": o([
        { json: "pff", js: "pff", typ: r("PurplePff") },
    ], false),
    "PurplePff": o([
        { json: "pff_role", js: "pff_role", typ: r("PurplePffRole") },
        { json: "pff_grade", js: "pff_grade", typ: 3.14 },
        { json: "player_depth", js: "player_depth", typ: 0 },
        { json: "stance_type", js: "stance_type", typ: "" },
        { json: "pff_press", js: "pff_press", typ: u(undefined, "") },
        { json: "pff_deftechnique", js: "pff_deftechnique", typ: u(undefined, 0) },
        { json: "box_player", js: "box_player", typ: u(undefined, true) },
        { json: "pff_pressure", js: "pff_pressure", typ: u(undefined, "") },
        { json: "pff_hit", js: "pff_hit", typ: u(undefined, "") },
        { json: "pff_hurry", js: "pff_hurry", typ: u(undefined, "") },
    ], false),
    "KalmanAlignment": o([
        { json: "start", js: "start", typ: 0 },
        { json: "end", js: "end", typ: 0 },
    ], false),
    "PurpleMatchup": o([
        { json: "player", js: "player", typ: r("Player") },
        { json: "team", js: "team", typ: "" },
        { json: "rel0", js: "rel0", typ: a(3.14) },
        { json: "skill_num", js: "skill_num", typ: "" },
        { json: "lua", js: "lua", typ: "" },
    ], false),
    "Player": o([
        { json: "_id", js: "_id", typ: u(undefined, "") },
        { json: "jersey", js: "jersey", typ: 0 },
        { json: "pos_group", js: "pos_group", typ: r("PosGroup") },
        { json: "position", js: "position", typ: "" },
        { json: "short_name", js: "short_name", typ: "" },
        { json: "player_id", js: "player_id", typ: u(undefined, "") },
    ], false),
    "DPathMatchupPostsnap": o([
        { json: "player", js: "player", typ: r("Player") },
        { json: "separation", js: "separation", typ: 3.14 },
    ], false),
    "MatchupElement": o([
        { json: "player", js: "player", typ: r("Player") },
        { json: "team", js: "team", typ: u(undefined, "") },
        { json: "distance", js: "distance", typ: 3.14 },
        { json: "lua", js: "lua", typ: "" },
    ], false),
    "MaxCel": o([
        { json: "frame", js: "frame", typ: 0 },
        { json: "max", js: "max", typ: 3.14 },
    ], false),
    "Events": o([
        { json: "ball_snap", js: "ball_snap", typ: 0 },
        { json: "pass_forward", js: "pass_forward", typ: 0 },
        { json: "o_length", js: "o_length", typ: 0 },
        { json: "d_length", js: "d_length", typ: 0 },
        { json: "length", js: "length", typ: 0 },
        { json: "pass_arrived", js: "pass_arrived", typ: 0 },
        { json: "pass_outcome_incomplete", js: "pass_outcome_incomplete", typ: 0 },
    ], false),
    "Formation": o([
        { json: "pass_strength", js: "pass_strength", typ: "" },
        { json: "run_strength", js: "run_strength", typ: "" },
        { json: "formation_base", js: "formation_base", typ: "" },
    ], false),
    "OPath": o([
        { json: "passes_homography_qc", js: "passes_homography_qc", typ: true },
        { json: "pff_player_id", js: "pff_player_id", typ: 0 },
        { json: "player", js: "player", typ: r("Player") },
        { json: "rel0", js: "rel0", typ: a(3.14) },
        { json: "pff_rel0", js: "pff_rel0", typ: a(3.14) },
        { json: "lua", js: "lua", typ: "" },
        { json: "abs_path", js: "abs_path", typ: a(a(3.14)) },
        { json: "raw_path", js: "raw_path", typ: a(a(3.14)) },
        { json: "rel_path", js: "rel_path", typ: a(a(3.14)) },
        { json: "play_path", js: "play_path", typ: a(a(3.14)) },
        { json: "n_frames_on_screen", js: "n_frames_on_screen", typ: 0 },
        { json: "kalman_path", js: "kalman_path", typ: a(a(3.14)) },
        { json: "kalman_path_w_motion", js: "kalman_path_w_motion", typ: a(a(3.14)) },
        { json: "kalman_speed", js: "kalman_speed", typ: a(3.14) },
        { json: "kalman_acceleration", js: "kalman_acceleration", typ: a(3.14) },
        { json: "kalman_direction", js: "kalman_direction", typ: a(0) },
        { json: "kalman_distance", js: "kalman_distance", typ: a(3.14) },
        { json: "deltad", js: "deltad", typ: a(3.14) },
        { json: "max_speed", js: "max_speed", typ: 3.14 },
        { json: "kalman_alignment", js: "kalman_alignment", typ: r("KalmanAlignment") },
        { json: "play_travelled", js: "play_travelled", typ: 3.14 },
        { json: "dist_travelled", js: "dist_travelled", typ: 3.14 },
        { json: "max_accel", js: "max_accel", typ: r("MaxCel") },
        { json: "max_decel", js: "max_decel", typ: r("MaxCel") },
        { json: "hs_yards", js: "hs_yards", typ: 3.14 },
        { json: "speed_profile", js: "speed_profile", typ: a(3.14) },
        { json: "max_speed_first_10yds", js: "max_speed_first_10yds", typ: u(undefined, 3.14) },
        { json: "max_speed_10yds_20yds", js: "max_speed_10yds_20yds", typ: u(undefined, 3.14) },
        { json: "avg_speed_over_10yds", js: "avg_speed_over_10yds", typ: u(undefined, 3.14) },
        { json: "avg_speed_over_20yds", js: "avg_speed_over_20yds", typ: u(undefined, 3.14) },
        { json: "distance_from_ball", js: "distance_from_ball", typ: 3.14 },
        { json: "angle_from_ball", js: "angle_from_ball", typ: 3.14 },
        { json: "emol_rel0_x", js: "emol_rel0_x", typ: u(undefined, 3.14) },
        { json: "skill_num", js: "skill_num", typ: u(undefined, "") },
        { json: "los_on_off", js: "los_on_off", typ: r("LosOnOff") },
        { json: "pixel_path", js: "pixel_path", typ: a(a(0)) },
        { json: "custom", js: "custom", typ: r("OPathCustom") },
        { json: "side", js: "side", typ: u(undefined, "") },
        { json: "skill_num_temp", js: "skill_num_temp", typ: u(undefined, 0) },
        { json: "rating", js: "rating", typ: "" },
        { json: "matchup", js: "matchup", typ: u(undefined, r("OPathMatchup")) },
        { json: "tt_release", js: "tt_release", typ: u(undefined, 3.14) },
        { json: "matchup_postsnap", js: "matchup_postsnap", typ: u(undefined, r("OPathMatchupPostsnap")) },
        { json: "pff_simple_route", js: "pff_simple_route", typ: u(undefined, "") },
        { json: "targeted", js: "targeted", typ: true },
        { json: "telemetry_position_group", js: "telemetry_position_group", typ: "" },
        { json: "telemetry_position", js: "telemetry_position", typ: "" },
        { json: "combo_block_postsnap", js: "combo_block_postsnap", typ: u(undefined, true) },
        { json: "1v1_postsnap", js: "1v1_postsnap", typ: u(undefined, true) },
    ], false),
    "OPathCustom": o([
        { json: "pff", js: "pff", typ: r("FluffyPff") },
    ], false),
    "FluffyPff": o([
        { json: "motion", js: "motion", typ: "" },
        { json: "pff_grade", js: "pff_grade", typ: 0 },
        { json: "pff_role", js: "pff_role", typ: r("FluffyPffRole") },
        { json: "stance_type", js: "stance_type", typ: 0 },
        { json: "pff_route", js: "pff_route", typ: u(undefined, "") },
        { json: "pff_route_name", js: "pff_route_name", typ: u(undefined, "") },
        { json: "route_depth", js: "route_depth", typ: u(undefined, 0) },
        { json: "on_los", js: "on_los", typ: u(undefined, "") },
        { json: "hit_allowed", js: "hit_allowed", typ: u(undefined, "") },
    ], false),
    "OPathMatchup": o([
        { json: "player", js: "player", typ: r("Player") },
        { json: "team", js: "team", typ: "" },
        { json: "rel0", js: "rel0", typ: a(3.14) },
    ], false),
    "OPathMatchupPostsnap": o([
        { json: "player", js: "player", typ: r("Player") },
    ], false),
    "Overlay": o([
        { json: "pixel_paths", js: "pixel_paths", typ: m(a(a(0))) },
        { json: "video_start_frame", js: "video_start_frame", typ: 0 },
    ], false),
    "PlayD": o([
        { json: "stunt", js: "stunt", typ: true },
        { json: "time_to_pressure", js: "time_to_pressure", typ: 3.14 },
        { json: "num_dl_drop", js: "num_dl_drop", typ: 0 },
        { json: "blitzdog", js: "blitzdog", typ: true },
        { json: "pass_rush_result", js: "pass_rush_result", typ: "" },
        { json: "middle_of_field_abs_post_snap", js: "middle_of_field_abs_post_snap", typ: "" },
        { json: "middle_of_field_abs_at_snap", js: "middle_of_field_abs_at_snap", typ: "" },
        { json: "num_rushers", js: "num_rushers", typ: 0 },
        { json: "blitzers", js: "blitzers", typ: a("") },
        { json: "d_blitzers", js: "d_blitzers", typ: a(r("DBlitzer")) },
        { json: "d_rushers", js: "d_rushers", typ: a(r("DBlitzer")) },
        { json: "d_stunters", js: "d_stunters", typ: a(r("DBlitzer")) },
        { json: "num_pass_coverage", js: "num_pass_coverage", typ: 0 },
        { json: "missed_tackles", js: "missed_tackles", typ: a("any") },
        { json: "num_deep_db", js: "num_deep_db", typ: 0 },
        { json: "lb_covering_rb", js: "lb_covering_rb", typ: true },
        { json: "pressures", js: "pressures", typ: r("Pressures") },
        { json: "max_penetration", js: "max_penetration", typ: 3.14 },
        { json: "max_penetration_player", js: "max_penetration_player", typ: "" },
        { json: "secondary_rotation", js: "secondary_rotation", typ: "" },
        { json: "lb_depth", js: "lb_depth", typ: 3.14 },
        { json: "gaps_blitzed", js: "gaps_blitzed", typ: a("") },
        { json: "gaps_blitzed_count", js: "gaps_blitzed_count", typ: r("GapsBlitzedCount") },
        { json: "num_swarm", js: "num_swarm", typ: 0 },
        { json: "rushers_left", js: "rushers_left", typ: a("") },
        { json: "rushers_right", js: "rushers_right", typ: a("") },
        { json: "num_rushers_db", js: "num_rushers_db", typ: 0 },
        { json: "num_rushers_dl", js: "num_rushers_dl", typ: 0 },
        { json: "num_rushers_lb", js: "num_rushers_lb", typ: 0 },
        { json: "num_rushers_left", js: "num_rushers_left", typ: 0 },
        { json: "num_rushers_right", js: "num_rushers_right", typ: 0 },
        { json: "rushers", js: "rushers", typ: a("") },
        { json: "force_defender_left", js: "force_defender_left", typ: "" },
        { json: "force_defender_right", js: "force_defender_right", typ: "" },
        { json: "stunt_location", js: "stunt_location", typ: "" },
        { json: "stunt_time_post_snap", js: "stunt_time_post_snap", typ: 3.14 },
        { json: "stunt_type", js: "stunt_type", typ: "" },
        { json: "stunting_players", js: "stunting_players", typ: a("") },
        { json: "penetrator", js: "penetrator", typ: "" },
        { json: "looper", js: "looper", typ: "" },
        { json: "num_stunters", js: "num_stunters", typ: 0 },
        { json: "pass_rush_win", js: "pass_rush_win", typ: true },
    ], false),
    "DBlitzer": o([
        { json: "jersey", js: "jersey", typ: 0 },
        { json: "lua", js: "lua", typ: "" },
        { json: "player_id", js: "player_id", typ: "" },
        { json: "pos_group", js: "pos_group", typ: r("PosGroup") },
        { json: "position", js: "position", typ: "" },
        { json: "rel0", js: "rel0", typ: a(3.14) },
        { json: "short_name", js: "short_name", typ: "" },
        { json: "blitz_gap", js: "blitz_gap", typ: u(undefined, "") },
        { json: "rush_gap", js: "rush_gap", typ: u(undefined, "") },
        { json: "rush_type", js: "rush_type", typ: u(undefined, "") },
        { json: "stunt_gap", js: "stunt_gap", typ: u(undefined, "") },
    ], false),
    "GapsBlitzedCount": o([
        { json: "LD", js: "LD", typ: 0 },
        { json: "RB", js: "RB", typ: 0 },
        { json: "RD", js: "RD", typ: 0 },
        { json: "LB", js: "LB", typ: 0 },
        { json: "LA", js: "LA", typ: 0 },
        { json: "LC", js: "LC", typ: 0 },
        { json: "RC", js: "RC", typ: 0 },
        { json: "RA", js: "RA", typ: 0 },
    ], false),
    "Pressures": o([
        { json: "pressure_type_exotic", js: "pressure_type_exotic", typ: true },
        { json: "pressure_type_general", js: "pressure_type_general", typ: "" },
        { json: "pressure_type_positions", js: "pressure_type_positions", typ: a("any") },
    ], false),
    "PlayO": o([
        { json: "c_pass_block_direction", js: "c_pass_block_direction", typ: "" },
        { json: "qb_drop_type", js: "qb_drop_type", typ: "" },
        { json: "catchable", js: "catchable", typ: true },
        { json: "deep_pass", js: "deep_pass", typ: true },
        { json: "draw", js: "draw", typ: true },
        { json: "option", js: "option", typ: true },
        { json: "play_action", js: "play_action", typ: true },
        { json: "screen", js: "screen", typ: true },
        { json: "trick_play", js: "trick_play", typ: true },
        { json: "check_route", js: "check_route", typ: true },
        { json: "chip_route", js: "chip_route", typ: true },
        { json: "pass_direction", js: "pass_direction", typ: "" },
        { json: "pass_width", js: "pass_width", typ: 0 },
        { json: "pump_fake", js: "pump_fake", typ: true },
        { json: "qb_moved_off_spot", js: "qb_moved_off_spot", typ: true },
        { json: "qb_reset", js: "qb_reset", typ: true },
        { json: "run_pass_option", js: "run_pass_option", typ: true },
        { json: "num_pass_blockers", js: "num_pass_blockers", typ: 0 },
        { json: "rb_pass_pro_v_lb", js: "rb_pass_pro_v_lb", typ: true },
        { json: "rb_pass_pro_v_db", js: "rb_pass_pro_v_db", typ: true },
        { json: "rb_backfield_route_v_man", js: "rb_backfield_route_v_man", typ: true },
        { json: "air_yardage", js: "air_yardage", typ: 0 },
        { json: "pass_yardage_beyond_sticks", js: "pass_yardage_beyond_sticks", typ: 0 },
        { json: "air_distance", js: "air_distance", typ: 3.14 },
        { json: "targeted_defensed_type", js: "targeted_defensed_type", typ: "" },
        { json: "pass_type", js: "pass_type", typ: "" },
        { json: "hit_allowed_by", js: "hit_allowed_by", typ: a("") },
        { json: "hurry_allowed_by", js: "hurry_allowed_by", typ: a("any") },
        { json: "pressure_allowed_by", js: "pressure_allowed_by", typ: a("") },
        { json: "sack_allowed_by", js: "sack_allowed_by", typ: a("any") },
        { json: "targeted_pff_simple_route", js: "targeted_pff_simple_route", typ: "" },
        { json: "player_pff_simple_routes", js: "player_pff_simple_routes", typ: a("") },
        { json: "skill_pff_simple_routes", js: "skill_pff_simple_routes", typ: a("") },
        { json: "qb_drop_depth", js: "qb_drop_depth", typ: 3.14 },
        { json: "num_receivers", js: "num_receivers", typ: 0 },
        { json: "pass_blockers", js: "pass_blockers", typ: a("") },
        { json: "rb_pass_block_side", js: "rb_pass_block_side", typ: a("any") },
        { json: "rb_pass_block_side_detail", js: "rb_pass_block_side_detail", typ: a("any") },
        { json: "thrown_under_pressure", js: "thrown_under_pressure", typ: true },
        { json: "pass_block_win", js: "pass_block_win", typ: true },
    ], false),
    "PresnapD": o([
        { json: "d_participation", js: "d_participation", typ: a("") },
        { json: "d_participation_info", js: "d_participation_info", typ: a(r("Player")) },
        { json: "num_def_in_box", js: "num_def_in_box", typ: 0 },
        { json: "personnel_d_on_play", js: "personnel_d_on_play", typ: "" },
        { json: "db_cushion_avg", js: "db_cushion_avg", typ: 3.14 },
        { json: "db_soft_press", js: "db_soft_press", typ: 0 },
        { json: "db_off", js: "db_off", typ: 0 },
        { json: "db_shade_inside", js: "db_shade_inside", typ: 0 },
        { json: "db_shade_inside_strong", js: "db_shade_inside_strong", typ: 0 },
        { json: "db_shade_outside", js: "db_shade_outside", typ: 0 },
        { json: "db_shade_outside_strong", js: "db_shade_outside_strong", typ: 0 },
        { json: "dl_on_play", js: "dl_on_play", typ: 0 },
        { json: "lb_on_play", js: "lb_on_play", typ: 0 },
        { json: "dbs_on_play", js: "dbs_on_play", typ: 0 },
        { json: "db_on_play", js: "db_on_play", typ: 0 },
        { json: "de_on_play", js: "de_on_play", typ: 0 },
        { json: "cb_on_play", js: "cb_on_play", typ: 0 },
        { json: "dt_on_play", js: "dt_on_play", typ: 0 },
        { json: "fs_on_play", js: "fs_on_play", typ: 0 },
        { json: "ilb_on_play", js: "ilb_on_play", typ: 0 },
        { json: "olb_on_play", js: "olb_on_play", typ: 0 },
        { json: "mlb_on_play", js: "mlb_on_play", typ: 0 },
        { json: "nt_on_play", js: "nt_on_play", typ: 0 },
        { json: "s_on_play", js: "s_on_play", typ: 0 },
        { json: "ss_on_play", js: "ss_on_play", typ: 0 },
        { json: "sum_dt_on_play", js: "sum_dt_on_play", typ: 0 },
        { json: "sum_ilb_on_play", js: "sum_ilb_on_play", typ: 0 },
        { json: "sum_s_on_play", js: "sum_s_on_play", typ: 0 },
        { json: "def_front", js: "def_front", typ: "" },
        { json: "n_on_line", js: "n_on_line", typ: 0 },
        { json: "n_3pt_stance", js: "n_3pt_stance", typ: 0 },
        { json: "n_2pt_stance", js: "n_2pt_stance", typ: 0 },
        { json: "def_in_2pt_stance", js: "def_in_2pt_stance", typ: a("") },
        { json: "def_in_3pt_stance", js: "def_in_3pt_stance", typ: a("") },
        { json: "db_press", js: "db_press", typ: 0 },
        { json: "players_in_press", js: "players_in_press", typ: a("") },
        { json: "players_in_soft_press", js: "players_in_soft_press", typ: a("") },
        { json: "players_in_off", js: "players_in_off", typ: a("") },
        { json: "defensive_look", js: "defensive_look", typ: "" },
        { json: "defensive_look_2", js: "defensive_look_2", typ: "" },
        { json: "box_players", js: "box_players", typ: a("") },
    ], false),
    "PresnapO": o([
        { json: "personnel_o_on_play", js: "personnel_o_on_play", typ: "" },
        { json: "no_huddle", js: "no_huddle", typ: 0 },
        { json: "off_formation_unbalanced", js: "off_formation_unbalanced", typ: 0 },
        { json: "trick_look", js: "trick_look", typ: 0 },
        { json: "bunch", js: "bunch", typ: true },
        { json: "stacks", js: "stacks", typ: true },
        { json: "shift_motion", js: "shift_motion", typ: true },
        { json: "qb_on_play", js: "qb_on_play", typ: 0 },
        { json: "wr_on_play", js: "wr_on_play", typ: 0 },
        { json: "te_on_play", js: "te_on_play", typ: 0 },
        { json: "fb_on_play", js: "fb_on_play", typ: 0 },
        { json: "rb_on_play", js: "rb_on_play", typ: 0 },
        { json: "ol_on_play", js: "ol_on_play", typ: 0 },
        { json: "o_participation", js: "o_participation", typ: a("") },
        { json: "players_against_press", js: "players_against_press", typ: a("") },
        { json: "players_against_soft_press", js: "players_against_soft_press", typ: a("") },
        { json: "players_against_off", js: "players_against_off", typ: a("") },
        { json: "skill_positions", js: "skill_positions", typ: a("") },
        { json: "n_wider_paint", js: "n_wider_paint", typ: 0 },
        { json: "n_on_paint", js: "n_on_paint", typ: 0 },
        { json: "n_inside_paint", js: "n_inside_paint", typ: 0 },
        { json: "far_split_r", js: "far_split_r", typ: 3.14 },
        { json: "far_split_l", js: "far_split_l", typ: 3.14 },
        { json: "formation_width", js: "formation_width", typ: 3.14 },
        { json: "receiver_presnap_alignments", js: "receiver_presnap_alignments", typ: m(a("")) },
        { json: "on_los_skill_pos_group", js: "on_los_skill_pos_group", typ: a(r("PosGroup")) },
        { json: "avg_ol_split", js: "avg_ol_split", typ: 3.14 },
        { json: "backfield_players", js: "backfield_players", typ: a("any") },
        { json: "backfield_pos_group", js: "backfield_pos_group", typ: a("any") },
        { json: "num_off_los_te", js: "num_off_los_te", typ: 0 },
        { json: "num_on_los_te", js: "num_on_los_te", typ: 0 },
        { json: "off_los_te", js: "off_los_te", typ: a("any") },
        { json: "on_los_te", js: "on_los_te", typ: a("any") },
        { json: "o_participation_info", js: "o_participation_info", typ: a(r("Player")) },
        { json: "offensive_centroid_at_snap", js: "offensive_centroid_at_snap", typ: a(3.14) },
        { json: "off_attached_centroid_at_snap", js: "off_attached_centroid_at_snap", typ: a(3.14) },
        { json: "off_in_2pt_stance", js: "off_in_2pt_stance", typ: a("") },
        { json: "off_in_3pt_stance", js: "off_in_3pt_stance", typ: a("") },
        { json: "ol_width", js: "ol_width", typ: 3.14 },
        { json: "unbalanced_line", js: "unbalanced_line", typ: true },
        { json: "skill_players", js: "skill_players", typ: a("") },
        { json: "on_los_skill_players", js: "on_los_skill_players", typ: a("") },
        { json: "extra_ol_players", js: "extra_ol_players", typ: a("any") },
    ], false),
    "Result": o([
        { json: "play_type", js: "play_type", typ: "" },
        { json: "play_type_intent", js: "play_type_intent", typ: "" },
        { json: "play_success_outcome", js: "play_success_outcome", typ: true },
        { json: "gsis_meta", js: "gsis_meta", typ: r("GsisMeta") },
    ], false),
    "GsisMeta": o([
        { json: "scoring", js: "scoring", typ: true },
    ], false),
    "Schedule": o([
        { json: "game_date", js: "game_date", typ: "" },
        { json: "game_key", js: "game_key", typ: "" },
        { json: "season", js: "season", typ: 0 },
        { json: "week", js: "week", typ: "" },
        { json: "season_type", js: "season_type", typ: "" },
        { json: "home", js: "home", typ: "" },
        { json: "visitor", js: "visitor", typ: "" },
    ], false),
    "Situation": o([
        { json: "garbage_time", js: "garbage_time", typ: 0 },
        { json: "two_minute", js: "two_minute", typ: 0 },
        { json: "score_differential", js: "score_differential", typ: 0 },
        { json: "time_remaining_qtr", js: "time_remaining_qtr", typ: 3.14 },
        { json: "time_remaining_half", js: "time_remaining_half", typ: 3.14 },
        { json: "time_remaining_game", js: "time_remaining_game", typ: 3.14 },
        { json: "drive", js: "drive", typ: r("Drive") },
    ], false),
    "Drive": o([
        { json: "team_drive_number", js: "team_drive_number", typ: 0 },
        { json: "off_play_in_drive", js: "off_play_in_drive", typ: 0 },
        { json: "play_in_game", js: "play_in_game", typ: 0 },
        { json: "score", js: "score", typ: r("Score") },
        { json: "start", js: "start", typ: r("End") },
        { json: "end", js: "end", typ: r("End") },
        { json: "plays", js: "plays", typ: a(r("PrevPlayElement")) },
        { json: "prev_play", js: "prev_play", typ: r("PrevPlayElement") },
        { json: "yards", js: "yards", typ: 0 },
        { json: "first_downs", js: "first_downs", typ: 0 },
        { json: "yards_penalized", js: "yards_penalized", typ: 0 },
    ], false),
    "End": o([
        { json: "event", js: "event", typ: "" },
        { json: "telemetry_yardline", js: "telemetry_yardline", typ: 0 },
    ], false),
    "PrevPlayElement": o([
        { json: "play_in_drive", js: "play_in_drive", typ: 0 },
        { json: "down", js: "down", typ: 0 },
        { json: "play_id", js: "play_id", typ: "" },
        { json: "play_type", js: "play_type", typ: "" },
        { json: "result_yards", js: "result_yards", typ: 0 },
        { json: "ytg", js: "ytg", typ: 0 },
        { json: "personnel_d", js: "personnel_d", typ: "" },
        { json: "personnel_o", js: "personnel_o", typ: "" },
        { json: "first_down", js: "first_down", typ: 0 },
    ], false),
    "Score": o([
        { json: "poss_score_diff", js: "poss_score_diff", typ: 0 },
        { json: "scoreboard", js: "scoreboard", typ: r("Scoreboard") },
    ], false),
    "Scoreboard": o([
        { json: "alabama", js: "alabama", typ: 0 },
        { json: "kansas-st", js: "kansas-st", typ: 0 },
    ], false),
    "Stats": o([
        { json: "summary", js: "summary", typ: r("Summary") },
    ], false),
    "Summary": o([
        { json: "tfl", js: "tfl", typ: true },
        { json: "completion", js: "completion", typ: true },
        { json: "metrica", js: "metrica", typ: r("Metrica") },
        { json: "target", js: "target", typ: r("Player") },
        { json: "pressure", js: "pressure", typ: a(r("MatchupElement")) },
        { json: "protection", js: "protection", typ: a(r("TargetNearestDefenderArrived")) },
        { json: "result_yds", js: "result_yds", typ: 0 },
        { json: "tackle_assist_by", js: "tackle_assist_by", typ: a("any") },
        { json: "pass_breakup_by", js: "pass_breakup_by", typ: r("Player") },
        { json: "primary_coverage_by", js: "primary_coverage_by", typ: r("Player") },
        { json: "target_pass_coverage_by", js: "target_pass_coverage_by", typ: r("Player") },
        { json: "passer", js: "passer", typ: r("Player") },
        { json: "timing", js: "timing", typ: r("Timing") },
        { json: "lop", js: "lop", typ: 0 },
        { json: "third_conv", js: "third_conv", typ: "" },
    ], false),
    "Metrica": o([
        { json: "qb_launch_point", js: "qb_launch_point", typ: a(3.14) },
        { json: "target_at_pass", js: "target_at_pass", typ: a(3.14) },
        { json: "target_at_arrived", js: "target_at_arrived", typ: a(3.14) },
        { json: "target_depth", js: "target_depth", typ: 3.14 },
        { json: "target_at_arrived_abs", js: "target_at_arrived_abs", typ: a(3.14) },
        { json: "target_dist_from_boundary", js: "target_dist_from_boundary", typ: 3.14 },
        { json: "target_dist_from_cof", js: "target_dist_from_cof", typ: 3.14 },
        { json: "target_lua", js: "target_lua", typ: "" },
        { json: "target_separation_pass", js: "target_separation_pass", typ: 3.14 },
        { json: "target_nearest_defender_pass", js: "target_nearest_defender_pass", typ: r("TargetNearestDefenderArrived") },
        { json: "target_next_nearest_defender_pass", js: "target_next_nearest_defender_pass", typ: r("TargetNearestDefenderArrived") },
        { json: "target_separation_arrived", js: "target_separation_arrived", typ: 3.14 },
        { json: "target_nearest_defender_arrived", js: "target_nearest_defender_arrived", typ: r("TargetNearestDefenderArrived") },
        { json: "target_next_nearest_defender_arrived", js: "target_next_nearest_defender_arrived", typ: r("TargetNearestDefenderArrived") },
        { json: "target_ground_covered", js: "target_ground_covered", typ: 3.14 },
        { json: "def_ground_covered", js: "def_ground_covered", typ: 3.14 },
        { json: "target_double_coverage", js: "target_double_coverage", typ: true },
        { json: "target_skill", js: "target_skill", typ: "" },
    ], false),
    "TargetNearestDefenderArrived": o([
        { json: "distance", js: "distance", typ: 3.14 },
        { json: "lua", js: "lua", typ: "" },
        { json: "player", js: "player", typ: r("Player") },
        { json: "positioning_field", js: "positioning_field", typ: "" },
        { json: "positioning_relative", js: "positioning_relative", typ: "" },
        { json: "rel_xy", js: "rel_xy", typ: a(3.14) },
    ], false),
    "Timing": o([
        { json: "ttp", js: "ttp", typ: 3.14 },
    ], false),
    "PurplePffRole": [
        "Coverage",
        "Pass Rush",
    ],
    "PosGroup": [
        "DB",
        "DL",
        "LB",
        "OL",
        "QB",
        "RB",
        "TE",
        "WR",
    ],
    "FluffyPffRole": [
        "Pass",
        "Pass Block",
        "Pass Route",
    ],
    "LosOnOff": [
        "off",
        "on",
    ],
};

// To parse this data:
//
//   import { Convert } from "./file";
//
//   const season = Convert.toSeason(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Season {
    team:     string;
    season:   number;
    games:    Game[];
    bye_week: number[];
    details?: TeamDetails;
}

export interface Game {
    week:                 number;
    game_key:             number;
    game_id:              number;
    game_date:            string;
    game_time:            GameTime;
    visitor_team:         string;
    visitor_score:        null;
    home_team:            string;
    home_score:           null;
    is_home:              boolean;
    result:               null;
    home_team_details:    TeamDetails;
    visitor_team_details: TeamDetails;
}

export enum GameTime {
    The0000 = "00:00",
    The0100 = "01:00",
    The0115 = "01:15",
    The0200 = "02:00",
    The1500 = "15:00",
    The1600 = "16:00",
    The1630 = "16:30",
    The1700 = "17:00",
    The1730 = "17:30",
    The1800 = "18:00",
    The1830 = "18:30",
    The1900 = "19:00",
    The1930 = "19:30",
    The2000 = "20:00",
    The2030 = "20:30",
    The2100 = "21:00",
    The2130 = "21:30",
    The2200 = "22:00",
    The2230 = "22:30",
    The2300 = "23:00",
    The2330 = "23:30",
}

export interface TeamDetails {
    _id:                  string;
    abbreviation:         string;
    city:                 string;
    color_metadata:       ColorMetadata;
    display_abbreviation: null | string;
    end_season:           number;
    franchise_id:         number;
    groups:               GroupElement[];
    gsis_abbreviation:    string;
    id:                   null;
    league:               League;
    league_id:            number;
    mid_abbreviation:     null | string;
    nickname:             string;
    pff_twitter_handle:   null;
    primary_color:        string;
    secondary_color:      string;
    slug:                 string;
    sportradar_id:        null;
    start_season:         number;
    tertiary_color:       TertiaryColor | null;
    tv_abbreviation:      null | string;
    twitter_handle:       null;
    updated_at:           Date;
    team_id:              string;
    csv_conference:       CSVConference | null;
    csv_conference_logo:  null | string;
    csv_team:             null | string;
    csv_team_logo:        null | string;
    csv_team_id:          number | null;
    csv_tk:               null | string;
    csv_ncaaID:           number | null;
    csv_color:            null | string;
    csv_shortname:        null | string;
    csv_seoName:          null | string;
    csv_sixCharAbbr:      null | string;
    fbs:                  boolean;
    fcs:                  boolean;
    group:                GroupEnum | null;
    power_five:           boolean;
    group_of_five:        boolean;
    independent:          boolean;
    conference:           Conference | null;
    division:             Conference | null;
    conferenceAbbr:       ConferenceAbbr | null;
    level:                ConferenceAbbr | null;
    nick:                 string;
    teamId:               string;
    teamType:             TeamType;
    abbr:                 null | string;
    cityState:            string;
    fullName:             string;
    source:               Source;
    season:               number;
    last_updt_ts:         Date;
}

export interface ColorMetadata {
    background_color_ref: string;
    dark_color_ref:       string;
    foreground_color:     ForegroundColor | null;
    helmet_color_ref:     string;
    jersey_color_ref:     string;
    light_color_ref:      string;
    primary_color:        string;
    secondary_color:      string;
    tertiary_color:       TertiaryColor | null;
}

export enum ForegroundColor {
    B60202 = "#b60202",
    Bb0202 = "#bb0202",
    F0693D = "#f0693d",
    Ffffff = "#ffffff",
    The000000 = "#000000",
    The00661A = "#00661a",
    The740101 = "#740101",
}

export enum TertiaryColor {
    A1A1A4 = "#a1a1a4",
    A3Aaae = "#a3aaae",
    Adafaa = "#adafaa",
    B0B3B2 = "#b0b3b2",
    C1C6C8 = "#c1c6c8",
    C5B783 = "#c5b783",
    C8102E = "#c8102e",
    Cccccc = "#cccccc",
    Efefef = "#efefef",
    F7F7F7 = "#f7f7f7",
    Faf9F9 = "#faf9f9",
    Fafafa = "#fafafa",
    Ff6418 = "#ff6418",
    Ffc82D = "#ffc82d",
    Ffffff = "#ffffff",
    The000000 = "#000000",
    The00263A = "#00263a",
    The00263E = "#00263e",
    The006Ba6 = "#006ba6",
    The007934 = "#007934",
    The0A863D = "#0a863d",
    The3E3D3C = "#3e3d3c",
    The4D4F53 = "#4d4f53",
    The565A5C = "#565a5c",
    The5F5F60 = "#5f5f60",
    The60697A = "#60697a",
    The808080 = "#808080",
    The808285 = "#808285",
    The828282 = "#828282",
    The8A8D8F = "#8a8d8f",
    The999999 = "#999999",
}

export interface Conference {
    fullName:  ConferenceAbbr;
    id:        ID;
    id_number: number;
}

export enum ConferenceAbbr {
    Acc = "ACC",
    Big12 = "Big 12",
    BigSky = "Big Sky",
    BigSouthOVCFootballAssociation = "Big South - OVC Football Association",
    BigTen = "Big Ten",
    CUsa = "C-USA",
    Caa = "CAA",
    FCS = "FCS",
    Fbs = "FBS",
    GroupOfFive = "Group of Five",
    IndFCS = "IND (FCS)",
    IndFbs = "IND (FBS)",
    Ivy = "Ivy",
    MAC = "MAC",
    MWC = "MWC",
    Meac = "MEAC",
    MissouriValley = "Missouri Valley",
    NcaaD2 = "NCAA D2",
    NcaaD3 = "NCAA D3",
    Northeast = "Northeast",
    Pac12 = "Pac-12",
    Patriot = "Patriot",
    Pioneer = "Pioneer",
    PowerFive = "Power Five",
    SEC = "SEC",
    SWACEast = "SWAC East",
    SWACWest = "SWAC West",
    Southern = "Southern",
    Southland = "Southland",
    SunBelt = "Sun Belt",
    SunBeltEast = "Sun Belt East",
    SunBeltWest = "Sun Belt West",
    Swac = "SWAC",
    TheAmerican = "The American",
    UnitedAthletic = "United Athletic",
}

export enum ID {
    Acc = "acc",
    Big12 = "big-12",
    BigSky = "big-sky",
    BigSouthOvc = "big-south-ovc",
    BigTen = "big-ten",
    CUsa = "c-usa",
    Caa = "caa",
    FCS = "fcs",
    Fbs = "fbs",
    GroupOfFive = "group-of-five",
    IndFCS = "ind-fcs",
    IndFbs = "ind-fbs",
    IvyFCS = "ivy-fcs",
    MAC = "mac",
    MWC = "mwc",
    Meac = "meac",
    MissouriValley = "missouri-valley",
    NcaaD2 = "ncaa-d2",
    NcaaD3 = "ncaa-d3",
    Northeast = "northeast",
    Pac12 = "pac-12",
    Patriot = "patriot",
    Pioneer = "pioneer",
    PowerFive = "power-five",
    SEC = "sec",
    Southern = "southern",
    Southland = "southland",
    SunBelt = "sun-belt",
    SunBeltEast = "sun-belt-east",
    SunBeltWest = "sun-belt-west",
    Swac = "swac",
    SwacEast = "swac-east",
    SwacWest = "swac-west",
    TheAmerican = "the-american",
    UnitedAthletic = "united-athletic",
}

export enum CSVConference {
    AmericanAthleticConference = "American Athletic Conference",
    AtlanticCoast = "Atlantic Coast",
    Big12 = "Big 12",
    BigTen = "Big Ten",
    ConferenceUSA = "Conference USA",
    IndependentsFBS = "Independents(FBS)",
    MidAmerican = "Mid-American",
    MountainWest = "Mountain West",
    Pac12 = "Pac-12",
    Southeastern = "Southeastern",
    SunBelt = "Sun Belt",
}

export enum GroupEnum {
    GroupOfFive = "Group of Five",
    Independent = "Independent",
    PowerFive = "Power Five",
}

export interface GroupElement {
    end_season:    number;
    heirarchy:     number[];
    hierarchy:     number[];
    id:            number;
    league_id:     number;
    name:          ConferenceAbbr;
    parent_id:     number | null;
    slug:          ID;
    start_season:  number;
    type:          Type;
    league:        League;
    display_order: number;
}

export enum League {
    Ncaa = "NCAA",
}

export enum Type {
    Conf = "CONF",
    Div = "DIV",
    Other = "OTHER",
}

export enum Source {
    Pff = "PFF",
}

export enum TeamType {
    Team = "TEAM",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toSeason(json: string): Season[] {
        return cast(JSON.parse(json), a(r("Season")));
    }

    public static seasonToJson(value: Season[]): string {
        return JSON.stringify(uncast(value, a(r("Season"))), null, 2);
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

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Season": o([
        { json: "team", js: "team", typ: "" },
        { json: "season", js: "season", typ: 0 },
        { json: "games", js: "games", typ: a(r("Game")) },
        { json: "bye_week", js: "bye_week", typ: a(0) },
    ], false),
    "Game": o([
        { json: "week", js: "week", typ: 0 },
        { json: "game_key", js: "game_key", typ: 0 },
        { json: "game_id", js: "game_id", typ: 0 },
        { json: "game_date", js: "game_date", typ: "" },
        { json: "game_time", js: "game_time", typ: r("GameTime") },
        { json: "visitor_team", js: "visitor_team", typ: "" },
        { json: "visitor_score", js: "visitor_score", typ: null },
        { json: "home_team", js: "home_team", typ: "" },
        { json: "home_score", js: "home_score", typ: null },
        { json: "is_home", js: "is_home", typ: true },
        { json: "result", js: "result", typ: null },
        { json: "home_team_details", js: "home_team_details", typ: r("TeamDetails") },
        { json: "visitor_team_details", js: "visitor_team_details", typ: r("TeamDetails") },
    ], false),
    "TeamDetails": o([
        { json: "_id", js: "_id", typ: "" },
        { json: "abbreviation", js: "abbreviation", typ: "" },
        { json: "city", js: "city", typ: "" },
        { json: "color_metadata", js: "color_metadata", typ: r("ColorMetadata") },
        { json: "display_abbreviation", js: "display_abbreviation", typ: u(null, "") },
        { json: "end_season", js: "end_season", typ: 0 },
        { json: "franchise_id", js: "franchise_id", typ: 0 },
        { json: "groups", js: "groups", typ: a(r("GroupElement")) },
        { json: "gsis_abbreviation", js: "gsis_abbreviation", typ: "" },
        { json: "id", js: "id", typ: null },
        { json: "league", js: "league", typ: r("League") },
        { json: "league_id", js: "league_id", typ: 0 },
        { json: "mid_abbreviation", js: "mid_abbreviation", typ: u(null, "") },
        { json: "nickname", js: "nickname", typ: "" },
        { json: "pff_twitter_handle", js: "pff_twitter_handle", typ: null },
        { json: "primary_color", js: "primary_color", typ: "" },
        { json: "secondary_color", js: "secondary_color", typ: "" },
        { json: "slug", js: "slug", typ: "" },
        { json: "sportradar_id", js: "sportradar_id", typ: null },
        { json: "start_season", js: "start_season", typ: 0 },
        { json: "tertiary_color", js: "tertiary_color", typ: u(r("TertiaryColor"), null) },
        { json: "tv_abbreviation", js: "tv_abbreviation", typ: u(null, "") },
        { json: "twitter_handle", js: "twitter_handle", typ: null },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "team_id", js: "team_id", typ: "" },
        { json: "csv_conference", js: "csv_conference", typ: u(r("CSVConference"), null) },
        { json: "csv_conference_logo", js: "csv_conference_logo", typ: u(null, "") },
        { json: "csv_team", js: "csv_team", typ: u(null, "") },
        { json: "csv_team_logo", js: "csv_team_logo", typ: u(null, "") },
        { json: "csv_team_id", js: "csv_team_id", typ: u(0, null) },
        { json: "csv_tk", js: "csv_tk", typ: u(null, "") },
        { json: "csv_ncaaID", js: "csv_ncaaID", typ: u(0, null) },
        { json: "csv_color", js: "csv_color", typ: u(null, "") },
        { json: "csv_shortname", js: "csv_shortname", typ: u(null, "") },
        { json: "csv_seoName", js: "csv_seoName", typ: u(null, "") },
        { json: "csv_sixCharAbbr", js: "csv_sixCharAbbr", typ: u(null, "") },
        { json: "fbs", js: "fbs", typ: true },
        { json: "fcs", js: "fcs", typ: true },
        { json: "group", js: "group", typ: u(r("GroupEnum"), null) },
        { json: "power_five", js: "power_five", typ: true },
        { json: "group_of_five", js: "group_of_five", typ: true },
        { json: "independent", js: "independent", typ: true },
        { json: "conference", js: "conference", typ: u(r("Conference"), null) },
        { json: "division", js: "division", typ: u(r("Conference"), null) },
        { json: "conferenceAbbr", js: "conferenceAbbr", typ: u(r("ConferenceAbbr"), null) },
        { json: "level", js: "level", typ: u(r("ConferenceAbbr"), null) },
        { json: "nick", js: "nick", typ: "" },
        { json: "teamId", js: "teamId", typ: "" },
        { json: "teamType", js: "teamType", typ: r("TeamType") },
        { json: "abbr", js: "abbr", typ: u(null, "") },
        { json: "cityState", js: "cityState", typ: "" },
        { json: "fullName", js: "fullName", typ: "" },
        { json: "source", js: "source", typ: r("Source") },
        { json: "season", js: "season", typ: 0 },
        { json: "last_updt_ts", js: "last_updt_ts", typ: Date },
    ], false),
    "ColorMetadata": o([
        { json: "background_color_ref", js: "background_color_ref", typ: "" },
        { json: "dark_color_ref", js: "dark_color_ref", typ: "" },
        { json: "foreground_color", js: "foreground_color", typ: u(r("ForegroundColor"), null) },
        { json: "helmet_color_ref", js: "helmet_color_ref", typ: "" },
        { json: "jersey_color_ref", js: "jersey_color_ref", typ: "" },
        { json: "light_color_ref", js: "light_color_ref", typ: "" },
        { json: "primary_color", js: "primary_color", typ: "" },
        { json: "secondary_color", js: "secondary_color", typ: "" },
        { json: "tertiary_color", js: "tertiary_color", typ: u(r("TertiaryColor"), null) },
    ], false),
    "Conference": o([
        { json: "fullName", js: "fullName", typ: r("ConferenceAbbr") },
        { json: "id", js: "id", typ: r("ID") },
        { json: "id_number", js: "id_number", typ: 0 },
    ], false),
    "GroupElement": o([
        { json: "end_season", js: "end_season", typ: 0 },
        { json: "heirarchy", js: "heirarchy", typ: a(0) },
        { json: "hierarchy", js: "hierarchy", typ: a(0) },
        { json: "id", js: "id", typ: 0 },
        { json: "league_id", js: "league_id", typ: 0 },
        { json: "name", js: "name", typ: r("ConferenceAbbr") },
        { json: "parent_id", js: "parent_id", typ: u(0, null) },
        { json: "slug", js: "slug", typ: r("ID") },
        { json: "start_season", js: "start_season", typ: 0 },
        { json: "type", js: "type", typ: r("Type") },
        { json: "league", js: "league", typ: r("League") },
        { json: "display_order", js: "display_order", typ: 0 },
    ], false),
    "GameTime": [
        "00:00",
        "01:00",
        "01:15",
        "02:00",
        "15:00",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
    ],
    "ForegroundColor": [
        "#b60202",
        "#bb0202",
        "#f0693d",
        "#ffffff",
        "#000000",
        "#00661a",
        "#740101",
    ],
    "TertiaryColor": [
        "#a1a1a4",
        "#a3aaae",
        "#adafaa",
        "#b0b3b2",
        "#c1c6c8",
        "#c5b783",
        "#c8102e",
        "#cccccc",
        "#efefef",
        "#f7f7f7",
        "#faf9f9",
        "#fafafa",
        "#ff6418",
        "#ffc82d",
        "#ffffff",
        "#000000",
        "#00263a",
        "#00263e",
        "#006ba6",
        "#007934",
        "#0a863d",
        "#3e3d3c",
        "#4d4f53",
        "#565a5c",
        "#5f5f60",
        "#60697a",
        "#808080",
        "#808285",
        "#828282",
        "#8a8d8f",
        "#999999",
    ],
    "ConferenceAbbr": [
        "ACC",
        "Big 12",
        "Big Sky",
        "Big South - OVC Football Association",
        "Big Ten",
        "C-USA",
        "CAA",
        "FCS",
        "FBS",
        "Group of Five",
        "IND (FCS)",
        "IND (FBS)",
        "Ivy",
        "MAC",
        "MWC",
        "MEAC",
        "Missouri Valley",
        "NCAA D2",
        "NCAA D3",
        "Northeast",
        "Pac-12",
        "Patriot",
        "Pioneer",
        "Power Five",
        "SEC",
        "SWAC East",
        "SWAC West",
        "Southern",
        "Southland",
        "Sun Belt",
        "Sun Belt East",
        "Sun Belt West",
        "SWAC",
        "The American",
        "United Athletic",
    ],
    "ID": [
        "acc",
        "big-12",
        "big-sky",
        "big-south-ovc",
        "big-ten",
        "c-usa",
        "caa",
        "fcs",
        "fbs",
        "group-of-five",
        "ind-fcs",
        "ind-fbs",
        "ivy-fcs",
        "mac",
        "mwc",
        "meac",
        "missouri-valley",
        "ncaa-d2",
        "ncaa-d3",
        "northeast",
        "pac-12",
        "patriot",
        "pioneer",
        "power-five",
        "sec",
        "southern",
        "southland",
        "sun-belt",
        "sun-belt-east",
        "sun-belt-west",
        "swac",
        "swac-east",
        "swac-west",
        "the-american",
        "united-athletic",
    ],
    "CSVConference": [
        "American Athletic Conference",
        "Atlantic Coast",
        "Big 12",
        "Big Ten",
        "Conference USA",
        "Independents(FBS)",
        "Mid-American",
        "Mountain West",
        "Pac-12",
        "Southeastern",
        "Sun Belt",
    ],
    "GroupEnum": [
        "Group of Five",
        "Independent",
        "Power Five",
    ],
    "League": [
        "NCAA",
    ],
    "Type": [
        "CONF",
        "DIV",
        "OTHER",
    ],
    "Source": [
        "PFF",
    ],
    "TeamType": [
        "TEAM",
    ],
};

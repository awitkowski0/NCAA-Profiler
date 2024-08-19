// To parse this data:
//
//   import { Convert, Team } from "./file";
//
//   const team = Convert.toTeam(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Team {
    id:                  string;
    abbreviation:        string;
    city:                string;
    colorMetadata:       ColorMetadata;
    displayAbbreviation: string;
    endSeason:           number;
    franchiseID:         number;
    groups:              Group[];
    gsisAbbreviation:    string;
    teamID:              null;
    league:              string;
    leagueID:            number;
    midAbbreviation:     string;
    nickname:            string;
    pffTwitterHandle:    null;
    primaryColor:        string;
    secondaryColor:      string;
    slug:                string;
    sportradarID:        null;
    startSeason:         number;
    tertiaryColor:       string;
    tvAbbreviation:      string;
    twitterHandle:       null;
    updatedAt:           Date;
    purpleTeamID:        string;
    csvConference:       string;
    csvConferenceLogo:   string;
    csvTeam:             string;
    csv_team_logo:         string;
    csvTeamID:           number;
    csvTk:               string;
    csvNcaaID:           number;
    csvColor:            string;
    csvShortname:        string;
    csvSEOName:          string;
    csvSixCharAbbr:      string;
    fbs:                 boolean;
    fcs:                 boolean;
    group:               string;
    powerFive:           boolean;
    groupOfFive:         boolean;
    independent:         boolean;
    conference:          Conference;
    division:            null;
    conferenceAbbr:      string;
    level:               string;
    nick:                string;
    teamTeamID:          string;
    teamType:            string;
    abbr:                string;
    cityState:           string;
    fullName:            string;
    source:              string;
    season:              number;
    lastUpdtTs:          Date;
}

export interface ColorMetadata {
    backgroundColorRef: string;
    darkColorRef:       string;
    foregroundColor:    string;
    helmetColorRef:     string;
    jerseyColorRef:     string;
    lightColorRef:      string;
    primaryColor:       string;
    secondaryColor:     string;
    tertiaryColor:      string;
}

export interface Conference {
    fullName: string;
    id:       string;
    idNumber: number;
}

export interface Group {
    endSeason:    number;
    heirarchy:    number[];
    hierarchy:    number[];
    id:           number;
    leagueID:     number;
    name:         string;
    parentID:     number | null;
    slug:         string;
    startSeason:  number;
    type:         string;
    league:       string;
    displayOrder: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toTeam(json: string): Team {
        return cast(JSON.parse(json), r("Team"));
    }

    public static teamToJson(value: Team): string {
        return JSON.stringify(uncast(value, r("Team")), null, 2);
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
    "Team": o([
        { json: "_id", js: "id", typ: "" },
        { json: "abbreviation", js: "abbreviation", typ: "" },
        { json: "city", js: "city", typ: "" },
        { json: "color_metadata", js: "colorMetadata", typ: r("ColorMetadata") },
        { json: "display_abbreviation", js: "displayAbbreviation", typ: "" },
        { json: "end_season", js: "endSeason", typ: 0 },
        { json: "franchise_id", js: "franchiseID", typ: 0 },
        { json: "groups", js: "groups", typ: a(r("Group")) },
        { json: "gsis_abbreviation", js: "gsisAbbreviation", typ: "" },
        { json: "id", js: "teamID", typ: null },
        { json: "league", js: "league", typ: "" },
        { json: "league_id", js: "leagueID", typ: 0 },
        { json: "mid_abbreviation", js: "midAbbreviation", typ: "" },
        { json: "nickname", js: "nickname", typ: "" },
        { json: "pff_twitter_handle", js: "pffTwitterHandle", typ: null },
        { json: "primary_color", js: "primaryColor", typ: "" },
        { json: "secondary_color", js: "secondaryColor", typ: "" },
        { json: "slug", js: "slug", typ: "" },
        { json: "sportradar_id", js: "sportradarID", typ: null },
        { json: "start_season", js: "startSeason", typ: 0 },
        { json: "tertiary_color", js: "tertiaryColor", typ: "" },
        { json: "tv_abbreviation", js: "tvAbbreviation", typ: "" },
        { json: "twitter_handle", js: "twitterHandle", typ: null },
        { json: "updated_at", js: "updatedAt", typ: Date },
        { json: "team_id", js: "purpleTeamID", typ: "" },
        { json: "csv_conference", js: "csvConference", typ: "" },
        { json: "csv_conference_logo", js: "csvConferenceLogo", typ: "" },
        { json: "csv_team", js: "csvTeam", typ: "" },
        { json: "csv_team_logo", js: "csvTeamLogo", typ: "" },
        { json: "csv_team_id", js: "csvTeamID", typ: 0 },
        { json: "csv_tk", js: "csvTk", typ: "" },
        { json: "csv_ncaaID", js: "csvNcaaID", typ: 0 },
        { json: "csv_color", js: "csvColor", typ: "" },
        { json: "csv_shortname", js: "csvShortname", typ: "" },
        { json: "csv_seoName", js: "csvSEOName", typ: "" },
        { json: "csv_sixCharAbbr", js: "csvSixCharAbbr", typ: "" },
        { json: "fbs", js: "fbs", typ: true },
        { json: "fcs", js: "fcs", typ: true },
        { json: "group", js: "group", typ: "" },
        { json: "power_five", js: "powerFive", typ: true },
        { json: "group_of_five", js: "groupOfFive", typ: true },
        { json: "independent", js: "independent", typ: true },
        { json: "conference", js: "conference", typ: r("Conference") },
        { json: "division", js: "division", typ: null },
        { json: "conferenceAbbr", js: "conferenceAbbr", typ: "" },
        { json: "level", js: "level", typ: "" },
        { json: "nick", js: "nick", typ: "" },
        { json: "teamId", js: "teamTeamID", typ: "" },
        { json: "teamType", js: "teamType", typ: "" },
        { json: "abbr", js: "abbr", typ: "" },
        { json: "cityState", js: "cityState", typ: "" },
        { json: "fullName", js: "fullName", typ: "" },
        { json: "source", js: "source", typ: "" },
        { json: "season", js: "season", typ: 0 },
        { json: "last_updt_ts", js: "lastUpdtTs", typ: Date },
    ], false),
    "ColorMetadata": o([
        { json: "background_color_ref", js: "backgroundColorRef", typ: "" },
        { json: "dark_color_ref", js: "darkColorRef", typ: "" },
        { json: "foreground_color", js: "foregroundColor", typ: "" },
        { json: "helmet_color_ref", js: "helmetColorRef", typ: "" },
        { json: "jersey_color_ref", js: "jerseyColorRef", typ: "" },
        { json: "light_color_ref", js: "lightColorRef", typ: "" },
        { json: "primary_color", js: "primaryColor", typ: "" },
        { json: "secondary_color", js: "secondaryColor", typ: "" },
        { json: "tertiary_color", js: "tertiaryColor", typ: "" },
    ], false),
    "Conference": o([
        { json: "fullName", js: "fullName", typ: "" },
        { json: "id", js: "id", typ: "" },
        { json: "id_number", js: "idNumber", typ: 0 },
    ], false),
    "Group": o([
        { json: "end_season", js: "endSeason", typ: 0 },
        { json: "heirarchy", js: "heirarchy", typ: a(0) },
        { json: "hierarchy", js: "hierarchy", typ: a(0) },
        { json: "id", js: "id", typ: 0 },
        { json: "league_id", js: "leagueID", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "parent_id", js: "parentID", typ: u(0, null) },
        { json: "slug", js: "slug", typ: "" },
        { json: "start_season", js: "startSeason", typ: 0 },
        { json: "type", js: "type", typ: "" },
        { json: "league", js: "league", typ: "" },
        { json: "display_order", js: "displayOrder", typ: 0 },
    ], false),
};

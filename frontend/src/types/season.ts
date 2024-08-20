// To parse this data:
//
//   import { Convert } from "./file";
//
//   const season = Convert.toSeason(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Season {
    team:    string;
    season:  number;
    games:   Game[];
    bye_week: number[];
    csv_team_logo: string;
}

export interface Game {
    week:         number;
    game_key:      string;
    game_id:       string;
    game_data:     string;
    game_time:     GameTime;
    visitor_team:  string;
    visitor_score: null;
    home_team:     string;
    home_score:    null;
    is_home:       boolean;
    result:       null;
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
        { json: "bye_week", js: "byeWeek", typ: a(0) },
    ], false),
    "Game": o([
        { json: "week", js: "week", typ: 0 },
        { json: "game_key", js: "gameKey", typ: "" },
        { json: "game_id", js: "gameID", typ: "" },
        { json: "game_date", js: "gameDate", typ: "" },
        { json: "game_time", js: "gameTime", typ: r("GameTime") },
        { json: "visitor_team", js: "visitorTeam", typ: "" },
        { json: "visitor_score", js: "visitorScore", typ: null },
        { json: "home_team", js: "homeTeam", typ: "" },
        { json: "home_score", js: "homeScore", typ: null },
        { json: "is_home", js: "isHome", typ: true },
        { json: "result", js: "result", typ: null },
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
};

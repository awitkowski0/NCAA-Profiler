// Define the structure for a single game
export interface Game {
  week: number | string;
  game_key: string;
  game_id: string;
  game_date: string;
  game_time: string;
  visitor_team: string;
  visitor_score: number;
  home_team: string;
  home_score: number;
  is_home: boolean;
  result: string;
}

// Define the structure for the team season
export interface TeamSeason {
  team: string;
  season: number;
  games: Game[];
  bye_week: number[];
}

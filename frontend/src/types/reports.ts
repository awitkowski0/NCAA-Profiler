export interface Report {
  id?: number;
  player_id?: string;
  team_id?: string;
  game_id?: number;
  play_id?: number;
  grade?: number;
  summary?: string;
  notes?: string;
}
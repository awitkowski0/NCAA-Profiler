export interface Report {
  id?: number;
  player_id?: string;
  team_id?: string;
  game_id?: string;
  play_id?: string;
  grade?: number;
  summary?: string;
  notes?: string;
}
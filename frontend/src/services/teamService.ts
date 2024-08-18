
import { TeamSeason } from '../types/team';

/**
 */
export const fetchTeamData = async (season: number): Promise<TeamSeason[]> => {
  const response = await fetch(`http://localhost:89/api/season/${season}`);
  if (!response.ok) {
    throw new Error(`Error fetching team data: ${response.statusText}`);
  }
  const data: TeamSeason[] = await response.json();
  return data;
};
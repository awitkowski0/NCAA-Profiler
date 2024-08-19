import { Season } from '../types/season';
import { Team } from '../types/team';
import teamData from '../data/team.json'; // Local JSON file for development

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Fetches season data for a specific year and joins with the team name and logo.
 * 
 * @param seasonYear - The year of the season to fetch data for.
 * @returns An array of Season objects with team names and logos joined.
 */
export const fetchTeamData = async (seasonYear: number): Promise<Season[]> => {
  // Fetch season data
  const response = await fetch(`http://localhost:89/api/season/${seasonYear}`);
  if (!response.ok) {
    throw new Error(`Error fetching season data: ${response.statusText}`);
  }
  const seasonData: Season[] = await response.json();

  // Join the fetched team name and logo with the season data
  const joinedData = await Promise.all(seasonData.map(async (season) => {
    try {
      let team: Team;
      if (isDevelopment) {
        console.log('Development mode: Returning local team JSON data');
        team = teamData as unknown as Team;
      } else {
        const teamResponse = await fetch(`http://localhost:89/api/team/${season.team}`);
        
        if (!teamResponse.ok) {
          throw new Error(`Error fetching team name: ${teamResponse.statusText}`);
        }
        team = await teamResponse.json() as Team;
      }

      return {
        ...season,
        csv_team_logo: team.csv_team_logo || '',  // Include the team logo in the data
        team: team.fullName || 'Unknown Team',
      };
    } catch (error) {
      console.error(`Failed to fetch team data for season ${season.season} and team ${season.team}:`, error);
      return {
        ...season,
        csv_team_logo: '',  // Default logo or empty
        team: 'Unknown Team',  // Default team name
      };
    }
  }));

  return joinedData;
};
import { Team } from '../types/team';
import { Game, Season } from '../types/season';
const API_URL = 'http://localhost:89';

export const getTeamData = async (teamId: string): Promise<Team> => {
  const response = await fetch(`${API_URL}/api/team/${teamId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching team data: ${response.statusText}`);
  }

  return response.json();
};

export const getGameData = async (gameId: string): Promise<Game> => {
  const response = await fetch(`${API_URL}/api/game/${gameId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching game data: ${response.statusText}`);
  }

  return response.json();
};

export const getSeasonData = async (year: number): Promise<Season[]> => {
  const response = await fetch(`${API_URL}/api/season/${year}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching team data: ${response.statusText}`);
  }

  return response.json();
};
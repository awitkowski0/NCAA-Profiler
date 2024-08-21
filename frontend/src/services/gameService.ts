import { Team } from "../types/team";
import { Season } from "../types/season";
import { Convert, Play } from "../types/play";
import { GameDetails, PlaySummary, GameSummary } from "../types/game";
const API_URL = "http://localhost:89";

export const getTeamData = async (teamId: string): Promise<Team> => {
  const response = await fetch(`${API_URL}/api/team/${teamId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching team data: ${response.statusText}`);
  }

  return response.json();
};
export const getGameData = async (gameId: number): Promise<GameDetails> => {
  const response = await fetch(`${API_URL}/api/game/${gameId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching game data: ${response.statusText}`);
  }
  const jsonData = await response.json();

  // Convert the JavaScript object back to a JSON string
  const jsonString = JSON.stringify(jsonData);

  // Now pass the JSON string to Convert.toPlay
  const originalPlays: Play[] = Convert.toPlay(jsonString);

  const plays: PlaySummary[] = originalPlays
    .map((play: Play) => ({
      play: play,
      players: extractPlayersFromPlay(play),
    }))
    .sort((a, b) => {
      // First, sort by quarter
      if (a.play.quarter !== b.play.quarter) {
        return a.play.quarter - b.play.quarter;
      }
      // If quarters are the same, sort by game clock converted to seconds (reverse order)
      return (
        timeToSeconds(b.play.game_clock) - timeToSeconds(a.play.game_clock)
      );
    });

  const gameSummary: GameSummary = {
    totalPlays: plays.length,
  };

  return {
    summary: gameSummary,
    plays: plays,
  };
};

function extractPlayersFromPlay(play: Play): string[] {
  const players = new Set<string>(); // Use a Set to avoid duplicates

  // Extract defensive players
  if (play.presnap_d?.d_participation_info) {
    for (const player of play.presnap_d.d_participation_info) {
      if (player.short_name) {
        players.add(player.short_name);
      }
    }
  }

  // Extract offensive players
  if (play.presnap_o?.o_participation_info) {
    for (const player of play.presnap_o.o_participation_info) {
      if (player.short_name) {
        players.add(player.short_name);
      }
    }
  }

  // Convert the set of player names back to an array
  return Array.from(players);
}

function timeToSeconds(time: string): number {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
}

export const getSeasonData = async (year: number): Promise<Season[]> => {
  const response = await fetch(`${API_URL}/api/season/${year}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching team data: ${response.statusText}`);
  }

  return response.json();
};

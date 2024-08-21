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
  const gameSummary: GameSummary = {
    teamStats: {
      totalSacks: 0,
      totalTackles: 0,
      totalYards: 0,
    },
    playerStats: {},
  };

  const plays: PlaySummary[] = originalPlays.map((play: Play) => {
    const { summary } = play.stats;

    // Aggregate stats for passer
    if (summary.passer) {
      const playerId = summary.passer.player_id;
      if (playerId) {
        if (!gameSummary.playerStats[playerId]) {
          gameSummary.playerStats[playerId] = {
            passingYards: 0,
            yac: 0,
            sacks: 0,
            tackles: 0,
          };
        }
        gameSummary.playerStats[playerId].passingYards +=
          summary.result_yds || 0;
      }
    }

    // Aggregate stats for ball carrier
    if (summary.ball_carrier) {
      const playerId = summary.ball_carrier.player_id;
      if (playerId) {
        if (!gameSummary.playerStats[playerId]) {
          gameSummary.playerStats[playerId] = {
            passingYards: 0,
            yac: 0,
            sacks: 0,
            tackles: 0,
          };
        }
        gameSummary.playerStats[playerId].yac += summary.yards_after_catch || 0;
      }
    }

    // Aggregate stats for sack
    if (summary.sack_by) {
      const playerId = summary.sack_by.player_id;
      if (playerId) {
        if (!gameSummary.playerStats[playerId]) {
          gameSummary.playerStats[playerId] = {
            passingYards: 0,
            yac: 0,
            sacks: 0,
            tackles: 0,
          };
        }
        gameSummary.playerStats[playerId].sacks += 1;
        gameSummary.teamStats.totalSacks += 1;
      }
    }

    // Aggregate stats for tackles
    if (summary.tackle_by) {
      const playerId = summary.tackle_by.player_id;
      if (playerId) {
        if (!gameSummary.playerStats[playerId]) {
          gameSummary.playerStats[playerId] = {
            passingYards: 0,
            yac: 0,
            sacks: 0,
            tackles: 0,
          };
        }
        gameSummary.playerStats[playerId].tackles += 1;
        gameSummary.teamStats.totalTackles += 1;
      }
    }

    // Handle assist tackles
    if (summary.tackle_assist_by) {
      summary.tackle_assist_by.forEach((player) => {
        const playerId = player._id;
        if (playerId) {
          if (!gameSummary.playerStats[playerId]) {
            gameSummary.playerStats[playerId] = {
              passingYards: 0,
              yac: 0,
              sacks: 0,
              tackles: 0,
            };
          }
          gameSummary.playerStats[playerId].tackles += 0.5; // Assuming half a tackle for assists
          gameSummary.teamStats.totalTackles += 0.5;
        }
      });
    }

    // Return the play summary
    return {
      play: play,
      players: extractPlayersFromPlay(play),
    };
  });

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

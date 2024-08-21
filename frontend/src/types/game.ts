import { Play } from "./play"; // Assuming PenaltyPlayer is imported from the same module

export interface GameDetails {
    summary?: GameSummary; // Extra data to summarize the game
    plays: PlaySummary[];  // Play's with more summary data
    season?: number;
}

export interface PlaySummary {
    play: Play;           // Original play
    players?: string[];   // Players to search by
    stats?: PlayerStats;  // Player-specific statistics for this play
}

export interface GameSummary {
    teamStats: {
        totalSacks: number;
        totalTackles: number;
        totalYards: number;
    };
    playerStats: Record<string, PlayerStats>; // Keyed by player ID
}

export interface PlayerStats {
    passingYards: number;
    yac: number;
    sacks: number;
    tackles: number;
}


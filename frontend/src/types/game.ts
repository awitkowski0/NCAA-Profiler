import { Play } from "./play";

export interface GameDetails {
    summary?: GameSummary; // Extra data to summarize by
    plays: PlaySummary[];  // Play's with more summary data
    season?: number;
}

export interface PlaySummary {
    play: Play;         // Original play
    players?: string[]; // Players to search by
}

export interface GameSummary {

}
import React from "react";
import { Chip } from "@mui/material";
import { PenaltyPlayer } from "../types/play";

interface PlayerChipProps {
  player: PenaltyPlayer;
}

export const PlayerChip: React.FC<PlayerChipProps> = ({ player }) => {
  const getColorStyle = (position_group: string) => {
    switch (position_group) {
      case "QB":
        return { backgroundColor: "#1976d2", color: "#fff" };
      case "RB":
        return { backgroundColor: "#9c27b0", color: "#fff" };
      case "WR":
        return { backgroundColor: "#4caf50", color: "#fff" };
      case "TE":
        return { backgroundColor: "#ff9800", color: "#fff" };
      case "OL":
        return { backgroundColor: "#03a9f4", color: "#fff" };
      case "DL":
        return { backgroundColor: "#f44336", color: "#fff" };
      case "LB":
        return { backgroundColor: "#607d8b", color: "#fff" };
      case "DB":
        return { backgroundColor: "#9e9e9e", color: "#fff" };
      case "K":
        return { backgroundColor: "#8bc34a", color: "#fff" };
      case "P":
        return { backgroundColor: "#00bcd4", color: "#fff" };

      default:
        return { backgroundColor: "#e0e0e0", color: "#000" };
    }
  };

  const displayName = (player: PenaltyPlayer) => {
    const display: string = "" + player.short_name + " - " + player.pos_group;

    return display;
  };

  return (
    <Chip
      label={displayName(player)}
      sx={{
        ...getColorStyle(player.pos_group),
        cursor: "pointer",
        "& .MuiChip-label": { fontSize: "0.75rem" }, // Adjust font size here
      }}
    />
  );
};

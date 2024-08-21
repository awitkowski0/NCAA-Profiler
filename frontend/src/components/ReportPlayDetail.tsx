import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button
} from "@mui/material";
import { PlaySummary } from "../types/game";
import { PlayerChip } from "./PlayerChip";
import { PlayDescription } from "./PlayDescription";

interface PlayDetailProps {
  playSummary: PlaySummary;
  index: number;
}

export const PlayDetail: React.FC<PlayDetailProps> = ({ playSummary }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };



  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="body1">
          Q{playSummary.play.quarter} - Game Clock:{" "}
          {playSummary.play.game_clock || "No description available."}
        </Typography>
        <Box sx={{ marginY: 1 }} />
        <PlayDescription playSummary={playSummary}/>
        <Box sx={{ marginY: 1 }} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          Offense: {playSummary.play.offense} -{" "}
          {playSummary.play.presnap_o?.o_participation_info?.map((player) => (
            <PlayerChip key={player._id} player={player} />
          ))}
        </Box>
        <Box sx={{ marginY: 1 }} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          Defense: {playSummary.play.defense} -{" "}
          {playSummary.play.presnap_d?.d_participation_info?.map((player) => (
            <PlayerChip key={player._id} player={player} />
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleToggleDetails}
          sx={{ marginTop: 2 }}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
        {showDetails && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h5">Visualize more details in here...</Typography>
          </Box>
        )}
        <Box sx={{ marginX: 1 }} />
      </CardContent>
    </Card>
  );
};

export default PlayDetail;

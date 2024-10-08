import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { PlaySummary } from "../types/game";
import { createReport } from "../services/authService";
import { PlayerChip } from "./PlayerChip";
import { PlayDescription } from "./PlayDescription";
import { Report } from "../types/reports";

interface PlayDetailProps {
  playSummary: PlaySummary;
  index: number;
}

export const PlayDetail: React.FC<PlayDetailProps> = ({ playSummary }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportNotes, setReportNotes] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleToggleReportForm = () => {
    setShowReportForm(!showReportForm);
  };

  const handleReportSubmit = async () => {
    try {

      const report: Report = {
        team_id: "",
        game_id: playSummary.play.game_id,
        play_id: playSummary.play.play_id,
        grade: 0,
        summary: "",
        notes: reportNotes,
      };
      await createReport(report);
      setReportSubmitted(true);
      alert("Report submitted successfully!");
    } catch (error) {
      console.error("Failed to submit report:", error);
      alert("Failed to submit report");
    }
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
        {!reportSubmitted && (
          <>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleToggleReportForm}
              sx={{ marginTop: 2 }}
            >
              {showReportForm ? "Cancel Report" : "Create Report"}
            </Button>
            {showReportForm && (
              <Box sx={{ marginTop: 2 }}>
                <TextField
                  fullWidth
                  label="Report Notes"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={reportNotes}
                  onChange={(e) => setReportNotes(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleReportSubmit}
                >
                  Submit Report
                </Button>
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayDetail;

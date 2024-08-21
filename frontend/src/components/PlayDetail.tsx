import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Chip, Button, TextField
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PlaySummary } from '../types/game';
import { createReport } from '../services/authService'; // Import your report creation service

interface PlayDetailProps {
  playSummary: PlaySummary;
  index: number;
}

export const PlayDetail: React.FC<PlayDetailProps> = ({ playSummary }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportNotes, setReportNotes] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleToggleSummary = () => {
    setShowSummary(!showSummary);
  };

  const handleToggleReportForm = () => {
    setShowReportForm(!showReportForm);
  };

  const handleReportSubmit = async () => {
    try {
      await createReport({
        game_id: playSummary.play.game_id,
        play_id: playSummary.play.play_id,
        summary: 'Play Report',
        grade: 1,
        notes: reportNotes,
      });
      setReportSubmitted(true);
      alert('Report submitted successfully!');
    } catch (error) {
      console.error('Failed to submit report:', error);
      alert('Failed to submit report');
    }
  };

  const getSummaryRows = () => {
    const summaryEntries = Object.entries(playSummary.play.stats.summary).filter(([_key, value]) => value !== undefined && value !== null);
    return summaryEntries.map(([key, value], index) => ({
      id: index,
      field: key,
      value: Array.isArray(value) ? value.map(v => v.name || v).join(', ') : value.toString(),
    }));
  };

  const summaryColumns: GridColDef[] = [
    { field: 'field', headerName: 'Stat Type', width: 200 },
    { field: 'value', headerName: 'Value', width: 400 },
  ];

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="body1">
          Q{playSummary.play.quarter} - Game Clock: {playSummary.play.game_clock || 'No description available.'}
        </Typography>
        <Typography variant="body2">Players:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {playSummary.players?.map((player, playerIndex) => (
            <Chip key={playerIndex} label={player} />
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleToggleSummary}
          sx={{ marginTop: 2 }}
        >
          {showSummary ? 'Hide Summary' : 'Show Summary'}
        </Button>
        {showSummary && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h5">Summary for Play</Typography>
            <Box sx={{ height: 400, marginTop: 2 }}>
              <DataGrid
                rows={getSummaryRows()}
                columns={summaryColumns}
              />
            </Box>
          </Box>
        )}
        {!reportSubmitted && (
          <>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleToggleReportForm}
              sx={{ marginTop: 2 }}
            >
              {showReportForm ? 'Cancel Report' : 'Create Report'}
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
                <Button variant="contained" color="primary" onClick={handleReportSubmit}>
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
import React, { useEffect, useState } from 'react';
import {
  Button, Grid, TextField, Typography, Box, Paper, InputAdornment, TableContainer, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getGameData } from '../services/gameService';
import { GameDetails, PlaySummary } from '../types/game';
import { createReport } from '../services/authService';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PlayDetail from './PlayDetail';

export const GameComponent: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState<GameDetails | null>(null);
  const [_error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportNotes, setReportNotes] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGameData(Number(gameId));
        setGameData(data);
      } catch (err) {
        setError(`Failed to fetch game data: ${(err as Error).message}`);
      }
    };

    fetchData();
  }, [gameId]);

  const filteredPlays = gameData?.plays.filter((playSummary: PlaySummary) => 
    playSummary.players?.some((player: string) => 
      player.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleBackClick = () => {
    navigate('/season/');
  };

  const handleCreateReportClick = () => {
    setShowReportForm(true);
  };

  const handleReportSubmit = async () => {
    try {
      await createReport({ game_id: Number(gameId), summary: 'Game Report', grade: 1, notes: reportNotes });
      alert('Report submitted successfully!');
      setShowReportForm(false);
      setReportNotes('');
    } catch (error) {
      console.error('Failed to submit report:', error);
      alert('Failed to submit report');
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleBackClick} sx={{ marginRight: 2 }}>
          Back to Season List
        </Button>
        <Button variant="contained" color="primary" onClick={handleCreateReportClick}>
          Create Game Report
        </Button>
      </Grid>

      {showReportForm && (
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Create Report</Typography>
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
          </Paper>
        </Grid>
      )}

      <Grid item xs={12}>
        <Typography variant="h5">Game Statistics</Typography>
        {gameData ? (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table aria-label="summary table">
              <TableHead>
                <TableRow>
                  <TableCell>Stat Type</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Render specific summary data here */}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>Loading game data...</Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Search by Player"
            variant="outlined"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ marginRight: 2 }}
          />
          <Button variant="outlined" startIcon={<FilterListIcon />}>
            Filters
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Plays</Typography>
        <Grid container spacing={2}>
          {filteredPlays && filteredPlays.map((playSummary, index) => (
            <Grid item xs={12} key={index}>
              <PlayDetail playSummary={playSummary} index={index} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GameComponent;

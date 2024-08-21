import React, { useEffect, useState } from 'react';
import {
  Button, Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getGameData } from '../services/gameService';
import { GameDetails, PlaySummary } from '../types/game';
import { createReport } from '../services/authService';

export const GameComponent: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState<GameDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
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
      await createReport({ game_id: gameId, summary: 'Game Report', grade: 1, notes: reportNotes });
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
          <Card>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>
      )}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5">Game Summary for Game ID: {gameId}</Typography>
            {error && <Typography color="error">{error}</Typography>}
            {gameData ? (
              <TableContainer component={Paper}>
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
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Search by Player"
          variant="outlined"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Plays</Typography>
        {filteredPlays && filteredPlays.map((playSummary: { play: { game_clock: any; }; }, index: number) => (
          <Typography key={index} variant="body1" style={{ marginBottom: '10px' }}>
            Play {index + 1}: {playSummary.play.game_clock || 'No description available.'}
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default GameComponent;

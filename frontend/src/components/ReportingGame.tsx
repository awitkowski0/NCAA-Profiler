import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { getGameData } from "../services/gameService";
import { GameDetails, PlaySummary } from "../types/game";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

import ReportPlayDetail from "./ReportPlayDetail";
import GameSummaryGrid from "./GameSummaryCard";

interface ReportingGameComponentProps {
  gameId: string;
}

export const ReportingGameComponent: React.FC<ReportingGameComponentProps> = ({ gameId }) => {
  const [gameData, setGameData] = useState<GameDetails | null>(null);
  const [_error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [_showReportForm] = useState(false);

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {gameData?.summary ? (
          <GameSummaryGrid gameSummary={gameData.summary} />
        ) : (
          <Typography>Loading game data...</Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Search by Player"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          {filteredPlays &&
            filteredPlays.map((playSummary, index) => (
              <Grid item xs={12} key={index}>
                <ReportPlayDetail playSummary={playSummary} index={index} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReportingGameComponent;

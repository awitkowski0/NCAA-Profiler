import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { GameSummary, PlayerStats } from "../types/game";

interface GameSummaryGridProps {
  gameSummary: GameSummary;
}

export const GameSummaryGrid: React.FC<GameSummaryGridProps> = ({
  gameSummary,
}) => {
  // Player detail columns
  const playerDetailColumns: GridColDef[] = [
    { field: "player", headerName: "Player", width: 300 },
    { field: "passingYards", headerName: "Passing Yards", width: 150 },
    { field: "yac", headerName: "YAC", width: 150 },
    { field: "sacks", headerName: "Sacks", width: 150 },
    { field: "tackles", headerName: "Tackles", width: 150 },
  ];

  // Player detail rows
  const playerDetailRows = Object.keys(gameSummary.playerStats).map(
    (playerId, index) => {
      const playerStats: PlayerStats = gameSummary.playerStats[playerId];
      const player: string = playerId;
      return {
        id: index,
        player: player,
        passingYards: playerStats.passingYards,
        yac: playerStats.yac,
        sacks: playerStats.sacks,
        tackles: playerStats.tackles,
      };
    }
  );

  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Game Summary
        </Typography>
        <Box sx={{ height: 400, width: "100%", marginTop: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 4 }}>
            Player Details
          </Typography>
          <DataGrid
            rows={playerDetailRows}
            columns={playerDetailColumns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default GameSummaryGrid;

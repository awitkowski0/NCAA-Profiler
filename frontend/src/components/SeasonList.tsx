import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { fetchTeamData } from '../services/teamService';
import { TeamSeason, Game } from '../types/team';

const TeamSeasonComponent: React.FC = () => {
  const { season } = useParams<{ season?: string }>(); // Optional season parameter
  const navigate = useNavigate(); // For navigation
  const [teamSeasons, setTeamSeasons] = useState<TeamSeason[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear(); // Get the current year
    const seasonNumber = season ? parseInt(season, 10) : currentYear; // Default to current year if no season

    if (!season) {
      navigate(`/season/${currentYear}`, { replace: true }); // Redirect to current year if no season provided
    }

    const loadTeamData = async () => {
      try {
        const data = await fetchTeamData(seasonNumber);
        setTeamSeasons(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    loadTeamData();
  }, [season, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!teamSeasons.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {teamSeasons.map((teamSeason, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h1>{teamSeason.team} - {teamSeason.season} Season</h1>
          <TeamSeasonDataGrid teamSeason={teamSeason} />
        </div>
      ))}
    </div>
  );
};

const TeamSeasonDataGrid: React.FC<{ teamSeason: TeamSeason }> = ({ teamSeason }) => {
  // Define columns for DataGrid
  const columns: GridColDef[] = [
    { field: 'week', headerName: 'Week', width: 100 },
    { field: 'game_date', headerName: 'Date', width: 150 },
    { field: 'home_team', headerName: 'Home Team', width: 150 },
    { field: 'visitor_team', headerName: 'Visitor Team', width: 150 },
    { field: 'home_score', headerName: 'Home Score', width: 120 },
    { field: 'visitor_score', headerName: 'Visitor Score', width: 120 },
    { field: 'result', headerName: 'Result', width: 100 },
  ];

  // Transform games data into rows for DataGrid
  const rows: GridRowsProp = teamSeason.games.map((game: Game, index: number) => ({
    id: index + 1,
    week: game.week,
    game_date: game.game_date,
    home_team: game.home_team,
    visitor_team: game.visitor_team,
    home_score: game.home_score,
    visitor_score: game.visitor_score,
    result: game.result,
  }));

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default TeamSeasonComponent;

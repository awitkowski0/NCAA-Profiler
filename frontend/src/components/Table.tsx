import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import { fetchTeamData } from "../services/teamService";
import { Season } from "../types/season";

const SeasonCards: React.FC = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [filteredSeasons, setFilteredSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2024); // Default year
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTeamData(selectedYear);
        setSeasons(data);
        setFilteredSeasons(data);
      } catch (err) {
        console.error("Error during data load:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedYear]);

  useEffect(() => {
    const filtered = seasons.filter(
      (season) =>
        season.team.toLowerCase().includes(searchTerm.toLowerCase()) &&
        season.season === selectedYear
    );
    setFilteredSeasons(filtered);
  }, [searchTerm, selectedYear, seasons]);

  const handleExpandClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const calculateRecord = (games: any[]) => {
    const wins = games.filter(game => game.result === "W").length;
    const losses = games.filter(game => game.result === "L").length;
    return `${wins} - ${losses}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Search by Team Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="year-select-label">Select Year</InputLabel>
        <Select
          labelId="year-select-label"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          <MenuItem value={2024}>2024</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        {filteredSeasons.map((season, index) => (
          <Grid item xs={12} key={index}>
            <Card onClick={() => handleExpandClick(index)}>
              <CardContent>
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  {season.csv_team_logo && (
                    <img
                      src={season.csv_team_logo}
                      alt={`${season.team} Logo`}
                      style={{ maxHeight: "100px", marginBottom: "8px" }}
                    />
                  )}
                  <Typography variant="h5">{season.team}</Typography>
                  <Typography variant="body2">
                    Record: {calculateRecord(season.games)}
                  </Typography>
                </div>

                <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
                  <List>
                    {season.games.map((game) => (
                      <React.Fragment key={game.gameID}>
                        <ListItem button onClick={() => console.log(`Navigate to game ${game.gameID}`)}>
                          <ListItemText
                            primary={`${game.gameDate} - ${game.homeTeam} vs. ${game.visitorTeam}`}
                            secondary={`Score: ${game.homeScore ?? '-'} - ${game.visitorScore ?? '-'}`}
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SeasonCards;

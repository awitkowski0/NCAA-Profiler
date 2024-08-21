import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Divider,
  Box,
} from "@mui/material";
import { getSeasonData } from "../services/gameService";
import { Season } from "../types/season";

const SeasonCards: React.FC = () => {
  const { year, team } = useParams<{ year: string; team?: string }>();
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [filteredSeasons, setFilteredSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(team ? decodeURIComponent(team) : "");
  const [selectedYear, setSelectedYear] = useState<number>(Number(year ? team : 2023));
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getSeasonData(selectedYear);
        setSeasons(data);
        setFilteredSeasons(data);
      } catch (err: any) {
        console.error("Error during data load:", err);
        setError(`Failed to load data: ${err.message}`);
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

  function cleanUrl(url: string) {
    if (!url) return "";
    let decodedUrl = decodeURIComponent(url);
    return decodedUrl.replace(/<img src="([^"]+)".*>/, "$1");
  }

  const calculateRecord = (games: any[]) => {
    const wins = games.filter((game) => game.result === "W").length;
    const losses = games.filter((game) => game.result === "L").length;
    return `${wins} - ${losses}`;
  };
  const handleExpandClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleGameClick = (gameId: number) => {
    navigate(`/game/${gameId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Search by Team Name"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="year-select-label">Select Year</InputLabel>
            <Select
              labelId="year-select-label"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, i) => 2024 - i).map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredSeasons.map((season, index) => (
          <Grid item xs={12} key={index}>
            <Card onClick={() => handleExpandClick(index)}>
              <CardContent>
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  {season.details?.csv_team_logo && (
                    <img
                      src={season.details.csv_team_logo}
                      alt={`${season.details.csv_team_logo} Logo`}
                      style={{ maxHeight: "100px", marginBottom: "8px" }}
                    />
                  )}
                  <Typography variant="h5">
                    {season.details?.fullName}
                  </Typography>
                  <Typography variant="body2">
                    Record: {calculateRecord(season.games)}
                  </Typography>
                </div>

                <Collapse
                  in={expandedIndex === index}
                  timeout="auto"
                  unmountOnExit
                >
                  <List>
                    {season.games.map((game) => (
                      <React.Fragment key={game.game_id}>
                        <ListItem button onClick={() => handleGameClick(game.game_id)}>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                          >
                            <Box flex={1} textAlign="left">
                              <img
                                src={cleanUrl(game.home_team_details?.csv_team_logo || "")}
                                alt="Home Team Logo"
                                style={{ maxHeight: "50px" }}
                              />
                              <Typography variant="body1" fontWeight="bold">
                                {game.home_team_details?.csv_team}
                              </Typography>
                              <Typography variant="body2">
                                {game.home_score ?? "-"}
                              </Typography>
                            </Box>

                            <Box flex={1} textAlign="center">
                              <Typography variant="h6" fontWeight="bold">
                                VS
                              </Typography>
                              <Typography variant="body2">
                                {new Date(game.game_date).toLocaleDateString()}
                              </Typography>
                            </Box>

                            <Box flex={1} textAlign="right">
                              <img
                                src={cleanUrl(game.visitor_team_details?.csv_team_logo || "")}
                                alt="Visitor Team Logo"
                                style={{ maxHeight: "50px" }}
                              />
                              <Typography variant="body1" fontWeight="bold">
                                {game.visitor_team_details?.csv_team}
                              </Typography>
                              <Typography variant="body2">
                                {game.visitor_score ?? "-"}
                              </Typography>
                            </Box>
                          </Box>
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

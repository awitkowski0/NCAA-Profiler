import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

export const GameComponent = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5">Game Summary for Game ID:</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="summary table">
                <TableHead>
                  <TableRow>
                    <TableCell>Stat Type</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Plays</Typography>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          Create Report
        </Button>
      </Grid>

      <Grid item xs={12}>
      </Grid>
    </Grid>
  );
};

export default GameComponent;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReportById, updateReport, deleteReport } from '../services/authService';
import { Report } from '../types/reports';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Container,
} from '@mui/material';

const ReportDetail = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Report>>({});

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const reportData = await getReportById(Number(reportId));
        setReport(reportData);
        setFormData(reportData); // Initialize form data with report data
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    };

    fetchReport();
  }, [reportId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async () => {
    try {
      if (report && report.id) {
        await updateReport(report.id, formData);
        setReport({ ...report, ...formData } as Report);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (report && report.id) {
        await deleteReport(report.id);
        navigate('/reports'); // Redirect back to reports list after deletion
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  if (!report) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Report Detail
        </Typography>
        {isEditing ? (
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Player ID"
                  name="player_id"
                  value={formData.player_id || ''}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Team ID"
                  name="team_id"
                  value={formData.team_id || ''}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Game ID"
                  name="game_id"
                  value={formData.game_id || ''}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Play ID"
                  name="play_id"
                  value={formData.play_id || ''}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Grade"
                  name="grade"
                  value={formData.grade || ''}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Summary"
                  name="summary"
                  multiline
                  rows={4}
                  value={formData.summary || ''}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  multiline
                  rows={4}
                  value={formData.notes || ''}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleEditToggle}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1"><strong>Player ID:</strong> {report.player_id}</Typography>
            <Typography variant="body1"><strong>Team ID:</strong> {report.team_id}</Typography>
            <Typography variant="body1"><strong>Game ID:</strong> {report.game_id}</Typography>
            <Typography variant="body1"><strong>Play ID:</strong> {report.play_id}</Typography>
            <Typography variant="body1"><strong>Grade:</strong> {report.grade}</Typography>
            <Typography variant="body1"><strong>Summary:</strong> {report.summary}</Typography>
            <Typography variant="body1"><strong>Notes:</strong> {report.notes}</Typography>
          </Box>
        )}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ReportDetail;

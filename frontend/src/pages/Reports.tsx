import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import { getReports } from '../services/authService';
import { Report } from '../types/reports';

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsData = await getReports();
        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>My Reports</h2>
      <List>
        {reports.map((report: Report) => (
          <ListItem 
            button 
            key={report.id} 
            component={NavLink} 
            to={`/reports/${report.id}`}
          >
            <ListItemText 
              primary={`Report ${report.id}`} 
              secondary={report.summary}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Reports;


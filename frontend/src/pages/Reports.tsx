import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, Box } from '@mui/material';

const Reports: React.FC = () => {
  const [reports, setReports] = useState<string[]>(['Report 1', 'Report 2']);

  const addReport = () => {
    const newReport = `Report ${reports.length + 1}`;
    setReports([...reports, newReport]);
  };

  return (
    <div>
      <h1>Reports</h1>
      <Box>
        <Button variant="contained" onClick={addReport}>Add Report</Button>
      </Box>
      <List>
        {reports.map((report, index) => (
          <ListItem button key={index}>
            <ListItemText primary={report} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Reports;

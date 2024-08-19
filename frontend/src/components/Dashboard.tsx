import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemText, Toolbar, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Home', 'Teams', 'Seasons', 'Reports'].map((text) => (
              <ListItem 
                button 
                key={text} 
                component={NavLink} 
                to={`/${text.toLowerCase()}`}
                sx={{ justifyContent: 'center' }} // Center the text within the ListItem
              >
                <ListItemText 
                  primary={text} 
                  sx={{ textAlign: 'center' }} // Center the text within ListItemText
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, padding: 3 }} // Remove marginLeft and add padding for spacing
      >
        <Container>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;

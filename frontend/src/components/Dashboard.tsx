import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemText, Toolbar, Container, Button } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { logout } from '../services/authService'; // Assuming you have a logout function
import { AuthContext } from '../context/AuthContext';

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    if (authContext) {
      authContext.logout();
    }
    logout(); // Clears tokens and logs the user out
    navigate('/');
  };

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
        <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
          <List>
            {['Home', 'Reports'].map((text) => (
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
        <Box sx={{ padding: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
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

import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';
import theme from '../theme';

const AuthPage: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext is undefined, make sure AuthProvider is used.');
    }

    const { login, register } = authContext;

    const handleAuthAction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoginMode) {
            await login(username, password);
        } else {
            await register(username, password);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        {isLoginMode ? 'Sign In' : 'Sign Up'}
                    </Typography>
                    <Box component="form" onSubmit={handleAuthAction} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoginMode ? 'Sign In' : 'Sign Up'}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Button
                                    onClick={() => setIsLoginMode(!isLoginMode)}
                                    variant="text"
                                    sx={{ textTransform: 'none' }}
                                >
                                    {isLoginMode
                                        ? "Don't have an account? Sign Up"
                                        : 'Already have an account? Sign In'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default AuthPage;
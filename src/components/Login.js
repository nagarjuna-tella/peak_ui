// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import formStyle from './FormStyle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login/', credentials);
            console.log(response.data);
            // Save the token, and redirect or show success message
            setSnackbarMessage('Login successful!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error(error);
            // Handle login errors
            setSnackbarMessage('Login failed. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return (
        <Box style={formStyle.container}>
            <Box style={formStyle.box}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        label="Username" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    <TextField 
                        label="Password" 
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined" 
                        fullWidth 
                        margin="normal"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" color="primary" variant="contained" fullWidth>
                        Login
                    </Button>
                    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert 
                            onClose={handleSnackbarClose} 
                            severity={snackbarSeverity} 
                            sx={{ width: '100%' }}
                        >
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </form>
            </Box>
        </Box>
    );
};

export default Login;

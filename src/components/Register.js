// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import formStyle from './FormStyle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Can be 'success', 'error', etc.


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/register/', userData);
            console.log(response.data);
            setUserData({ username: '', email: '', password: '' }); // Clear input fields
            setSnackbarMessage('Registration successful!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            // Redirect or other actions
        } catch (error) {
            console.error(error);
            setSnackbarMessage('Registration failed. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };    

    return (
        <Box style={formStyle.container}>
            <Box style={formStyle.box}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        label="Username" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                    />
                    <TextField 
                        label="Email" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <TextField 
                        label="Password" 
                        type={showPassword ? 'text' : 'password'} 
                        variant="outlined" 
                        fullWidth 
                        margin="normal"
                        name="password"
                        value={userData.password}
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
                        Register
                    </Button>
                    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </form>
            </Box>
        </Box>
    );
};

export default Register;

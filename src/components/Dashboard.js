// src/components/Dashboard.js

import React from 'react';
import { Box } from '@mui/material';

const Dashboard = () => {
    const username = localStorage.getItem('username'); // Retrieve username

    return (
        <Box height={'81vh'} justifyContent={'center'}>
            <div>
                <h1>Welcome to your Dashboard, {username}! </h1>
                {/* Add more dashboard content here */}
            </div>
        </Box>
    );
};

export default Dashboard;

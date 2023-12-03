// src/components/Footer.js

import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer = () => {
    return (
        <footer style={{ marginTop: 'auto', backgroundColor: '#f5f5f5', padding: '20px 0' }}>
            <Container maxWidth="sm">
                <Typography variant="body1">My Sticky Footer can be found here.</Typography>
            </Container>
        </footer>
    );
};

export default Footer;

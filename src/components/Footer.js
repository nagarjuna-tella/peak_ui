// src/components/Footer.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
// import { Link } from 'react-router-dom';

function Footer() {
    return (
        <Container component="footer" maxWidth={false} style={{ marginTop: 'auto', backgroundColor: '#f5f5f5', padding: '10px 0' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="textSecondary" style={{ flexGrow: 1, textAlign: 'center' }}>
                    Peak © {new Date().getFullYear()}
                </Typography>
                {/* <Link to="/aboutus" style={{ textDecoration: 'none', color: 'gray', fontSize: '0.875rem', cursor: 'pointer' }}>
                    About Us
                </Link> */}
            </Box>
        </Container>
    );
}

export default Footer;

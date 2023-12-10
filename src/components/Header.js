import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const isLoggedIn = !!localStorage.getItem('token');
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Clear username as well
        handleClose(); // Close the menu
        navigate('/login'); // Redirect to login or home page
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link}  to="/" sx={{ flexGrow: 1 }}>
                    Peak UI
                </Typography>
                {isLoggedIn && (
                    <Button color="inherit" component={Link} to="/dashboard">
                        Dashboard
                    </Button>
                )}
                {isLoggedIn && (
                    <Button color="inherit" component={Link} to="/chat">
                        Chat
                    </Button>
                )}
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        {!isLoggedIn ? (
                            <>
                                <MenuItem onClick={handleClose} component={Link} to="/login">Login</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to="/register">Register</MenuItem>
                            </>
                        ) : (
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        )}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

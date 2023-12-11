import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoIcon from '../assets/logo.png'; // Replace 'logo.png' with your icon's filename

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
        localStorage.removeItem('username');
        handleClose();
        navigate('/login');
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#034f84' }}>
            <Toolbar>
                <IconButton
                    component={Link}
                    to="/"
                    color="inherit"
                    aria-label="Home"
                >
                    <img src={LogoIcon} alt="Logo" height="50" width="auto" /> {/* Adjust the height as needed */}
                </IconButton>
                {isLoggedIn && (
                    <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                )}
                {isLoggedIn && (
                    <Button color="inherit" component={Link} to="/chat">Chat</Button>
                )}
                <div style={{ flexGrow: 1 }}></div> {/* This pushes the account icon to the right */}
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

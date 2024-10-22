// src/components/Layout/Header.js

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { IconButton, Drawer, List, ListItem, ListItemText, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const { isLoggedIn, mode, toggle} = useAuth();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/function-halls">
                    <ListItemText primary="Function Halls" />
                </ListItem>
                <ListItem button component={Link} to="/sports-facilities">
                    <ListItemText primary="Sports Facilities" />
                </ListItem>
                <ListItem button component={Link} to="/wellness-services">
                    <ListItemText primary="Wellness Services" />
                </ListItem>
                <ListItem button component={Link} to="/login">
                    <ListItemText primary={isLoggedIn ? "Profile" : "Login"} />
                </ListItem>
            </List>
        </div>
    );

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: mode === 'light' ? 'primary.main' : 'black' }}>
                <Toolbar>
                    {
                        isSmallScreen && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        )
                    }

                    <Typography variant="h6" sx={{ flexGrow: 1, color: mode === 'light' ? 'black' : 'white' }}>
                        My Booking App
                    </Typography>
                    
                    
                    
                    {/* Show buttons only on medium and larger screens */}
                    {!isSmallScreen && (
                        <>
                            <Button color="inherit" component={Link} to="/" sx={{ color: mode === 'light' ? 'black' : 'white' }} >
                                Home
                            </Button>
                            <Button color="inherit" component={Link} to="/function-halls" sx={{ color: mode === 'light' ? 'black' : 'white' }}>
                                Function Halls
                            </Button>
                            <Button color="inherit" component={Link} to="/sports-facilities" sx={{ color: mode === 'light' ? 'black' : 'white' }}>
                                Sports Facilities
                            </Button>
                            <Button color="inherit" component={Link} to="/wellness-services" sx={{ color: mode === 'light' ? 'black' : 'white' }}>
                                Wellness Services
                            </Button>
                            {isLoggedIn ? (
                                <IconButton color="inherit" component={Link} to="/login" sx={{ ml: 2 }}>
                                    <AccountCircleIcon />
                                </IconButton>
                            ) : (
                                <Button color="inherit" component={Link} to="/login" sx={{ ml: 2, color: mode === 'light' ? 'black' : 'white' }}>
                                    Login
                                </Button>
                            )}

                        </>
                    )}
                    {/* Theme Toggle Switch */}
                    <Switch checked={mode === 'dark'} onChange={toggle} />
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList()}
            </Drawer>
        </>
    );
};

export default Header;

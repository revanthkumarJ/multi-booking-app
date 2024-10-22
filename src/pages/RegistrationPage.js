// src/pages/LoginPage.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import textFieldStyles from "../styles"

const apiUrl = process.env.REACT_APP_API_URL;
const singnUpUrl = process.env.REACT_APP_SIGNUP_URL;

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const { mode } = useAuth();
    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password || !name || !mobile) {
            setError('Please fill in All fields');
            return;
        }

        try {
            const response = await axios.post(apiUrl + singnUpUrl, { email, password, name, mobile }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });


            if (response.status === 201) {
                setError('');
                navigate("/login");
            }
        } catch (error) {

            if (error.response && error.response.status === 400) {
                setError("Account already exists with this email");
            } else {

                setError('An unexpected error occurred. Please try again later.');
                console.error(error);
            }
        }

    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh', // Make it full height

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: mode === 'light' ? '#f5f5f5' : '#303030', // Light mode and dark mode colors
                color: mode === 'light' ? 'black' : 'white'
            }}
        >
            <Container component="main" maxWidth="xs" >
                <Typography component="h1" variant="h5" align="center">
                    SignUp
                </Typography>
                {error && <Typography color="error" align="center">{error}</Typography>}
                <form onSubmit={handleSignUp}>
                    <Box sx={{ mt: 2 }}>
                        <Stack spacing={2}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                sx={textFieldStyles(mode)}
                            />

                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                sx={textFieldStyles(mode)}
                            />
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                                sx={textFieldStyles(mode)}
                            />
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={textFieldStyles(mode)}
                            />
                            <Button type="submit" variant="contained" fullWidth>
                                SignUp
                            </Button>
                            <Typography align="center">
                                Already have an account?{' '}

                                <Link to="/login" style={{ fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>Log In</Link>

                            </Typography>

                        </Stack>
                    </Box>
                </form>
            </Container></Box>
    );
};

export default RegistrationPage;

// src/pages/LoginPage.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import textFieldStyles from "../styles"

const apiUrl = process.env.REACT_APP_API_URL;
const loginUrl = process.env.REACT_APP_LOGIN_URL;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, login, logout, mode } = useAuth();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setUser(user);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const response = await axios.post(apiUrl + loginUrl, { email, password }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      login(response.data.token, response.data.user);
      setError('');
      navigate("/home");

    } catch (error) {
      setError('Wrong Credentials');
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mode === 'light' ? '#f5f5f5' : '#303030', // Light mode and dark mode colors
        color: mode === 'light' ? 'black' : 'white' // Text color based on mode
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '400px' }}>
        <Typography component="h1" variant="h5" align="center">
          {isLoggedIn ? `Welcome, ${user.name}` : 'Login'}
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}

        {isLoggedIn ? (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ margin: '5px' }}>Email: {user.email}</Typography>
            <Typography variant="h6" sx={{ margin: '5px' }}>Mobile: {user.mobile}</Typography>
            <Button variant="contained" onClick={handleLogout}>
              Log Out
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleLogin}>
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
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={textFieldStyles(mode)}
                />
                <Button type="submit" variant="contained" fullWidth>
                  Login
                </Button>
                <Typography align="center">
                  Don't have an account? <Link to="/register" style={{ fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>Register</Link>
                </Typography>
              </Stack>
            </Box>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;

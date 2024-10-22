// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import FunctionHallsPage from './pages/FunctionHallsPage';
import SportsFacilitiesPage from './pages/SportsFacilitiesPage';
import WellnessServicesPage from './pages/WellnessServicesPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { AuthProvider } from './context/AuthContext';


const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/function-halls" element={<FunctionHallsPage/>} />
        <Route path="/sports-facilities" element={<SportsFacilitiesPage/>} />
        <Route path="/wellness-services" element={<WellnessServicesPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegistrationPage/>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;

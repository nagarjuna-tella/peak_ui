// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home'; // Assuming you have a Home component


const App = () => {
    return (
        <Router>
            <div className="appContainer">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
            </div>
        </Router>
    );
};

export default App;

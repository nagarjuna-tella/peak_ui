// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ChatScreen from './components/ChatScreen';


const App = () => {
    return (
        <Router>
            <div className="appContainer">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat" element={<ChatScreen />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
            </div>
        </Router>
    );
};

export default App;

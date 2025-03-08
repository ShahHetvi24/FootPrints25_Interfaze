// App.js - Main application component
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MeetingRoom from './components/MeetingRoom';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/meeting/:id" element={<MeetingRoom darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
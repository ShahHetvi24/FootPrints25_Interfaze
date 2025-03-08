import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MeetingRoom from "./components/MeetingRoom";
import "./App.css";
import preloaderGif from "../Assets/logo.gif"; // Adjust the path as needed

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark m-0" : "m-0"}>
      {loading ? (
        // Show GIF while loading
        <div className="flex justify-center items-center h-screen bg-white dark:bg-black overflow-hidden">
          <img src={preloaderGif} alt="Loading..." className="w-[145vw] h-[115vh] " />
        </div>
      ) : (
        <Router>
          <div className="w-screen m-0 transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                }
              />
              <Route
                path="/meeting/:id"
                element={
                  <MeetingRoom
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;

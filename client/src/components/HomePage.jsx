import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Particles from "./Particles";
import Threads from "./Threads";

const HomePage = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check if device has small screen (width < 468px)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 468);
    };
    
    // Initial check
    checkScreenSize();
    
    // Setup listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Define theme-based particle colors
  const lightModeParticleColors = [
    "#303030",
    "#505050",
    "#707070",
    "#909090",
    "#b0b0b0",
  ];
  const darkModeParticleColors = [
    "#ffffff",
    "#f0f0f0",
    "#d9d9d9",
    "#bfbfbf",
    "#8c8c8c",
  ];

  const createMeeting = () => {
    const randomId = Math.random().toString(36).substring(2, 10);
    navigate(`/meeting/${randomId}`);
  };

  const joinMeeting = () => {
    if (meetingId.trim()) {
      navigate(`/meeting/${meetingId}`);
    }
  };

  return (
    <div className="relative dark:bg-[var(--dark-bg-color)] bg-[var(--bg-color)] m-0 px-4 flex flex-col w-screen h-screen overflow-hidden z-10">
      {/* Orb Background - Only shown on larger screens */}
      {!isSmallScreen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1,
          }}
        >
          <Threads amplitude={2} distance={0} enableMouseInteraction={false} />
        </div>
      )}

      <header className={`${isSmallScreen ? 'py-4' : 'py-6'} flex justify-between items-center z-40`}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div className="flex items-center">
            <img 
              src="https://res.cloudinary.com/dqyqncjpd/image/upload/f_auto,q_auto/v1/Port/ldacprctyet4g5pgjl3u" 
              className={isSmallScreen ? "w-8" : "w-[8%]"} 
              alt="" 
            />
            <h1 className={`ml-1 ${isSmallScreen ? 'text-xl' : 'text-2xl'} font-bold text-gray-800 dark:text-white`}>
              Quick-meet
            </h1>
          </div>
        </motion.div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full transition-colors focus:outline-none cursor-pointer z-20"
        >
          {darkMode ? (
            <svg
              className={`${isSmallScreen ? 'h-5 w-5' : 'h-6 w-6'} text-yellow-300`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          ) : (
            <svg
              className={`${isSmallScreen ? 'h-5 w-5' : 'h-6 w-6'} text-gray-700`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              ></path>
            </svg>
          )}
        </button>
      </header>

      <main className={`flex-grow flex flex-col items-center justify-center ${isSmallScreen ? 'mt-0' : '-mt-20'} z-20`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className={`${isSmallScreen ? 'text-3xl mb-4' : 'text-4xl mb-6'} font-bold text-gray-800 dark:text-white`}>
            Welcome to <span className="font-sans">Quick-meet</span>
          </h2>
          <p className={`${isSmallScreen ? 'text-lg mb-8' : 'text-xl mb-12'} text-gray-600 dark:text-gray-300`}>
            Connect with teammates through simple, distraction-free video calls
          </p>

          <div className="space-y-4 md:space-y-0 md:flex md:space-x-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createMeeting}
              className={`w-full md:w-auto ${isSmallScreen ? 'px-6 py-3' : 'px-8 py-4'} bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              Create Meeting
            </motion.button>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Enter meeting ID"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className={`w-full md:w-64 ${isSmallScreen ? 'px-3 py-3' : 'px-4 py-4'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={joinMeeting}
                className={`w-full md:w-auto ${isSmallScreen ? 'px-6 py-3' : 'px-8 py-4'} bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400`}
              >
                Join Meeting
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className={`${isSmallScreen ? 'py-4 text-sm' : 'py-6'} text-center text-black dark:text-white`}>
        <p>© 2025 QuickMeet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
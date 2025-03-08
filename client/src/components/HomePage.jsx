import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Particles from "./Particles";
import Threads from "./Threads";

const HomePage = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState("");

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
      {/* Orb Background */}
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

      <header className="py-6 flex justify-between items-center z-40">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div className="flex items-center">
            <svg
              className="h-10 w-10 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              ></path>
            </svg>
            <h1 className="ml-2 text-2xl font-bold text-gray-800 dark:text-white">
              QuickMeet
            </h1>
          </div>
        </motion.div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full z-50 transition-colors focus:outline-none cursor-pointer z-20"
        >
          {darkMode ? (
            <svg
              className="h-6 w-6 text-yellow-300"
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
              className="h-6 w-6 text-gray-700"
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

      <main className="flex-grow flex flex-col items-center justify-center -mt-20 z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            Welcome to QuickMeet
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Connect with teammates through simple, distraction-free video calls
          </p>

          <div className="space-y-4 md:space-y-0 md:flex md:space-x-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createMeeting}
              className="w-full md:w-auto px-8 py-4 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="w-full md:w-64 px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={joinMeeting}
                className="w-full md:w-auto px-8 py-4 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Join Meeting
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="py-6 text-center text-black dark:text-white">
        <p>© 2025 QuickMeet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

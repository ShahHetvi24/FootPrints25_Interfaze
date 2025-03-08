import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Fake participants data
const generateParticipants = () => {
  const names = [
    "Alex Kim",
    "Taylor Smith",
    "Jordan Lee",
    "Casey Johnson",
    "Morgan Williams",
  ];
  return Array(4)
    .fill()
    .map((_, i) => ({
      id: i + 1,
      name: names[i],
      isMuted: Math.random() > 0.5,
      isVideoOff: Math.random() > 0.7,
      initials: names[i]
        .split(" ")
        .map((n) => n[0])
        .join(""),
    }));
};

const MeetingRoom = ({ darkMode, toggleDarkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [participants, setParticipants] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [layout, setLayout] = useState("grid"); // 'grid' or 'focus'
  const [showControls, setShowControls] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Simulate loading participants
    const simulatedParticipants = generateParticipants();
    setParticipants(simulatedParticipants);

    // Hide controls after 5 seconds of inactivity
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 5000);

    // Check if screen width is less than 468px
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 468);
    };

    // Initial check
    checkScreenSize();

    // Listen for window resize events
    window.addEventListener("resize", checkScreenSize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);

    // Reset the timer
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 5000);

    return () => clearTimeout(timer);
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);
  const toggleLayout = () => setLayout(layout === "grid" ? "focus" : "grid");
  const toggleChat = () => setShowChat(!showChat);

  const endCall = () => {
    navigate("/");
  };

  // Participant video component
  const ParticipantVideo = ({
    participant,
    isLocal = false,
    isFocused = false,
  }) => (
    <motion.div
      className={`relative rounded-lg overflow-hidden ${
        isFocused ? "col-span-2 row-span-2 w-full h-full max-h-screen" : ""
      }`}
    >
      {participant.isVideoOff ? (
        <div className="bg-gray-700 dark:bg-gray-500 w-full h-full flex items-center justify-center">
          <div className={`${isFocused ? "w-24 h-24" : "w-16 h-16"} ${isMobile ? "w-12 h-12" : ""} rounded-full bg-blue-500 flex items-center justify-center`}>
            <span className={`text-white ${isFocused ? "text-3xl" : "text-xl"} ${isMobile ? "text-lg" : ""} font-medium`}>
              {participant.initials}
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 w-full h-full relative">
          {/* Fake video placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <span className={`text-white opacity-50 ${isFocused ? "text-2xl" : ""} ${isMobile ? "text-sm" : ""}`}>
              {isLocal ? "You" : participant.name}
            </span>
          </div>
        </div>
      )}

      <div className={`absolute bottom-2 left-2 flex items-center space-x-2 bg-black bg-opacity-50 px-2 py-1 rounded-md ${
        isFocused ? "text-lg px-3 py-2" : ""
      } ${isMobile ? "px-1 py-0.5" : ""}`}>
        <span className={`text-white ${isFocused ? "text-base" : "text-sm"} ${isMobile ? "text-xs" : ""}`}>
          {isLocal ? "You" : participant.name}
        </span>
        {participant.isMuted && (
          <svg
            className={`${isFocused ? "h-5 w-5" : "h-4 w-4"} ${isMobile ? "h-3 w-3" : ""} text-red-500`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            ></path>
          </svg>
        )}
      </div>
    </motion.div>
  );

  // Mobile bottom controls
  const MobileControls = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: showControls ? 1 : 0,
        y: showControls ? 0 : 20,
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-20 bg-black bg-opacity-70 p-2"
    >
      <div className="flex justify-around items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className={`p-2 rounded-full focus:outline-none ${
            isMuted ? "bg-red-500 text-white" : "bg-gray-700 text-white"
          }`}
        >
          {isMuted ? (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              ></path>
            </svg>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleVideo}
          className={`p-2 rounded-full focus:outline-none ${
            isVideoOff ? "bg-red-500 text-white" : "bg-gray-700 text-white"
          }`}
        >
          {isVideoOff ? (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3l18 18"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleScreenShare}
          className={`p-2 rounded-full focus:outline-none ${
            isScreenSharing
              ? "bg-green-500 text-white"
              : "bg-gray-700 text-white"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleLayout}
          className="p-2 rounded-full bg-gray-700 text-white focus:outline-none"
        >
          {layout === "grid" ? (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChat}
          className={`p-2 rounded-full focus:outline-none ${
            showChat ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={endCall}
          className="p-2 rounded-full bg-red-600 text-white focus:outline-none"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
            ></path>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div
      className="h-screen w-full relative bg-[var(--bg-color)] dark:bg-[var(--dark-bg-color)] flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Meeting information */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: showControls ? 1 : 0,
          y: showControls ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 right-0 p-2 sm:p-4 z-10 bg-gradient-to-b from-black to-transparent"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://res.cloudinary.com/dqyqncjpd/image/upload/f_auto,q_auto/v1/Port/ldacprctyet4g5pgjl3u" className={`${isMobile ? "w-6" : "w-8"} sm:w-[8%]`} alt="" />
            <h1 className="ml-1 sm:ml-2 text-sm sm:text-lg font-bold text-white">Quick-meet</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-gray-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md">
              <span className="text-gray-300 text-xs sm:text-sm">ID: {id}</span>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-1 sm:p-2 rounded-full transition-colors focus:outline-none"
            >
              {darkMode ? (
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300"
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
                  className="h-4 w-4 sm:h-5 sm:w-5 text-white"
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
          </div>
        </div>
      </motion.div>

      {/* Participants info (moved from the bottom) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: showControls ? 1 : 0,
          y: showControls ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-12 sm:top-16 right-2 sm:right-4 z-10"
      >
        <div className="bg-gray-800 bg-opacity-80 rounded-lg px-1 sm:px-2 py-0.5 sm:py-1 flex items-center">
          <span className="text-white text-xs px-1 sm:px-2">
            {participants.length + 1} participants
          </span>
          <div className="h-3 sm:h-4 border-r border-gray-600 mx-0.5 sm:mx-1"></div>
          <span className="text-white text-xs px-1 sm:px-2">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </motion.div>

      {/* Video grid */}
      <div className="flex-grow overflow-hidden flex items-center justify-center pb-14 sm:pb-0">
        <div
          className={`w-full h-full p-2 sm:p-4 ${
            layout === "grid"
              ? "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4"
              : "flex justify-center items-center"
          }`}
        >
          {/* Local participant (you) */}
          <ParticipantVideo
            participant={{
              id: "local",
              name: "You",
              isMuted: isMuted,
              isVideoOff: isVideoOff,
              initials: "YO",
            }}
            isLocal={true}
            isFocused={layout === "focus"}
          />

          {/* Remote participants */}
          {layout === "grid" &&
            participants.map((participant) => (
              <ParticipantVideo
                key={participant.id}
                participant={participant}
              />
            ))}
        </div>
      </div>

      {/* Controls - show vertical for desktop, bottom for mobile */}
      {isMobile ? (
        <MobileControls />
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{
            opacity: showControls ? 1 : 0,
            x: showControls ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
          className="fixed top-1/4 right-4 transform -translate-y-1/2 z-20 flex flex-col items-center space-y-4 bg-black bg-opacity-50 rounded-lg p-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className={`p-3 rounded-full focus:outline-none ${
              isMuted ? "bg-red-500 text-white" : "bg-gray-700 text-white"
            }`}
          >
            {isMuted ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                ></path>
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleVideo}
            className={`p-3 rounded-full focus:outline-none ${
              isVideoOff ? "bg-red-500 text-white" : "bg-gray-700 text-white"
            }`}
          >
            {isVideoOff ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3l18 18"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleScreenShare}
            className={`p-3 rounded-full focus:outline-none ${
              isScreenSharing
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleLayout}
            className="p-3 rounded-full bg-gray-700 text-white focus:outline-none"
          >
            {layout === "grid" ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className={`p-3 rounded-full focus:outline-none ${
              showChat ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
            }`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={endCall}
            className="p-3 rounded-full bg-red-600 text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
              ></path>
            </svg>
          </motion.button>
        </motion.div>
      )}

      {/* Chat sidebar */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg overflow-hidden z-30 ${
              isMobile ? "w-full" : "w-80"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-medium dark:text-white">Chat</h2>
                <button
                  onClick={toggleChat}
                  className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-4">
                <div className="space-y-3">
                  {/* Sample messages - would be replaced with actual messages */}
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900 rounded-lg px-3 py-2 max-w-[80%]">
                        <p className="text-sm dark:text-white">
                          Hi everyone, can you all hear me?
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      You - 10:45 AM
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-start">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 max-w-[80%]">
                        <p className="text-sm dark:text-white">
                          Yes, loud and clear!
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      Alex Kim - 10:46 AM
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-start">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 max-w-[80%]">
                        <p className="text-sm dark:text-white">
                          I'm having some audio issues, give me a minute.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      Taylor Smith - 10:47 AM
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t dark:border-gray-700">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MeetingRoom;
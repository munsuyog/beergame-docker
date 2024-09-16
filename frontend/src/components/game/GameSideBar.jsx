import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameSideTab from "./GameSideTab";
import { FaBars, FaTimes } from "react-icons/fa";

const GameSideBar = ({
  isExpanded,
  setIsExpanded,
  setSelectedTab,
  selectedTab,
  showStatistics,
  handleShowStatistics
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const updateIsLargeScreen = () => {
    if (window.innerWidth >= 1024) {
      setIsLargeScreen(true);
    } else {
      setIsLargeScreen(isExpanded);
    }
  };

  useEffect(() => {
    updateIsLargeScreen();
    window.addEventListener("resize", updateIsLargeScreen);
    return () => window.removeEventListener("resize", updateIsLargeScreen);
  }, [isExpanded]);

  return (
    <motion.div
      className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-40 
        ${isExpanded ? "lg:w-[20%] md:w-[40%] w-full" : "lg:w-[20%] md:w-[10%] w-[20%]"}
        bg-white border-r border-gray-200 shadow-md`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {!isLargeScreen && (
          <motion.button
            className="absolute top-4 right-4 text-gray-600 hover:text-[#e86234] transition-colors duration-200"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isExpanded ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        )}
      </AnimatePresence>

      <div className="p-4 w-full h-full flex flex-col">
        <motion.div 
          className="h-full w-full flex flex-col justify-start items-center space-y-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GameSideTab
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
            isExpanded={isExpanded}
            isLargeScreen={isLargeScreen}
            handleShowStatistics={handleShowStatistics}
          />
        </motion.div>
      </div>

      {isExpanded && (
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          © 2023 BeerGame
        </motion.div>
      )}
    </motion.div>
  );
};

export default GameSideBar;
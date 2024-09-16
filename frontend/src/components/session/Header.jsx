import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsQrCode } from "react-icons/bs";
import { FaStar, FaUsers, FaUserFriends, FaCopy } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const Header = ({ active, setActive, openSettings, noButton }) => {
  const { currentSession } = useSelector((state) => state.game);
  const { sessionId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/lobby/${sessionId}`);
    toast.success("Link copied to clipboard!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (!currentSession) return null;

  const tabs = [
    { id: 1, name: "Lobby", icon: FaUsers },
    { id: 2, name: "Follow-up", icon: FaUserFriends },
    { id: 3, name: "Results", icon: FaStar },
    { id: 4, name: "Settings", icon: MdSettings },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-b from-[#fff5f1] to-white border-b border-gray-200"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white p-2 rounded-lg shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md"
              onClick={toggleModal}
            >
              <BsQrCode className="w-8 h-8 text-[#e86234]" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{currentSession.name}</h1>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-[#fff5f1] text-[#e86234] rounded-full text-xs font-medium">
                  <FaUsers className="inline mr-1" /> {currentSession.num_teams} Teams
                </span>
                <span className="px-2 py-1 bg-[#fff5f1] text-[#e86234] rounded-full text-xs font-medium">
                  <FaUserFriends className="inline mr-1" /> 4 Player Game
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {!noButton && (
          <div className="flex justify-center mt-4">
            <div className="inline-flex bg-white rounded-lg shadow-sm">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActive(tab.id)}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                    active === tab.id
                      ? "bg-[#fff5f1] text-[#e86234]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="mr-2" />
                  {tab.name}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
            onClick={toggleModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-3 text-gray-800">Lobby Link</h2>
              <p className="mb-3 text-gray-600 text-sm">
                Share this link to join the lobby:
              </p>
              <div className="bg-gray-50 p-3 rounded-md mb-4 flex items-center justify-between">
                <a
                  href={`/lobby/${sessionId}`}
                  className="text-[#e86234] hover:underline break-all mr-2 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${window.location.origin}/lobby/${sessionId}`}
                </a>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={copyToClipboard}
                  className="bg-[#e86234] text-white p-2 rounded-full hover:bg-[#d55729] transition-colors duration-200"
                >
                  <FaCopy />
                </motion.button>
              </div>
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleModal}
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
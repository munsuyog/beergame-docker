import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSession, getSessions } from "../../store/reducers/gameSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUsers, FaUserFriends } from "react-icons/fa";

const CreateSessionModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [sessionName, setSessionName] = useState("");
  const [teams, setTeams] = useState(20);
  const [playersPerTeam, setPlayersPerTeam] = useState(4);
  const user = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedSessionName = sessionName.replace(/\s+/g, "");
    dispatch(createSession({
      name: cleanedSessionName,
      userId: user.user.email, // Replace with actual user ID
      teams,
      playersPerTeam
    }));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center px-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white w-full max-w-md rounded-lg shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#e86234] transition-colors duration-200"
            >
              <FaTimes size={24} />
            </button>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Session</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="sessionName" className="block text-sm font-medium text-gray-700 mb-1">
                    Session Name (No spaces allowed)
                  </label>
                  <input
                    type="text"
                    id="sessionName"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                    placeholder="Enter session name"
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e86234] transition-all duration-200"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="teams" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Teams
                  </label>
                  <div className="relative">
                    <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      id="teams"
                      value={teams}
                      onChange={(e) => setTeams(parseInt(e.target.value))}
                      min="1"
                      className="w-full pl-10 pr-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e86234] transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="playersPerTeam" className="block text-sm font-medium text-gray-700 mb-1">
                    Players per Team
                  </label>
                  <div className="relative">
                    <FaUserFriends className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      id="playersPerTeam"
                      value={playersPerTeam}
                      onChange={(e) => setPlayersPerTeam(parseInt(e.target.value))}
                      min="1"
                      className="w-full pl-10 pr-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e86234] transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#e86234] rounded-md hover:bg-[#d55729] focus:outline-none focus:ring-2 focus:ring-[#e86234] transition-all duration-200"
                  >
                    Create Session
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateSessionModal;
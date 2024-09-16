import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdSearch, IoMdArrowDropdown } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import SessionCards from "../components/dashboard/SessionCards";
import { getSessions, createSession } from "../store/reducers/gameSlice";
import CreateSessionModal from "../components/dashboard/CreateSessionModal";
import { LoadingContext } from "../contexts/LoadingContext";

const Sessions = () => {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.game.sessions);
  const loading = useSelector((state) => state.game.loading);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Sessions");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (loading) {
      startLoading();
    } else {
      stopLoading();
      dispatch(getSessions());
    }
  }, [loading, dispatch, startLoading, stopLoading]);

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateSession = (sessionData) => {
    dispatch(createSession(sessionData));
    closeModal();
  };

  const filteredSessions = sessions.filter((session) =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Sessions</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={openModal}
        >
          <GoPlus className="mr-2" />
          Create Session
        </motion.button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search sessions"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative w-full md:w-64">
          <button
            onClick={handleDropdownToggle}
            className="w-full text-left bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedOption}
            <IoMdArrowDropdown className={`transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10"
              >
                <ul>
                  {["All Sessions", "Active", "Archived"].map((option) => (
                    <li
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SessionCards sessions={filteredSessions} />

      <CreateSessionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleCreateSession}
      />
    </motion.div>
  );
};

export default Sessions;
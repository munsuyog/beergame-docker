import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaCog, FaUsers, FaChartBar } from "react-icons/fa";
import { IoIosArrowRoundDown } from "react-icons/io";
import Header from "./Header";
import Round1 from "./Round1";
import {
  getSession,
  getSessionStatus,
  getSessionTeams,
  getLobbyRolesStatus,
} from "../../store/reducers/gameSlice";
import TeamCard from "./TeamCard";
import GameSetup from "../settings/Settings";
import Modal from "react-modal";
import Results from "./Results/Results";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#e86234]"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center h-screen">
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto text-center shadow-lg"
      role="alert"
    >
      <strong className="font-bold">Error:</strong>
      <span className="block mt-1">{message}</span>
    </div>
  </div>
);

const Session = () => {
  const [active, setActive] = useState(2);
  const dispatch = useDispatch();
  const { sessionId } = useParams();
  const currentSession = useSelector((state) => state.game.currentSession);
  const sessionStatus = useSelector((state) => state.game.sessionStatus);
  const sessionTeams = useSelector((state) => state.game.sessionTeams);
  const lobbyRolesStatus = useSelector((state) => state.game.lobbyRolesStatus);
  const [settings, setSettings] = useState(false);
  const loading = useSelector((state) => state.game.loading);
  const error = useSelector((state) => state.game.error);

  const openSettings = () => setSettings(true);
  const closeSettings = () => setSettings(false);

  useEffect(() => {
    if (sessionId) {
      dispatch(getSession(sessionId));
      dispatch(getSessionTeams(sessionId));
    }
  }, [dispatch, sessionId]);

  useEffect(() => {
    if (currentSession) {
      dispatch(getSessionStatus(sessionId));
      dispatch(getLobbyRolesStatus(sessionId));
    }
  }, [dispatch, currentSession]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!currentSession) return <ErrorMessage message="No session data available" />;

  const tabContent = {
    1: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {lobbyRolesStatus &&
          Object.keys(lobbyRolesStatus).map((teamName) => (
            <TeamCard
              key={teamName}
              teamName={teamName}
              roles={lobbyRolesStatus[teamName].map((roleStatus) => roleStatus)}
              selectedRoles={lobbyRolesStatus[teamName]
                .filter((roleStatus) => roleStatus.taken)
                .map((roleStatus) => roleStatus.role)}
            />
          ))}
      </motion.div>
    ),
    2: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-center mt-8 mb-12">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#e86234] text-[#e86234] bg-[#fff5f1] shadow-md hover:bg-[#ffe9e1] transition-all duration-200 font-medium">
              <FaPlay className="text-sm" /> Game Instructions
            </p>
            <IoIosArrowRoundDown className="text-7xl w-full mx-auto text-[#e86234] animate-bounce mt-4" />
          </div>
        </div>
        <Round1
          sessionData={currentSession}
          status={sessionStatus}
          teams={sessionTeams.games}
        />
      </motion.div>
    ),
    3: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mt-8"
      >
        <Results />
      </motion.div>
    ),
    4: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full flex justify-center mt-8"
      >
        <GameSetup />
      </motion.div>
    ),
  };

  return (
    <div className="container mx-auto px-4 py-8 w-full max-w-7xl">
      <Header
        active={active}
        setActive={setActive}
        openSettings={openSettings}
      />
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <div className="py-2">
          {tabContent[active]}

          </div>
        </AnimatePresence>
      </div>
      <Modal
        isOpen={settings}
        onRequestClose={closeSettings}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Session Settings"
      >
        <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Session Settings</h2>
          <GameSetup />
          <button
            onClick={closeSettings}
            className="mt-8 px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Session;
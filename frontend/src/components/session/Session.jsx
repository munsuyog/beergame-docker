import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaCog,
  FaUsers,
  FaChartBar,
  FaUserPlus,
  FaRandom,
  FaUserCog,
} from "react-icons/fa";
import { IoIosArrowRoundDown } from "react-icons/io";
import Header from "./Header";
import Round1 from "./Round1";
import {
  getSession,
  getSessionStatus,
  getSessionTeams,
  getLobbyRolesStatus,
  getWaitingPlayers,
  assignRoles,
  assignRandomRoles,
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

const CustomAlert = ({ type, title, message }) => (
  <div
    className={`p-4 mb-4 rounded-md ${
      type === "error"
        ? "bg-red-100 text-red-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p>{message}</p>
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
  const waitingPlayers = useSelector((state) => state.game.waitingPlayers);
  const [settings, setSettings] = useState(false);
  const loading = useSelector((state) => state.game.loading);
  const error = useSelector((state) => state.game.error);
  const [customAssignments, setCustomAssignments] = useState({});
  const [alert, setAlert] = useState(null);
  const openSettings = () => setSettings(true);
  const closeSettings = () => setSettings(false);

  useEffect(() => {
    if (sessionId) {
      dispatch(getSession(sessionId));
      dispatch(getSessionTeams(sessionId));
      dispatch(getWaitingPlayers(sessionId));
    }
  }, [dispatch, sessionId]);

  useEffect(() => {
    if (currentSession) {
      dispatch(getSessionStatus(sessionId));
      dispatch(getLobbyRolesStatus(sessionId));
    }
  }, [dispatch, currentSession, sessionId]);

  const handleAssignRoles = () => {
    if (Object.keys(customAssignments).length === 0) {
      setAlert({
        type: "error",
        title: "Error",
        message: "Please assign roles to players before submitting.",
      });
      return;
    }
    dispatch(assignRoles({ sessionId, assignments: customAssignments }))
      .unwrap()
      .then(() => {
        setAlert({
          type: "success",
          title: "Success",
          message: "Roles assigned successfully!",
        });
        dispatch(getWaitingPlayers(sessionId));
        dispatch(getLobbyRolesStatus(sessionId));
      })
      .catch((error) => {
        setAlert({
          type: "error",
          title: "Error",
          message: `Error assigning roles: ${error.message}`,
        });
      });
  };

  const handleAssignRandomRoles = () => {
    dispatch(assignRandomRoles(sessionId))
      .unwrap()
      .then(() => {
        setAlert({
          type: "success",
          title: "Success",
          message: "Roles assigned randomly successfully!",
        });
        dispatch(getWaitingPlayers(sessionId));
        dispatch(getLobbyRolesStatus(sessionId));
      })
      .catch((error) => {
        setAlert({
          type: "error",
          title: "Error",
          message: `Error assigning random roles: ${error.message}`,
        });
      });
  };

  const handleCustomAssignment = (playerId, field, value) => {
    setCustomAssignments((prev) => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [field]: value,
      },
    }));
  };

  const renderTeamCards = () => {
    if (!lobbyRolesStatus) return null;

    return Object.entries(lobbyRolesStatus).map(([teamName, roles]) => {
      if (!Array.isArray(roles)) {
        console.warn(`Roles for ${teamName} is not an array:`, roles);
        return null;
      }

      return (
        <TeamCard
          key={teamName}
          teamName={teamName}
          roles={roles}
          selectedRoles={roles
            .filter((role) => role.taken)
            .map((role) => role.role)}
        />
      );
    });
  };

  const renderCustomAssignment = () => {
    const allRoles = lobbyRolesStatus
      ? Object.values(lobbyRolesStatus).flatMap((teamRoles) =>
          Object.values(teamRoles).map((role) => role.role)
        )
      : [];
    const uniqueRoles = [...new Set(allRoles)];

    return (
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-4">Manual Assignment</h4>
        {waitingPlayers &&
        waitingPlayers.waiting_players &&
        waitingPlayers.waiting_players.length > 0 &&
        !currentSession.roles_assigned ? (
          <div className="space-y-4">
            {waitingPlayers.waiting_players.map((player) => (
              <div
                key={player.uid}
                className="flex flex-col space-y-2 bg-gray-50 p-4 rounded-md"
              >
                <span className="font-medium text-gray-700">{player.name}</span>
                <div className="flex space-x-2">
                  <select
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={customAssignments[player.uid]?.team || ""}
                    onChange={(e) =>
                      handleCustomAssignment(player.uid, "team", e.target.value)
                    }
                  >
                    <option value="">Select Team</option>
                    {sessionTeams &&
                      sessionTeams.games &&
                      sessionTeams.games.map((game) => (
                        <option key={game.team_name} value={game.team_name}>
                          {game.team_name}
                        </option>
                      ))}
                  </select>
                  <select
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={customAssignments[player.uid]?.role || ""}
                    onChange={(e) =>
                      handleCustomAssignment(player.uid, "role", e.target.value)
                    }
                  >
                    <option value="">Select Role</option>
                    {uniqueRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            All players are assigned and the game has started.
          </p>
        )}
        <button
          onClick={handleAssignRoles}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
        >
          <FaUserCog className="mr-2" />
          Assign Custom Roles
        </button>
      </div>
    );
  };

  const renderLobbyManagement = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Game Lobby Management
      </h2>
      {alert && (
        <CustomAlert
          type={alert.type}
          title={alert.title}
          message={alert.message}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaUsers className="mr-2 text-blue-500" />
            Waiting Players
          </h3>
          {waitingPlayers &&
          waitingPlayers.waiting_players &&
          waitingPlayers.waiting_players.length > 0 ? (
            <div>
              Players waiting: {waitingPlayers.waiting_players.length}
              <ul className="space-y-2">
                {waitingPlayers.waiting_players.map((player) => (
                  <li
                    key={player.uid}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                  >
                    <span className="font-medium">{player.name}</span>
                    <span className="text-sm text-gray-500">
                      UID: {player.uid}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">No players waiting in the lobby.</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaUserPlus className="mr-2 text-green-500" />
            Role Assignment
          </h3>
          {waitingPlayers &&
          waitingPlayers.waiting_players &&
          waitingPlayers.waiting_players.length > 0 ? (
            <>
              <button
                onClick={handleAssignRandomRoles}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
              >
                <FaRandom className="mr-2" />
                Assign Random Roles
              </button>
              {renderCustomAssignment()}
            </>
          ) : (
            <div className="text-gray-600">
              All players have been assigned roles.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <CustomAlert type="error" title="Error" message={error} />;
  if (!currentSession)
    return (
      <CustomAlert
        type="error"
        title="Error"
        message="No session data available"
      />
    );

  const tabContent = {
    1: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {renderTeamCards()}
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
    5: renderLobbyManagement(),
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
          <div className="py-2">{tabContent[active]}</div>
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
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Session Settings
          </h2>
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

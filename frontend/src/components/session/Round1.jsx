import React, { useState } from "react";
import { MdOutlineZoomInMap, MdOutlineZoomOutMap } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const Round1 = ({ sessionData, status, teams }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!sessionData) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          className="w-16 h-16 border-t-4 border-[#e86234] border-solid rounded-full animate-spin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={`border w-full ${isExpanded ? 'lg:w-full' : 'lg:w-[80%]'} mx-auto rounded-lg border-gray-300 shadow-lg bg-white transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header
        className="p-6 border-b border-gray-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            className="flex flex-col items-start gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <h2 className="font-bold text-2xl text-gray-800">Beer Game</h2>
            <p className="text-sm text-gray-500">Session: {sessionData.name}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer"
          >
            {isExpanded ? (
              <MdOutlineZoomOutMap className="text-2xl text-gray-500 hover:text-[#e86234]" />
            ) : (
              <MdOutlineZoomInMap className="text-2xl text-gray-500 hover:text-[#e86234]" />
            )}
          </motion.div>
        </div>
      </motion.header>
      <AnimatePresence>
        {teams && teams.length > 0 ? (
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Table teams={teams} />
          </motion.div>
        ) : (
          <motion.div
            className="p-6 text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg">No teams have joined yet. Waiting for participants...</p>
            <motion.div 
              className="mt-4 inline-block"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-8 h-8 text-[#e86234]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Table = ({ teams }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const navigate = useNavigate();
  const {sessionId} = useParams();


  const sortedTeams = React.useMemo(() => {
    let sortableTeams = [...teams];
    if (sortConfig.key !== null) {
      sortableTeams.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTeams;
  }, [teams, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            {['Team Name', 'Status', 'Players', 'Orders', 'Cost', ''].map((header) => (
              <th 
                key={header} 
                scope="col" 
                className="px-6 py-3 cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort(header.toLowerCase().replace(' ', '_'))}
              >
                <div className="flex items-center">
                  {header}
                  <span className="ml-1">{getSortIcon(header.toLowerCase().replace(' ', '_'))}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {sortedTeams.map((team, index) => (
              <motion.tr
                key={team.id || index}
                className="bg-white border-b hover:bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="px-6 py-4 font-medium text-gray-900">{team.team_name || 'Unnamed Team'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    team.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {team.status || 'Unknown'}
                  </span>
                </td>
                <td className="px-6 py-4">{team.players || 0}</td>
                <td className="px-6 py-4">{team.orders || 0}</td>
                <td className="px-6 py-4 font-medium text-[#e86234]">${team.cost || 0}</td>
                <td className="px-6 py-4">
                  <button onClick={() => navigate(`/session/${sessionId}/settings/${team.team_name}`)}>Settings</button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default Round1;
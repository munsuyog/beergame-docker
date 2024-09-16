import React from "react";
import { GoDotFill } from "react-icons/go";
import { motion } from "framer-motion";

const Table = ({ teams }) => {
  console.log("Teams received in Table component:", teams);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[95%] ml-auto mr-auto">
      <motion.table
        className="w-full text-sm text-gray-700 text-center border-collapse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">Team Name</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Players</th>
            <th scope="col" className="px-6 py-3">Orders</th>
            <th scope="col" className="px-6 py-3">Cost</th>
          </tr>
        </thead>
        <motion.tbody>
          {teams.map((team, index) => (
            <motion.tr
              key={team.id || index}
              className="bg-white border-b hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {team.team_name || 'Unnamed Team'}
              </td>
              <td className="px-6 py-4 flex items-center justify-center text-teal-500 gap-1">
                <GoDotFill /> {team.status || 'Unknown'}
              </td>
              <td className="px-6 py-4">{team.players || 0}</td>
              <td className="px-6 py-4">{team.orders || 0}</td>
              <td className="px-6 py-4 text-teal-600">{team.cost || 0}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </motion.table>
    </div>
  );
};

export default Table;

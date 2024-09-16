import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';

const TeamCard = ({ teamName, roles }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm p-6 w-full max-w-sm mx-auto border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="mb-4 text-xl font-semibold text-gray-800 text-center">{teamName}</h3>
      <p className='text-center text-gray-600 mb-4'>Join as:</p>
      <div className="space-y-3">
        {roles.map((role, index) => {
          if(role.role === 'Consumer') return null;
          
          return(
            <motion.button
              key={index}
              onClick={() => navigate(`/game/${teamName}/${role.role}`)}
              disabled={role.taken}
              className={`w-full py-3 px-4 rounded-lg text-center flex items-center justify-center transition-all ${
                role.taken
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md'
              }`}
              whileHover={!role.taken ? { scale: 1.03 } : {}}
              whileTap={!role.taken ? { scale: 0.98 } : {}}
            >
              {role.taken ? (
                <FaLock className="mr-2" />
              ) : (
                <FaUser className="mr-2" />
              )}
              <span className="font-medium">
                {role.taken ? `${role.role} (Taken)` : role.role}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TeamCard;

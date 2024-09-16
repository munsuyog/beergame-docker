import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getGameStatus } from '../store/reducers/gameSlice';
import TeamPerformance from '../components/game/Stats/TeamPerformance';
import IndividualPerformance from '../components/game/Stats/IndividualPerformance';
import SupplyChainEvolutionChart from '../components/game/Stats/SupplyChain';
import ResponseToDemandChart from '../components/game/Stats/DemandGraph';
import VariabilityAndLeadTimes from '../components/game/Stats/VariabilityLeadTime';
import DownloadExcelButton from '../components/game/Stats/DownloadButton';
import { FaChartBar, FaSpinner } from 'react-icons/fa';

const GameStats = () => {
  const dispatch = useDispatch();
  const { gameStatus, loading } = useSelector((state) => state.game);
  const { gameId } = useParams();
  const [activeTab, setActiveTab] = useState('team');

  useEffect(() => {
    dispatch(getGameStatus({ gameId }));
  }, [dispatch, gameId]);

  const tabs = [
    { id: 'team', label: 'Team Performance' },
    { id: 'individual', label: 'Individual Performance' },
    { id: 'supply', label: 'Supply Chain Evolution' },
    { id: 'demand', label: 'Response to Demand' },
    { id: 'variability', label: 'Variability & Lead Times' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Game Performance Dashboard</h1>
          <p className="text-gray-600">Analyze your team's performance and supply chain metrics</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <FaChartBar className="text-blue-500 mr-2" size={24} />
              <h2 className="text-xl font-semibold">Game Statistics</h2>
            </div>
            <DownloadExcelButton gameStatus={gameStatus} />
          </div>

          <div className="mb-6">
            <nav className="flex space-x-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-64"
              >
                <FaSpinner className="animate-spin text-blue-500" size={48} />
              </motion.div>
            ) : !gameStatus ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-red-500"
              >
                Error loading game status. Please try again.
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {activeTab === 'team' && <TeamPerformance gameStatus={gameStatus} />}
                {activeTab === 'individual' && <IndividualPerformance gameStatus={gameStatus} />}
                {activeTab === 'supply' && <SupplyChainEvolutionChart gameStatus={gameStatus} />}
                {activeTab === 'demand' && <ResponseToDemandChart gameStatus={gameStatus} />}
                {activeTab === 'variability' && <VariabilityAndLeadTimes gameStatus={gameStatus} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="text-center text-gray-500 text-sm">
          © 2024 Beer Game. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default GameStats;
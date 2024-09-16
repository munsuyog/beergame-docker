import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameStatus } from "../../../store/reducers/gameSlice";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaTable, FaTimes, FaCheckSquare } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const customColors = {
  Stock: '#3498db',
  Backorder: '#e74c3c',
  Order: '#2ecc71',
  Demand: '#f39c12',
  Cost: '#9b59b6',
  Shipment: '#e67e22',
};

const StatisticsModal = ({ onClose }) => {
  const { gameStatus } = useSelector((state) => state.game);
  const { gameId, role } = useParams();
  const dispatch = useDispatch();
  const [visibleMetrics, setVisibleMetrics] = useState({
    Stock: true, Backorder: true, Order: true, Demand: true, Cost: true, Shipment: false,
  });
  const [view, setView] = useState('chart');

  useEffect(() => {
    dispatch(getGameStatus({ gameId, stationId: role }));
  }, [dispatch, gameId, role]);

  const toggleMetric = (metric) => {
    setVisibleMetrics(prev => ({ ...prev, [metric]: !prev[metric] }));
  };

  const chartData = () => {
    if (!gameStatus || !gameStatus.data) return null;
    const weeks = gameStatus.week;
    const labels = Array.from({ length: weeks }, (_, i) => `${i}`);
    const datasets = Object.entries(visibleMetrics)
      .filter(([_, isVisible]) => isVisible)
      .map(([metric, _]) => {
        let data;
        switch (metric) {
          case 'Stock': data = gameStatus.data.inventory[role]; break;
          case 'Backorder': data = gameStatus.data.backorder[role]; break;
          case 'Order': data = gameStatus.data.orders[role]; break;
          case 'Demand': data = role === 'Retailer' ? gameStatus.data.orders.Consumer : gameStatus.data.orders[getPreviousStation(role)]; break;
          case 'Cost': data = gameStatus.data.cost[role]; break;
          case 'Shipment': data = gameStatus.data.deliveries[role]; break;
          default: data = [];
        }
        return {
          label: metric,
          data: data.slice(0, weeks),
          borderColor: customColors[metric],
          backgroundColor: customColors[metric] + '40',
          fill: false,
          tension: 0.4,
        };
      });
    return { labels, datasets };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${role} Statistics`, font: { size: 18, weight: 'bold' } },
    },
    scales: { y: { beginAtZero: true } },
  };

  const tableData = () => {
    if (!gameStatus || !gameStatus.data) return null;
    return Array.from({ length: gameStatus.week }, (_, week) => ({
      week,
      order: gameStatus.data.orders[role][week] || 0,
      demand: role === 'Retailer' ? gameStatus.data.orders.Consumer[week] : (gameStatus.data.orders[getPreviousStation(role)][week] || 0),
      stock: gameStatus.data.inventory[role][week] || 0,
      shipments: gameStatus.data.deliveries[role][week] || 0,
      backorder: gameStatus.data.backorder[role][week] || 0,
      cost: gameStatus.data.cost[role][week] || 0,
    }));
  };

  const getPreviousStation = (station) => {
    const stations = ['Retailer', 'Wholesaler', 'Distributor', 'Manufacturer'];
    const index = stations.indexOf(station);
    return index > 0 ? stations[index - 1] : 'Consumer';
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-[200] bg-black bg-opacity-50 overflow-y-auto"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative p-6 w-full max-w-7xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h3 className="text-2xl font-bold text-gray-900">Statistics for {role}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-colors duration-200"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="mb-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setVisibleMetrics({ Stock: true, Backorder: true, Order: true, Demand: true, Cost: true, Shipment: true })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
            >
              <FaCheckSquare className="mr-2" /> Select All
            </button>
            {Object.keys(visibleMetrics).map((metric) => (
              <label key={metric} className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={visibleMetrics[metric]}
                  onChange={() => toggleMetric(metric)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded"
                />
                <span className="ml-2 text-gray-700">{metric}</span>
              </label>
            ))}
          </div>

          <div className="mb-4 flex justify-center space-x-4">
            <button
              onClick={() => setView('chart')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center ${view === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <FaChartLine className="mr-2" /> Chart View
            </button>
            <button
              onClick={() => setView('table')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center ${view === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <FaTable className="mr-2" /> Table View
            </button>
          </div>

          {view === 'chart' && (
            <div className="mb-8">
              {gameStatus && gameStatus.data ? (
                <Line data={chartData()} options={chartOptions} />
              ) : (
                <p className="text-gray-600 text-center">Loading chart data...</p>
              )}
            </div>
          )}

          {view === 'table' && (
            <div className="mb-8 overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">Week</th>
                    <th className="py-2 px-4 border-b">Order</th>
                    <th className="py-2 px-4 border-b">Demand</th>
                    <th className="py-2 px-4 border-b">Stock</th>
                    <th className="py-2 px-4 border-b">Shipments</th>
                    <th className="py-2 px-4 border-b">Backorder</th>
                    <th className="py-2 px-4 border-b">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData()?.map((row) => (
                    <tr key={row.week} className={row.week % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border-b text-center">{row.week}</td>
                      <td className="py-2 px-4 border-b text-center">{row.order}</td>
                      <td className="py-2 px-4 border-b text-center">{row.demand}</td>
                      <td className="py-2 px-4 border-b text-center">{row.stock}</td>
                      <td className="py-2 px-4 border-b text-center">{row.shipments}</td>
                      <td className="py-2 px-4 border-b text-center">{row.backorder}</td>
                      <td className="py-2 px-4 border-b text-center">${row.cost.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StatisticsModal;
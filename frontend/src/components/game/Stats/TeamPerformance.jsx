import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDollarSign, FaShippingFast, FaBoxes, FaExclamationTriangle } from 'react-icons/fa';

const MetricCard = ({ title, value, icon: Icon, color, subtext }) => (
  <motion.div 
    className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color}`}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <Icon className={`text-2xl ${color.replace('border-', 'text-')}`} />
    </div>
    <p className={`text-4xl font-bold ${color.replace('border-', 'text-')}`}>{value}</p>
    {subtext && <p className="text-sm text-gray-500 mt-2">{subtext}</p>}
  </motion.div>
);

const TeamPerformance = ({ gameStatus }) => {
  const [teamPerformance, setTeamPerformance] = useState(null);

  useEffect(() => {
    if (gameStatus) {
      const totalCost = gameStatus.data.cost_total_sum.Retailer +
        gameStatus.data.cost_total_sum.Wholesaler +
        gameStatus.data.cost_total_sum.Distributor +
        gameStatus.data.cost_total_sum.Manufacturer;
      const retailerOnTimeSales = gameStatus.data.fulfilment_avg.Retailer * 100;
      const retailerOnTimeSalesCount = Math.round(gameStatus.data.fulfilment_avg.Retailer * 96);
      const averageStock = (
        gameStatus.data.inventory.Retailer[gameStatus.data.inventory.Retailer.length - 1] +
        gameStatus.data.inventory.Wholesaler[gameStatus.data.inventory.Wholesaler.length - 1] +
        gameStatus.data.inventory.Distributor[gameStatus.data.inventory.Distributor.length - 1] +
        gameStatus.data.inventory.Manufacturer[gameStatus.data.inventory.Manufacturer.length - 1]
      ) / 4;
      const backordersDuration = 8; // Assuming this is a calculated or given value

      setTeamPerformance({
        totalCost,
        retailerOnTimeSales,
        retailerOnTimeSalesCount,
        averageStock,
        backordersDuration,
      });
    }
  }, [gameStatus]);

  if (!teamPerformance) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="team-performance bg-gray-50 p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Team Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Cost" 
          value={`$${teamPerformance.totalCost.toLocaleString()}`}
          icon={FaDollarSign}
          color="border-red-500"
          subtext="Lower is better"
        />
        <MetricCard 
          title="On-time Sales" 
          value={`${teamPerformance.retailerOnTimeSales.toFixed(1)}%`}
          icon={FaShippingFast}
          color="border-green-500"
          subtext={`${teamPerformance.retailerOnTimeSalesCount} orders`}
        />
        <MetricCard 
          title="Average Stock" 
          value={`${teamPerformance.averageStock.toFixed(1)}`}
          icon={FaBoxes}
          color="border-blue-500"
          subtext="units across all stages"
        />
      </div>
    </motion.div>
  );
};

export default TeamPerformance;
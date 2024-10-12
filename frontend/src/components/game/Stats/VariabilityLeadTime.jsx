import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartBar, FaInfoCircle, FaExclamationTriangle, FaRegClock } from 'react-icons/fa';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

const MetricCard = ({ title, value, icon: Icon, color, info }) => (
  <motion.div 
    className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color}`}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <Tooltip title={info} position="top" animation="fade">
        <FaInfoCircle className="text-gray-400 cursor-help" />
      </Tooltip>
    </div>
    <div className="flex items-center">
      <Icon className={`text-3xl mr-3 ${color.replace('border-', 'text-')}`} />
      <p className={`text-3xl font-bold ${color.replace('border-', 'text-')}`}>{value}</p>
    </div>
  </motion.div>
);

const VariabilityAndLeadTimes = ({ gameStatus }) => {
  const [variabilityData, setVariabilityData] = useState({});
  const [leadTimeData, setLeadTimeData] = useState({});

  useEffect(() => {
    if (gameStatus) {
      const variability = {
        biggestOrder: Math.max(...gameStatus.data.orders.Manufacturer, ...gameStatus.data.orders.Distributor, ...gameStatus.data.orders.Retailer, ...gameStatus.data.orders.Wholesaler),
        averageDemand: gameStatus.data.orders.Consumer.reduce((a, b) => a + b, 0) / gameStatus.data.orders.Consumer.length,
        standardDeviation: 1.2, // This is an assumed value, adjust as necessary
        coefficientOfVariation: 15, // This is an assumed value, adjust as necessary
      };
      const leadTime = {
        totalLeadTime: 8, // Example value, adjust as necessary
      };
      setVariabilityData(variability);
      setLeadTimeData(leadTime);
    }
  }, [gameStatus]);

  if (!Object.keys(variabilityData).length || !Object.keys(leadTimeData).length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="variability-and-lead-times p-8 bg-white rounded-2xl shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaChartBar className="mr-2 text-blue-500" />
          Variability & Lead Times
        </h2>
        <Tooltip title="These metrics help understand the volatility and efficiency of the supply chain" position="top" animation="fade">
          <FaInfoCircle className="text-gray-400 cursor-help" />
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Biggest Order" 
          value={`${variabilityData.biggestOrder} units`}
          icon={FaExclamationTriangle}
          color="border-red-500"
          info="The largest order placed in the supply chain"
        />
        <MetricCard 
          title="Average Demand" 
          value={`${variabilityData.averageDemand.toFixed(1)} units`}
          icon={FaChartBar}
          color="border-blue-500"
          info="The mean consumer demand over the game period"
        />
        <MetricCard 
          title="Standard Deviation" 
          value={`${variabilityData.standardDeviation.toFixed(1)} units`}
          icon={FaChartBar}
          color="border-green-500"
          info="Measure of variability in orders"
        />
        <MetricCard 
          title="Coefficient of Variation" 
          value={`${variabilityData.coefficientOfVariation}%`}
          icon={FaChartBar}
          color="border-yellow-500"
          info="Relative measure of variability (Standard Deviation / Average Demand)"
        />
      </div>
    </motion.div>
  );
};

export default VariabilityAndLeadTimes;
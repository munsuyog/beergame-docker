import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaDollarSign, FaShippingFast, FaBoxes, FaExclamationTriangle, FaShoppingCart } from 'react-icons/fa';

const TableHeader = ({ children, icon: Icon }) => (
  <th className="p-4 text-left">
    <div className="flex items-center">
      <Icon className="mr-2 text-gray-500" />
      {children}
    </div>
  </th>
);

const TableCell = ({ value, format }) => (
  <td className="p-4 text-right">
    {format === 'currency' && <span className="text-red-500">-$</span>}
    {format === 'percentage' ? `${value.toFixed(1)}%` : value.toFixed(1)}
  </td>
);

const IndividualPerformance = ({ gameStatus }) => {
  const [individualPerformance, setIndividualPerformance] = useState([]);

  useEffect(() => {
    if (gameStatus) {
      const performance = [
        { role: "Retailer", data: gameStatus.data, color: "bg-blue-100" },
        { role: "Wholesaler", data: gameStatus.data, color: "bg-green-100" },
        { role: "Distributor", data: gameStatus.data, color: "bg-yellow-100" },
        { role: "Manufacturer", data: gameStatus.data, color: "bg-red-100" },
      ].map(({ role, data, color }) => ({
        role,
        color,
        cost: data.cost_total_sum[role],
        shippedOnTime: data.fulfilment_avg[role] * 100,
        averageStock: data.inventory[role].reduce((a, b) => a + b, 0) / data.inventory[role].length,
        averageBackorder: data.backorder[role].reduce((a, b) => a + b, 0) / data.backorder[role].length,
        averageOrders: data.orders[role].reduce((a, b) => a + b, 0) / data.orders[role].length,
      }));

      setIndividualPerformance(performance);
    }
  }, [gameStatus]);

  if (!individualPerformance.length) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="individual-performance bg-white p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Individual Performance</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <TableHeader icon={FaUser}>Role</TableHeader>
              <TableHeader icon={FaDollarSign}>Cost</TableHeader>
              <TableHeader icon={FaShippingFast}>% Shipped on Time</TableHeader>
              <TableHeader icon={FaBoxes}>Average Stock</TableHeader>
              <TableHeader icon={FaExclamationTriangle}>Average Backorder</TableHeader>
              <TableHeader icon={FaShoppingCart}>Average Orders</TableHeader>
            </tr>
          </thead>
          <tbody>
            {individualPerformance.map((player, index) => (
              <motion.tr 
                key={index}
                className={`${player.color} hover:bg-opacity-80 transition-colors duration-200`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="p-4 font-semibold">{player.role}</td>
                <TableCell value={player.cost} format="currency" />
                <TableCell value={player.shippedOnTime} format="percentage" />
                <TableCell value={player.averageStock} />
                <TableCell value={player.averageBackorder} />
                <TableCell value={player.averageOrders} />
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default IndividualPerformance;
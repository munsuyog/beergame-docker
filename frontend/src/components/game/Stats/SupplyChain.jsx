import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { motion } from 'framer-motion';
import { FaChartLine, FaInfoCircle } from 'react-icons/fa';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
        <p className="font-bold text-gray-800">Week {label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SupplyChainEvolutionChart = ({ gameStatus }) => {
  const [data, setData] = useState([]);
  const [hoveredData, setHoveredData] = useState(null);

  useEffect(() => {
    if (gameStatus && gameStatus.week) {
      const supplyChainData = gameStatus.data;
      const chartData = Array.from({ length: gameStatus.week }).map((_, index) => ({
        week: index + 1,
        stock: supplyChainData.inventory.Retailer[index] +
               supplyChainData.inventory.Wholesaler[index] +
               supplyChainData.inventory.Distributor[index] +
               supplyChainData.inventory.Manufacturer[index],
        backorder: supplyChainData.backorder.Retailer[index] +
                   supplyChainData.backorder.Wholesaler[index] +
                   supplyChainData.backorder.Distributor[index] +
                   supplyChainData.backorder.Manufacturer[index],
        cost: supplyChainData.cost.Retailer[index] +
              supplyChainData.cost.Wholesaler[index] +
              supplyChainData.cost.Distributor[index] +
              supplyChainData.cost.Manufacturer[index],
      }));
      setData(chartData);
    }
  }, [gameStatus]);

  if (!data.length) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="supply-chain-evolution-chart p-8 bg-white rounded-2xl shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaChartLine className="mr-2 text-blue-500" />
          Supply Chain Evolution
        </h2>
        <div className="flex items-center text-gray-600">
          <FaInfoCircle className="mr-2" />
          <span className="text-sm">Hover over the chart for detailed information</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart 
          data={data}
          onMouseMove={(e) => e && e.activePayload && setHoveredData(e.activePayload[0].payload)}
          onMouseLeave={() => setHoveredData(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="week">
            <Label value="Weeks" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis yAxisId="left">
            <Label value="Units" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <YAxis yAxisId="right" orientation="right">
            <Label value="Cost ($)" angle={90} position="insideRight" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Line yAxisId="left" type="monotone" dataKey="stock" stroke="#8884d8" strokeWidth={2} name="Stock" dot={false} />
          <Line yAxisId="left" type="monotone" dataKey="backorder" stroke="#82ca9d" strokeWidth={2} name="Backorder" dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#ff7300" strokeWidth={2} name="Cost" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      {hoveredData && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Week {hoveredData.week} Summary</h3>
          <p>Stock: {hoveredData.stock.toFixed(2)} units</p>
          <p>Backorder: {hoveredData.backorder.toFixed(2)} units</p>
          <p>Cost: ${hoveredData.cost.toFixed(2)}</p>
        </div>
      )}
    </motion.div>
  );
};

export default SupplyChainEvolutionChart;
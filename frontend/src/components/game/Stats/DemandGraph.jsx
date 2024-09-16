import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import { FaChartArea, FaInfoCircle } from 'react-icons/fa';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
        <p className="font-bold text-gray-800 mb-2">Week {label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
            <span className="font-medium">{entry.name}:</span> 
            <span className="ml-2">{entry.value.toFixed(2)}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ResponseToDemandChart = ({ gameStatus }) => {
  const [data, setData] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    if (gameStatus && gameStatus.data && gameStatus.data.orders) {
      const { Retailer, Wholesaler, Distributor, Manufacturer, Consumer } = gameStatus.data.orders;
      const chartData = Retailer.map((_, index) => ({
        week: index + 1,
        Retailer: Retailer[index],
        Wholesaler: Wholesaler[index],
        Distributor: Distributor[index],
        Manufacturer: Manufacturer[index],
        Consumer: Consumer[index],
      }));
      setData(chartData);
    }
  }, [gameStatus]);

  if (!data.length) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const handleMouseMove = (props) => {
    if (props && props.activePayload) {
      setSelectedWeek(props.activePayload[0].payload);
    }
  };

  const handleMouseLeave = () => {
    setSelectedWeek(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="response-to-demand-chart p-8 bg-white rounded-2xl shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaChartArea className="mr-2 text-blue-500" />
          Orders vs. Final Demand
        </h2>
        <div className="flex items-center text-gray-600">
          <FaInfoCircle className="mr-2" />
          <span className="text-sm">Hover over the chart for detailed information</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart 
          data={data}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="week">
            <Label value="Weeks" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Order Quantity" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <ReferenceLine y={data[0].Consumer} label="Initial Demand" stroke="red" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="Retailer" stroke="#8884d8" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Wholesaler" stroke="#82ca9d" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Distributor" stroke="#ffc658" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Manufacturer" stroke="#ff7300" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Consumer" stroke="#a4de6c" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      {selectedWeek && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-gray-100 rounded-lg"
        >
          <h3 className="font-bold text-lg mb-2">Week {selectedWeek.week} Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <p><span className="font-medium">Retailer:</span> {selectedWeek.Retailer.toFixed(2)}</p>
            <p><span className="font-medium">Wholesaler:</span> {selectedWeek.Wholesaler.toFixed(2)}</p>
            <p><span className="font-medium">Distributor:</span> {selectedWeek.Distributor.toFixed(2)}</p>
            <p><span className="font-medium">Manufacturer:</span> {selectedWeek.Manufacturer.toFixed(2)}</p>
            <p><span className="font-medium">Consumer:</span> {selectedWeek.Consumer.toFixed(2)}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResponseToDemandChart;
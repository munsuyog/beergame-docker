import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getGameStatus, getSessionAnalysis } from "../../../store/reducers/gameSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaChartBar, FaSync } from "react-icons/fa";
import DownloadExcelButton from "./DownloadBtn";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const createChartOptions = (title, yAxisLabel) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: title,
      font: {
        size: 16,
        weight: 'bold',
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Weeks',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
    y: {
      title: {
        display: true,
        text: yAxisLabel,
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  },
});

export const StagesEvolution = ({ data }) => {
  const options = createChartOptions("Stages Evolution", "Stock");

  const chartData = {
    labels: data.stages_evolution.weeks,
    datasets: Object.entries(data.stages_evolution.stages).map(
      ([stage, stageData], index) => ({
        label: stage,
        data: stageData.stock,
        borderColor: `hsl(${index * 60}, 70%, 50%)`,
        backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.5)`,
      })
    ),
  };

  return (
    <div className="mt-4 h-96">
      <Line options={options} data={chartData} />
    </div>
  );
};

export const SupplyChainEvolution = ({ data }) => {
  if (!data || !data.supply_chain_evolution) {
    return <div className="text-gray-600">No data available for Supply Chain Evolution</div>;
  }

  const options = createChartOptions("Supply Chain Evolution", "Value");

  const chartData = {
    labels: data.supply_chain_evolution.weeks || [],
    datasets: [
      {
        label: "Cost",
        data: data.supply_chain_evolution.cost?.Distributor || [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: 'y',
      },
      {
        label: "Fill Rate",
        data: data.supply_chain_evolution.fill_rate?.Distributor || [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: 'y1',
      },
      {
        label: "Average Stock",
        data: data.supply_chain_evolution.average_stock?.Distributor || [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        yAxisID: 'y2',
      },
    ],
  };

  options.scales.y.title.text = "Cost";
  options.scales.y1 = {
    type: 'linear',
    display: true,
    position: 'right',
    title: {
      display: true,
      text: 'Fill Rate',
      font: {
        size: 14,
        weight: 'bold',
      },
    },
  };
  options.scales.y2 = {
    type: 'linear',
    display: true,
    position: 'right',
    title: {
      display: true,
      text: 'Average Stock',
      font: {
        size: 14,
        weight: 'bold',
      },
    },
    grid: {
      drawOnChartArea: false,
    },
  };

  return (
    <div className="mt-4 h-96">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export const OrdersVsFinalDemand = ({ data }) => {
  const options = createChartOptions("Orders vs. Final Demand", "Quantity");

  const chartData = {
    labels: data.orders_vs_final_demand.weeks,
    datasets: [
      ...Object.entries(data.orders_vs_final_demand.orders).map(
        ([stage, orders], index) => ({
          label: stage,
          data: orders,
          borderColor: `hsl(${index * 60}, 70%, 50%)`,
          backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.5)`,
        })
      ),
      {
        label: "Final Demand",
        data: data.orders_vs_final_demand.final_demand,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderDash: [5, 5],
      },
    ],
  };

  return (
    <div className="mt-4 h-96">
      <Line options={options} data={chartData} />
    </div>
  );
};

export const StockVsFinalDemand = ({ data }) => {
  const options = createChartOptions("Stock vs. Final Demand", "Quantity");

  const chartData = {
    labels: data.stock_vs_final_demand.weeks,
    datasets: [
      ...Object.entries(data.stock_vs_final_demand.stock).map(
        ([stage, stock], index) => ({
          label: stage,
          data: stock,
          borderColor: `hsl(${index * 60}, 70%, 50%)`,
          backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.5)`,
        })
      ),
      {
        label: "Final Demand",
        data: data.stock_vs_final_demand.final_demand,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderDash: [5, 5],
      },
    ],
  };

  return (
    <div className="mt-4 h-96">
      <Line options={options} data={chartData} />
    </div>
  );
};

const Results = () => {
  const dispatch = useDispatch();
  const { sessionId } = useParams();
  const [activeTeamTab, setActiveTeamTab] = useState("Supply Chain Evolution");
  const [activeTeam, setActiveTeam] = useState(null);
  const sessionAnalysis = useSelector((state) => state.game.sessionAnalysis);
  const loading = useSelector((state) => state.game.loading);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getSessionAnalysis(sessionId));
    }, 2000);

    return () => clearInterval(intervalId);
  }, [dispatch, sessionId]);

  useEffect(() => {
    if (sessionAnalysis) {
      const teamsWithData = Object.keys(sessionAnalysis).filter(
        (teamName) => sessionAnalysis[teamName]?.supply_chain_evolution?.weeks?.length > 0
      );
      if (teamsWithData.length > 0) {
        setActiveTeam(teamsWithData[0]);
      }
    }
  }, [sessionAnalysis]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSync className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  if (!sessionAnalysis || Object.keys(sessionAnalysis).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">No data available for analysis.</p>
      </div>
    );
  }

  const teamsWithData = Object.keys(sessionAnalysis).filter(
    (teamName) => sessionAnalysis[teamName]?.supply_chain_evolution?.weeks?.length > 0
  );

  if (teamsWithData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">No data available for any team.</p>
      </div>
    );
  }

  const teamTabs = [
    "Supply Chain Evolution",
    "Stages Evolution",
    "Orders vs. Final Demand",
    "Stock vs. Final Demand",
  ];

  const activeTeamData = sessionAnalysis[activeTeam];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-gray-100 min-h-screen"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Game Results Analysis</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Team Analysis</h2>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <select
            value={activeTeam}
            onChange={(e) => setActiveTeam(e.target.value)}
            className="p-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {teamsWithData.map((teamName) => (
              <option key={teamName} value={teamName}>
                {teamName}
              </option>
            ))}
          </select>
          <DownloadExcelButton sessionId={sessionId} />
          <div className="flex flex-wrap gap-2">
            {teamTabs.map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTeamTab === tab
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTeamTab(tab)}
              >
                {tab === "Supply Chain Evolution" && <FaChartBar className="inline-block mr-2" />}
                {tab === "Stages Evolution" && <FaChartLine className="inline-block mr-2" />}
                {tab === "Orders vs. Final Demand" && <FaChartLine className="inline-block mr-2" />}
                {tab === "Stock vs. Final Demand" && <FaChartBar className="inline-block mr-2" />}
                {tab}
              </motion.button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTeamTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            {activeTeamTab === "Supply Chain Evolution" && activeTeamData && (
              <SupplyChainEvolution data={activeTeamData} />
            )}
            {activeTeamTab === "Stages Evolution" && activeTeamData && (
              <StagesEvolution data={activeTeamData} />
            )}
            {activeTeamTab === "Orders vs. Final Demand" && activeTeamData && (
              <OrdersVsFinalDemand data={activeTeamData} />
            )}
            {activeTeamTab === "Stock vs. Final Demand" && activeTeamData && (
              <StockVsFinalDemand data={activeTeamData} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>Data refreshes automatically every 2 seconds</p>
      </div>
    </motion.div>
  );
};

export default Results;


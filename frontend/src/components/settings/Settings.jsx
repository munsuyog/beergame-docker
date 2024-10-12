import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlGraph } from "react-icons/sl";
import {
  getGameSetup,
  getSessionGameSettings,
  saveGameSetup,
  changeSessionGameSettings
} from "../../store/reducers/gameSlice";
import { Line } from "react-chartjs-2";
import { FiPlus } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../../contexts/LoadingContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GameSetup = () => {
  const dispatch = useDispatch();
  const { gameSetup, sessionGameSettings, loading, error } = useSelector(
    (state) => state.game
  );
  const { sessionId } = useParams();
  const [active, setActive] = useState(1);
  const [localGameSetup, setLocalGameSetup] = useState(null);
  const [showDiv, setShowDiv] = useState(0);
  const {startLoading, stopLoading} = useContext(LoadingContext);
  const [manualUpdate, setManualUpdate] = useState([
    4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
  ]);
  const [inputValue, setInputValue] = useState(
    "4,4,4,4,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8"
  );
  const [demandSegments, setDemandSegments] = useState([
    { fromCycle: 1, toCycle: 4, average: 4, variability: 0 },
    { fromCycle: 5, toCycle: 20, average: 8, variability: 0 },
  ]);
  const [open, setOpen] = useState(false);
  const [newScriptItem, setNewScriptItem] = useState({ week: "", msg: "" });
  useEffect(() => {
    if (!sessionGameSettings) {
      dispatch(getSessionGameSettings(sessionId));
    }
  }, [dispatch]);

  useEffect(() => {
    if(!loading) {
      stopLoading();
    } 
    if(loading) {
      startLoading();
    }
  },[loading])

  useEffect(() => {
    if (sessionGameSettings) {
      setLocalGameSetup(sessionGameSettings);
      if (
        sessionGameSettings.demands &&
        sessionGameSettings.demands.length > 0
      ) {
        const demandData = sessionGameSettings.demands[0].demand;
        if (typeof demandData === "string") {
          const demandArray = demandData.split(",").map(Number);
          setManualUpdate(demandArray);
          setInputValue(demandData);
        } else if (Array.isArray(demandData)) {
          setManualUpdate(demandData);
          setInputValue(demandData.join(", "));
        }
      }
    }
  }, []);

  const handleInputChange = (e, field) => {
    const value =
      e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setLocalGameSetup((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (e, field, index, subfield) => {
    if (!localGameSetup) return;
    const newArray = [...localGameSetup[field]];
    let value = e.target.value;

    if (
      subfield === "demand" ||
      subfield === "order_min" ||
      subfield === "order_max" ||
      subfield === "ship_min" ||
      subfield === "ship_max"
    ) {
      value = value
        .split(",")
        .map((item) => {
          const trimmed = item.trim();
          if (trimmed.toLowerCase() === "infinity") return "Infinity";
          const num = parseFloat(trimmed);
          return isNaN(num) ? trimmed : num;
        })
        .join(", ");
    } else if (e.target.type === "number") {
      value = parseFloat(value);
    } else if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    newArray[index] = { ...newArray[index], [subfield]: value };
    setLocalGameSetup((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleTextareaChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const valuesArray = value
      .split(",")
      .filter((val) => val.trim() !== "")
      .map((val) => parseFloat(val.trim()))
      .filter((val) => !isNaN(val));

    if (valuesArray.length > 0) {
      setManualUpdate(valuesArray);
      updateLocalGameSetupDemand(valuesArray);
    }
  };

  const handleDemandSegmentChange = (index, field, value) => {
    const newSegments = [...demandSegments];
    newSegments[index][field] = value;
    setDemandSegments(newSegments);
    generateData();
  };

  const addDemandSegment = () => {
    setDemandSegments([
      ...demandSegments,
      { fromCycle: 1, toCycle: 20, average: 0, variability: 0 },
    ]);
    generateData();
  };

  const generateData = () => {
    const dataPoints = new Array(20).fill(0);
    demandSegments.forEach((segment) => {
      for (let i = segment.fromCycle - 1; i < segment.toCycle; i++) {
        const variation = (Math.random() - 0.5) * 2 * segment.variability;
        dataPoints[i] = Math.max(0, Math.round(segment.average + variation)); // Ensure non-negative and integer values
      }
    });
    setManualUpdate(dataPoints);
    setInputValue(dataPoints.join(", "));
    updateLocalGameSetupDemand(dataPoints);
    return dataPoints;
  };

  const updateLocalGameSetupDemand = (newDemand) => {
    if (
      localGameSetup &&
      localGameSetup.demands &&
      localGameSetup.demands.length > 0
    ) {
      const updatedDemands = [...localGameSetup.demands];
      updatedDemands[0] = {
        ...updatedDemands[0],
        demand: newDemand.join(", "),
      };
      setLocalGameSetup((prev) => ({ ...prev, demands: updatedDemands }));
    }
  };

  const handleGenerateDemand = () => {
    generateData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localGameSetup) return;
    startLoading();

    const formattedSetup = {
      ...localGameSetup,
      demands: localGameSetup.demands.map((d) => ({
        ...d,
        demand: Array.isArray(d.demand) ? d.demand.join(", ") : d.demand,
      })),
      stations: localGameSetup.stations.map((s) => ({
        ...s,
        order_min: Array.isArray(s.order_min)
          ? s.order_min.join(", ")
          : s.order_min,
        order_max: Array.isArray(s.order_max)
          ? s.order_max.join(", ")
          : s.order_max,
        ship_min: Array.isArray(s.ship_min)
          ? s.ship_min.join(", ")
          : s.ship_min,
        ship_max: Array.isArray(s.ship_max)
          ? s.ship_max.join(", ")
          : s.ship_max,
      })),
    };

    try {
      await dispatch(
        changeSessionGameSettings({ sessionId , setupData: formattedSetup })
      ).unwrap();
      await dispatch(getSessionGameSettings(sessionId)).unwrap();
    } catch (error) {
      console.error("Failed to save or fetch game setup:", error);
    }
  };

  const handleAddScriptItem = () => {
    setLocalGameSetup((prev) => ({
      ...prev,
      script: [...prev.script, newScriptItem],
    }));
    setNewScriptItem({ week: "", msg: "" });
    setOpen(false);
  };

  const data = {
    labels: Array.from({ length: 40 }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: "Consumer Demand",
        data: manualUpdate,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Demand: ${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) return <div>Loading game setup...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!localGameSetup) return <div>No game setup data available.</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[100%] lg:w-[100%] ml-auto mr-auto border rounded-lg shadow-lg p-8 bg-white "
    >
      <div className="flex justify-between mb-8">
        <div className="flex gap-5">
          <button
            type="button"
            onClick={() => setActive(1)}
            className={`font-semibold text-lg ${
              active === 1
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600"
            }`}
          >
            Game Setup
          </button>
          <button
            type="button"
            onClick={() => setActive(2)}
            className={`font-semibold text-lg ${
              active === 2
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600"
            }`}
          >
            Demands
          </button>
        </div>
        <SlGraph className="text-2xl text-red-600" />
      </div>

      {active === 1 && (
        <>
          {/* <div className="w-full mt-5">
            <label className="block text-gray-700 font-bold mb-2">
              Game Name
            </label>
            <input
              type="text"
              className="w-full lg:w-[80%] border p-2 border-gray-300 rounded-md"
              value={localGameSetup.team_name || ""}
              onChange={(e) => handleInputChange(e, "team_name")}
              placeholder="Unique game ID"
              required
            />
          </div> */}

          {/* <div className="flex flex-col md:flex-row lg:flex-row items-center gap-10 justify-between mt-5">
            <div className="w-full">
              <label className="block text-gray-700 font-bold mb-2">
                Admin Password
              </label>
              <input
                type="password"
                className="w-full lg:w-[80%] border p-2 border-gray-300 rounded-md"
                value={localGameSetup.admin_password || ""}
                onChange={(e) => handleInputChange(e, "admin_password")}
                placeholder="Password to administer game"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-bold mb-2">
                Player Password
              </label>
              <input
                type="password"
                className="w-full lg:w-[80%] border p-2 border-gray-300 rounded-md"
                value={localGameSetup.play_password || ""}
                onChange={(e) => handleInputChange(e, "play_password")}
                placeholder="Password to join game"
                required
              />
            </div>
          </div> */}

          <div className="flex flex-col md:flex-row lg:flex-row items-center gap-10 justify-between mt-5">
            <div className="w-full">
              <label className="block text-gray-700 font-bold mb-2">
                Number of Weeks
              </label>
              <input
                type="number"
                className="w-full lg:w-[80%] border p-2 border-gray-300 rounded-md"
                value={localGameSetup.weeks || ""}
                onChange={(e) => handleInputChange(e, "weeks")}
                placeholder="Number of weeks to be played"
                required
                min="1"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-bold mb-2">
                Game Expiry (days)
              </label>
              <input
                type="number"
                className="w-full lg:w-[80%] border p-2 border-gray-300 rounded-md"
                value={localGameSetup.expiry || ""}
                onChange={(e) => handleInputChange(e, "expiry")}
                placeholder="Number of days after which the game will expire"
                required
                min="0.0007"
                step="0.0001"
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <label className="block text-gray-700 font-bold mb-2">
              Turn Time (seconds)
            </label>
            <input
              type="number"
              className="w-full lg:w-[80%] border p-2 border-gray-300 rounded-md"
              value={localGameSetup.turn_time || ""}
              onChange={(e) => handleInputChange(e, "turn_time")}
              placeholder="Number of seconds a player has to make decisions"
              required
              min="1"
            />
          </div>

          <div className="mt-5">
            <h1 className="text-lg font-bold text-gray-700 mb-4">
              Demand Points
            </h1>
            {(localGameSetup.demands || []).map((demand, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Demand Point Name
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={demand.name || ""}
                    onChange={(e) =>
                      handleArrayInputChange(e, "demands", index, "name")
                    }
                    placeholder="Demand point name"
                    required
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Weekly Demand (comma-separated)
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={
                      Array.isArray(demand.demand)
                        ? demand.demand.join(", ")
                        : demand.demand || ""
                    }
                    onChange={(e) =>
                      handleArrayInputChange(e, "demands", index, "demand")
                    }
                    placeholder="Weekly demand (comma-separated)"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <h1 className="text-lg font-bold text-gray-700 mb-4">
              Network Stations
            </h1>
            {(localGameSetup?.stations || []).map((station, index) => (
              <div
                key={index}
                className="border p-4 mt-2 rounded-md bg-gray-50"
              >
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Station Name
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={station.name || ""}
                    onChange={(e) =>
                      handleArrayInputChange(e, "stations", index, "name")
                    }
                    placeholder="Station name"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Player Name
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={station.player_name || ""}
                    onChange={(e) =>
                      handleArrayInputChange(
                        e,
                        "stations",
                        index,
                        "player_name"
                      )
                    }
                    placeholder="Player name"
                  />
                </div>
                <div className="flex gap-2 mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={station.auto_decide_ship_qty || false}
                      onChange={(e) =>
                        handleArrayInputChange(
                          e,
                          "stations",
                          index,
                          "auto_decide_ship_qty"
                        )
                      }
                    />
                    <span className="ml-2 text-gray-700">
                      Auto-decide shipments
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={station.auto_decide_order_qty || false}
                      onChange={(e) =>
                        handleArrayInputChange(
                          e,
                          "stations",
                          index,
                          "auto_decide_order_qty"
                        )
                      }
                    />
                    <span className="ml-2 text-gray-700">
                      Auto-decide orders
                    </span>
                  </label>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Holding Cost
                  </label>
                  <input
                    type="number"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={station.holding_cost || ""}
                    onChange={(e) =>
                      handleArrayInputChange(
                        e,
                        "stations",
                        index,
                        "holding_cost"
                      )
                    }
                    placeholder="Holding cost"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Backorder Cost
                  </label>
                  <input
                    type="number"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={station.backorder_cost || ""}
                    onChange={(e) =>
                      handleArrayInputChange(
                        e,
                        "stations",
                        index,
                        "backorder_cost"
                      )
                    }
                    placeholder="Backorder cost"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Transport Cost
                  </label>
                  <input
                    type="number"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={station.transport_cost || ""}
                    onChange={(e) =>
                      handleArrayInputChange(
                        e,
                        "stations",
                        index,
                        "transport_cost"
                      )
                    }
                    placeholder="Transport cost"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Transport Size
                  </label>
                  <input
                    type="number"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={station.transport_size || ""}
                    onChange={(e) =>
                      handleArrayInputChange(
                        e,
                        "stations",
                        index,
                        "transport_size"
                      )
                    }
                    placeholder="Transport size"
                    min="1"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Shipping Delay
                  </label>
                  <input
                    type="number"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={station.delay_shipping || ""}
                    onChange={(e) =>
                      handleArrayInputChange(
                        e,
                        "stations",
                        index,
                        "delay_shipping"
                      )
                    }
                    placeholder="Shipping delay"
                    min="1"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Ordering Delay
                  </label>
                  <input
                    type="number"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={station.delay_ordering || ""}
                    onChange={(e) =>
                      handleArrayInputChange(
                        e,
                        "stations",
                        index,
                        "delay_ordering"
                      )
                    }
                    placeholder="Ordering delay"
                    min="1"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Initial Queue Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={station.initial_queue_quantity || ""}
                    onChange={(e) =>
                      handleArrayInputChange(
                        e,
                        "stations",
                        index,
                        "initial_queue_quantity"
                      )
                    }
                    placeholder="Initial queue quantity"
                    min="0"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Initial Inventory
                  </label>
                  <input
                    type="number"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={station.initial_inventory || ""}
                    onChange={(e) =>
                      handleArrayInputChange(
                        e,
                        "stations",
                        index,
                        "initial_inventory"
                      )
                    }
                    placeholder="Initial inventory"
                    min="0"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <h1 className="text-lg font-bold text-gray-700 mb-4">
              Network Connections
            </h1>
            {(localGameSetup?.connections || []).map((connection, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Supplier
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={connection.supp || ""}
                    onChange={(e) =>
                      handleArrayInputChange(e, "connections", index, "supp")
                    }
                    placeholder="Supplier"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Customer
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={connection.cust || ""}
                    onChange={(e) =>
                      handleArrayInputChange(e, "connections", index, "cust")
                    }
                    placeholder="Customer"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <h1 className="text-lg font-bold text-gray-700 mb-4">
              Game Script
            </h1>
            {(localGameSetup?.script || []).map((scriptItem, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <div className="w-1/4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Week
                  </label>
                  <input
                    type="number"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={scriptItem.week || ""}
                    onChange={(e) =>
                      handleArrayInputChange(e, "script", index, "week")
                    }
                    placeholder="Week"
                    required
                    min="1"
                  />
                </div>
                <div className="w-3/4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Message
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 border-gray-300 rounded-md"
                    value={scriptItem.msg || ""}
                    onChange={(e) =>
                      handleArrayInputChange(e, "script", index, "msg")
                    }
                    placeholder="Message"
                    required
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Add Script Item
            </button>
          </div>
        </>
      )}

      {active === 2 && (
        <div className="mt-5">
          <div className="flex gap-5 border-b mb-4">
            <button
              type="button"
              onClick={() => setShowDiv(0)}
              className={`text-lg font-bold ${
                showDiv === 0 && "text-red-600 border-b-2 border-red-600"
              }`}
            >
              Manual Update
            </button>
            <button
              type="button"
              onClick={() => setShowDiv(1)}
              className={`text-lg font-bold ${
                showDiv === 1 && "text-red-600 border-b-2 border-red-600"
              }`}
            >
              Generate Demand
            </button>
          </div>

          {showDiv === 0 && (
            <div>
              <h2 className="mt-2 mb-2 text-gray-700">
                Modify the values below or simply copy/paste a list of cells
                from an Excel spreadsheet:
              </h2>
              <textarea
                placeholder="4,4,4,4,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8"
                className="w-full h-40 border mt-2 p-2 border-gray-300 rounded-md"
                value={inputValue}
                onChange={handleTextareaChange}
              />
            </div>
          )}

          {showDiv === 1 && (
            <div className="mt-5">
              <div className="flex items-center justify-between border-b font-bold text-gray-700">
                <h2>From Cycle</h2>
                <h2>To Cycle</h2>
                <h2>Average</h2>
                <h2>Variability</h2>
                <h2></h2>
              </div>
              {demandSegments.map((segment, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 mt-2">
                  <input
                    type="number"
                    value={segment.fromCycle}
                    onChange={(e) =>
                      handleDemandSegmentChange(
                        index,
                        "fromCycle",
                        parseInt(e.target.value)
                      )
                    }
                    className="border p-2 border-gray-300 rounded-md"
                    min="1"
                  />
                  <input
                    type="number"
                    value={segment.toCycle}
                    onChange={(e) =>
                      handleDemandSegmentChange(
                        index,
                        "toCycle",
                        parseInt(e.target.value)
                      )
                    }
                    className="border p-2 border-gray-300 rounded-md"
                    min="1"
                  />
                  <input
                    type="number"
                    value={segment.average}
                    onChange={(e) =>
                      handleDemandSegmentChange(
                        index,
                        "average",
                        parseFloat(e.target.value)
                      )
                    }
                    className="border p-2 border-gray-300 rounded-md"
                    step="0.1"
                  />
                  <input
                    type="number"
                    value={segment.variability}
                    onChange={(e) =>
                      handleDemandSegmentChange(
                        index,
                        "variability",
                        parseFloat(e.target.value)
                      )
                    }
                    className="border p-2 border-gray-300 rounded-md"
                    step="0.1"
                    min="0"
                  />
                </div>
              ))}
              <div className="flex justify-center items-center gap-5 mt-4">
                <button
                  type="button"
                  onClick={addDemandSegment}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  <FiPlus /> Add Segment
                </button>
              </div>
            </div>
          )}

          <div className="border-2 mt-8 w-full h-80 border-red-500 rounded-md w-[100%] flex justify-center">
            <Line data={data} options={options} />
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="bg-red-500 text-white px-8 py-2 rounded-full"
        >
          Save Setup
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} center>
        <h2>Add New Script Item</h2>
        <div className="mt-4">
          <label className="block text-gray-700 font-bold mb-2">Week</label>
          <input
            type="number"
            className="w-full border p-2 border-gray-300 rounded-md"
            value={newScriptItem.week}
            onChange={(e) =>
              setNewScriptItem({ ...newScriptItem, week: e.target.value })
            }
            placeholder="Week"
            required
            min="1"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 font-bold mb-2">Message</label>
          <input
            type="text"
            className="w-full border p-2 border-gray-300 rounded-md"
            value={newScriptItem.msg}
            onChange={(e) =>
              setNewScriptItem({ ...newScriptItem, msg: e.target.value })
            }
            placeholder="Message"
            required
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleAddScriptItem}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </Modal>
    </form>
  );
};

export default GameSetup;

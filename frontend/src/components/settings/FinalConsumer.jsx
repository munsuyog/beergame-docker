import { useState } from "react";
import { BsFileBarGraph } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinalConsumer = () => {
  const [showDiv, setShowDiv] = useState(0);
  const [manualUpdate, setManualUpdate] = useState([4, 8, 8, 8, 8]); // Default values
  const [inputValue, setInputValue] = useState("4,8,8,8,8");
  const [manualEntryError, setManualEntryError] = useState("");
  const [row1, setRow1] = useState([1, 4, 4, 0]);
  const [numbers2, setNumbers2] = useState([5, 12, 8, 0]);

  const handleChange = (e, arrayName, index) => {
    const value = parseInt(e.target.value, 10);
    if (arrayName === "row1") {
      setRow1((prevRow1) => {
        const newRow1 = [...prevRow1];
        newRow1[index] = value;
        return newRow1;
      });
    } else if (arrayName === "numbers2") {
      setNumbers2((prevNumbers2) => {
        const newNumbers2 = [...prevNumbers2];
        newNumbers2[index] = value;
        return newNumbers2;
      });
    }
  };
  const totalPoints = 12;

  const generateData = () => {
    const dataPoints = [];
    const totalPoints = 12; // Total number of data points
  
    // Define the ranges and values for cycles
    const [row1Start, row1End, row1Value, row1Breakpoint] = row1;
    const [numbers2Start, numbers2End, numbers2Value, numbers2Breakpoint] = numbers2;
  
    const applyVariability = (value, breakpoint) => {
      if (breakpoint > 0) {
        const variation = Math.random() * breakpoint * 2 - breakpoint;
        return value + variation;
      }
      return value;
    };
  
    // Loop through each data point
    for (let i = 0; i < totalPoints; i++) {
      let value = 0;
  
      // Apply values from row1 if within the defined range
      if (i >= row1Start && i < row1End) {
        value = applyVariability(row1Value, row1Breakpoint);
      }
      // Apply values from numbers2 if within the defined range
      else if (i >= numbers2Start && i < numbers2End) {
        value = applyVariability(numbers2Value, numbers2Breakpoint);
      }
  
      dataPoints.push(value);
    }
  
    return dataPoints;
  };
  
  
  const res =  generateData()
  
  console.log({res})

  const numbers1 = manualUpdate; // Use manualUpdate for the chart data

  const labels = Array.from({ length: 12 }, (_, i) => (i + 1).toString()); // Labels from 1 to 12

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Consumer Demand",
        data: showDiv === 0 ? numbers1 : generateData(),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
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
            return `Demand: ${tooltipItem.raw}`;
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
  const handleTextareaChange = (event) => {
    const value = event.target.value;
    setInputValue(value); // Update the state with the new input value

    // Convert input value to an array of numbers
    const valuesArray = value
      .split(",")
      .filter((val) => val.trim() !== "") // Remove empty values
      .map((val) => parseFloat(val.trim()))
      .filter((val) => !isNaN(val)); // Remove NaN values

    // Check if the array length is greater than 12 or empty
    if (valuesArray.length === 0) {
      setManualEntryError("Error: The input is empty.");
    } else if (valuesArray.length > 12) {
      setManualEntryError(
        "Error: The array length exceeds the maximum limit of 12."
      );
    } else {
      // No errors, update the state with valid data
      setManualUpdate(valuesArray);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <BsFileBarGraph className="text-xl" />
        <h1 className="text-xl font-bold">Final Consumer Demand</h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
        <div className="md:w-[80%] lg:w-[50%] p-5">
          <div className="flex items-center justify-between border-b ">
            <h2
              onClick={() => setShowDiv(0)}
              className={`text-lg font-bold ${
                showDiv === 0 && "border-b-2 border-pink-400"
              }`}
            >
              Manual update
            </h2>
            <h2
              onClick={() => setShowDiv(1)}
              className={`text-lg font-bold ${
                showDiv === 1 && "border-b-2 border-pink-400"
              }`}
            >
              Generate Demand
            </h2>
          </div>

          {showDiv === 0 && (
            <div>
              <h2 className="mt-2">
                Modify the values below or simply copy/paste a list of cells
                from an Excel spreadsheet:
              </h2>

              <textarea
                placeholder="4, 8, 8, 8, 8"
                className="w-full h-40 border mt-5 p-2"
                value={inputValue} // Join the array to display in textarea
                onChange={handleTextareaChange}
              />
              {/* <p className="text-red-500">{ManualEntryError}</p> */}
            </div>
          )}

          {showDiv === 1 && (
            <div className="mt-5">
              <div className="flex items-center justify-between border-b">
                <h2 className="text-lg font-bold">Form Cycle</h2>
                <h2 className="text-lg font-bold">To Cycle</h2>
                <h2 className="text-lg font-bold">Average</h2>
                <h2 className="text-lg font-bold">Variability</h2>
              </div>

              <div className="h-40">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                  {row1.map((num, index) => (
                    <input
                      key={index}
                      type="number"
                      value={num}
                      disabled={index === 0 ? true : false}
                      onChange={(e) => handleChange(e, "row1", index)}
                      className="border w-28 h-8"
                    />
                  ))}
                </div>

                <p className="border my-2"></p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  {numbers2.map((num, index) => (
                    <input
                      key={index}
                      type="number"
                      value={num}
                      disabled={index === 0 || index === 1 ? true : false}
                      onChange={(e) => handleChange(e, "numbers2", index)}
                      className="border w-28 h-8"
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-center items-center gap-5">
                <button className="flex items-center gap-2 bg-yellow-400 px-4 py-2">
                  <IoMdRefresh /> Refresh
                </button>
                <button className="flex items-center gap-2 bg-[#2DC4B6] text-white px-4 py-2">
                  <FiPlus /> Add Segment
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Graph */}
        <div className="border-2 mt-14 w-full lg:w-[50%] h-full border-red-500">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default FinalConsumer;

import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import tv from "../../../assets/Game/tv.png";
import { useDispatch, useSelector } from "react-redux";

const Step4 = ({ setCurrentStep, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const {gameId, role, demo} = useParams();
  const {gameData} = useSelector((state) => state.game)
  console.log(gameData)
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const game = queryParams.get('game');
  const selected_station = queryParams.get('selected_station');

  const handleStart = async () => {
    onClose();
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="p-4 md:p-5">
            <h3 className="text-xl font-bold text-gray-900 ">
              Go to the next cycle
            </h3>
            <p className="text-sm text-gray-500 mt-2 w-[80%]">
              Once the connected players order the game goes to next cycle
              automatically
            </p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-10 mt-5 font-semibold">
              
              <h2 className="text-sm text-[#23BB86]">
                The supply chain with the lowest cost wins
              </h2>
            </div>
          </div>
          {error && <p className="text-red-500 px-5">{error}</p>}
          <div className="flex items-center p-4 md:p-5 gap-5 rounded-b dark:border-gray-600">
            <button
              type="button"
              className="text-[#34B3F1] bg-white hover:bg-blue-500 hover:text-white border border-[#34B3F1] text-sm px-6 py-2 rounded-lg"
              onClick={() => setCurrentStep(3)}
              disabled={isLoading}
            >
              BACK
            </button>
            <button
              type="button"
              className="text-white bg-[#34B3F1] hover:bg-blue-500 text-sm px-6 py-2 rounded-lg"
              onClick={handleStart}
              disabled={isLoading}
            >
              {isLoading ? "LOADING..." : "START"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
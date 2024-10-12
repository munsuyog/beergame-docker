import { useDispatch, useSelector } from "react-redux";
import { joinStation } from "../../store/reducers/gameSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Modal1 = ({ setName, onClose }) => {
  const { gameData } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { gameId, role, demo } = useParams();
  console.log(gameId);

  const [playerName, setPlayerName] = useState("");

  const handleStart = async () => {
    if (gameData) {
      dispatch(
        joinStation({
          selectedGame: gameData.team_name,
          playerName: gameData.player_name,
          password: gameData.play_password,
          selectedStation: gameData.selected_station,
        })
      );
      onClose();
    } else {
      dispatch(
        joinStation({
          selectedGame: gameId,
          playerName: playerName,
          password: "play",
          selectedStation: role 
        })
      );
      onClose();
    }
  };

  return (
    <div>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-lg max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Start Game
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleStart} className="p-4 md:p-5">
              <div className="mb-2 text-center">
                Enter your name and press start game when you're ready
              </div>
              <div className="grid gap-4 mb-4 grid-cols-1">
                <input
                  className="border border-blue-900 p-2 rounded-lg"
                  placeholder="Enter Name"
                  value={playerName}
                  required
                  onChange={(e) => {
                    setPlayerName(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="text-white inline-flex items-center max-w-[100px] px-5 h-[40px] justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-auto mr-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Start
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
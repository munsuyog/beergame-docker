import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const GameEndedModal = () => {
  const dispatch = useDispatch();
  const { gameId, role, demo } = useParams();

  const [playerName, setPlayerName] = useState("");

  return (
    <div>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Game has ended!
              </h3>
            </div>
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-1">
                <Link
                  to={`/stats/${gameId}`}
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Go to Debrief
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameEndedModal;

import stocks from "../../assets/Game/participants.svg";
import participants from "../../assets/Game/participants.svg";
import orders from "../../assets/Game/orders.svg";
import week from "../../assets/Game/weeks.svg";
import Game from "./Game";
import { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { CiDeliveryTruck, CiMoneyBill } from "react-icons/ci";
import { IoTriangle } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import arrow from "../../assets/modal/arrow.png";
import whole from "../../assets/modal/whole.png";
import wholeSeller from "../../assets/Game/wholesaler.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameStatus } from "../../store/reducers/gameSlice";

const GameScreen = ({ name, setName, setShowModal1 }) => {
  const [move1, setMove1] = useState(false);
  const [move2, setMove2] = useState(false);
  const [move3, setMove3] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(true);
  const dispatch = useDispatch();

  const { stationStatus, gameStatus } = useSelector((state) => state.game);
  const { gameId, role } = useParams();

  useEffect(() => {
    dispatch(getGameStatus({ gameId, stationId: role }));
  }, []);
  const { demo } = useParams();

  const handleToggleModal = () => {
    if(!shouldShowModal && isOpen) {
      setIsOpen(!isOpen);
    } else if (shouldShowModal && !isOpen) {
      setIsOpen(!isOpen)
    } else if (!shouldShowModal && !isOpen) {
      return
    } else {
      setIsOpen(!isOpen)
    }
  };

  const getIncomingOrder = (obj) => {
    if (obj && typeof obj === "object") {
      const subObjects = obj;
      for (const key in subObjects) {
        if (subObjects.hasOwnProperty(key)) {
          return subObjects[key];
        }
      }
    }
    return null;
  };

  function getIncomingOrderKey(obj) {
    if (obj && typeof obj === "object") {
      const subObjects = obj;
      for (const key in subObjects) {
        if (subObjects.hasOwnProperty(key)) {
          return key;
        }
      }
    }
    return null;
  }

  const getShipments = () => {
    if (gameStatus && gameStatus.data && gameStatus.data.deliveries && role) {
      return gameStatus.data.deliveries[role][gameStatus.week - 1] || 0;
    }
    return 0;
  };

  return (
    <div className="lg:mt-[100px] md:mt-[100px] mt-[200px] w-[1200px] flex-1 overflow-hidden">
      <div className="grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-4 justify-between items-center w-[auto] lg:w-[auto]  gap-5 ml-2 lg:ml-4 border-2 rounded-md py-2 px-5 ">
        <div className="flex items-center gap-5">
          <img src={participants} className="w-5" alt="" />
          <p>Paticipants 1/{demo ? "1" : "4"}</p>
        </div>
        <div className="flex items-center gap-5">
          <img src={orders} className="w-5" alt="" />
          <p>
            Orders {stationStatus && stationStatus.players_completed_turn}/1
          </p>
        </div>
        <div className="flex items-center gap-5">
          <img src={week} className="w-5" alt="" />
          <p>Week {stationStatus && stationStatus.current_week}</p>
        </div>
        <div className="flex items-center gap-5">
          <img src={week} className="w-5" alt="" />
          <p>Stocks {stationStatus && stationStatus.inventory}</p>
        </div>
      </div>

      <div>
        {/* <button
          onClick={handleToggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Toggle modal
        </button> */}

        {isOpen && (
          <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-[200] flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-gray-500 bg-opacity-75"
          >
            <div className="relative p-4 w-full max-w-4xl max-h-full">
              {" "}
              {/* Increased max-w-2xl to max-w-4xl */}
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900 w-full text-center">
                    What happens week{" "}
                    <span>
                      {stationStatus ? stationStatus.current_week : 0}
                    </span>
                    ?
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    onClick={handleToggleModal}
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
                <div className="p-4 md:p-5 space-y-4 flex items-center justify-between border-b">
                  <div className="">
                    <div className="p-10">
                      <h1 className="flex items-center gap-2">
                        <MdEmail /> Incoming Order:{" "}
                        <span className="text-red-500">
                          {stationStatus && stationStatus.incomming_order
                            ? getIncomingOrder(stationStatus.incomming_order)
                            : "?"}
                        </span>
                      </h1>
                      <p>
                        from{" "}
                        {stationStatus && stationStatus.incomming_delivery
                          ? getIncomingOrderKey(stationStatus.incomming_order)
                          : "?"}
                      </p>
                      <img src={arrow} className="w-48" alt="" />
                    </div>
                    <div className="p-10">
                      <img
                        src={arrow}
                        className="w-48 transform -scale-x-100"
                        alt="Reversed arrow"
                      />
                      <h1 className="flex items-center gap-2">
                        <CiDeliveryTruck /> Shipments:{" "}
                        <span className="text-[#71D4CA]">
                          {gameStatus
                            ? getShipments()
                            : "?"}
                        </span>
                      </h1>
                      <p>
                        from{" "}
                        {stationStatus.incomming_delivery
                          ? getIncomingOrderKey(
                              stationStatus.incomming_delivery
                            )
                          : "?"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <img src={wholeSeller} className="w-24 mx-auto" alt="" />
                    <div className="p-10 shadow-xl rounded-3xl">
                      <img src={whole} alt="" />
                    </div>
                  </div>
                  <div className="p-10">
                    <img
                      src={arrow}
                      className="w-48 transform -scale-x-100"
                      alt="Reversed arrow"
                    />
                    <h1 className="flex items-center gap-2">
                      <CiDeliveryTruck /> Received:{" "}
                      <span className="text-[#71D4CA]">
                        {stationStatus.incomming_delivery
                          ? getIncomingOrder(stationStatus.incomming_delivery)
                          : "?"}
                      </span>
                    </h1>
                    <p>
                      from{" "}
                      {stationStatus.incomming_delivery
                        ? getIncomingOrderKey(stationStatus.incomming_delivery)
                        : "?"}
                    </p>
                  </div>
                </div>

                <div className="w-[80%] mx-auto flex justify-between items-center p-5">
                  <div className="flex items-center gap-2">
                    <IoTriangle />
                    <h1>
                      Stock: {stationStatus ? stationStatus.inventory : "?"}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <CiMoneyBill />
                    <h1>Cost: {stationStatus.total_cost}</h1>
                  </div>
                </div>

                <div className="flex items-center justify-between flex-row-reverse p-4 md:p-5 border-t border-gray-200 rounded-b">
                  <button
                    onClick={handleToggleModal}
                    type="button"
                    className="text-white bg-[#E96E79]  font-medium rounded-3xl text-xl px-5 py-2.5 text-center"
                  >
                    Next step: Order
                  </button>
                  <button
                    //   onClick={handleToggleModal}
                    type="button"
                    className="py-2.5 px-5 ms-3 flex items-center gap-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg"
                  >
                    <input type="checkbox" name="" id="" value={shouldShowModal} onChange={(e) => {setShouldShowModal(!e.target.checked)}} />
                    Don't show this panel each week
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="my-0 md:my-0 lg:mt-4 w-[1200px] lg:h-[900px] md:h-[90vh] h-[86vh] flex items-center justify-center pt-10 bg-[#DDF6FF]">
        <Game
          handleToggleModal={handleToggleModal}
          name={name}
          setName={setName}
          setShowModal1={setShowModal1}
          move1={move1}
          setMove1={setMove1}
          move2={move2}
          setMove2={setMove2}
          move3={move3}
          setMove3={setMove3}
        />
      </div>
    </div>
  );
};

export default GameScreen;

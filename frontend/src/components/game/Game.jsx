import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/all";
import { LuRefreshCcw } from "react-icons/lu";
import { MdComputer, MdOutlineEdit } from "react-icons/md";
import Map from "../GameMap/GameMap";
import { useLocation, useParams } from "react-router-dom";
import {
  getStationStatus,
  submitTurn,
  getGameStatus,
} from "../../store/reducers/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingContext } from "../../contexts/LoadingContext";
import GameEndedModal from "./GameEndedModal";

const Game = ({ move1, setMove1, handleToggleModal }) => {
  const dispatch = useDispatch();

  const [reset, setReset] = useState(false);

  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [value, setValue] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showGameEndedModal, setShowGameEndedModal] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selected_station = queryParams.get("selected_station");
  const {
    gameData,
    loading,
    error,
    stationStatus,
    playScreenInfo,
    gameStatus,
  } = useSelector((state) => state.game);

  const { gameId, role, demo } = useParams();

  const [isWaiting, setIsWaiting] = useState(false);
  const [isMessageModalOpen ,setIsMessageModalOpen] = useState(false);
  const [scriptMessage, setScriptMessage] = useState("");
  const [lastScriptShown, setLastScriptShown] = useState("");

  const [lastMovedWeek, setLastMovedWeek] = useState(-1);
  const boatMovedRef = useRef(false);

  useEffect(() => {
    if (stationStatus && stationStatus.current_week) {
      setCurrentWeek(stationStatus.current_week);
    }
  }, [stationStatus]);

  const prevWeekRef = useRef();

  useEffect(() => {
    if (stationStatus && gameStatus && gameStatus.waitingfor) {
        const isCurrentRoleWaiting = gameStatus.waitingfor.includes(role);
        const currentWeek = stationStatus.current_week;

        // Check if the week has changed
        if (prevWeekRef.current !== undefined && prevWeekRef.current !== currentWeek) {
            // Week has changed, so trigger the animation
            setMove1(true);
            setIsWaiting(false); // Reset waiting state
            boatMovedRef.current = true;
            setLastMovedWeek(currentWeek); // Store the last moved week

            // Perform other actions based on week change if needed
        }

        // Store the current week as the previous week for the next render
        prevWeekRef.current = currentWeek;

        // Handle game end
        if (stationStatus.game_done) {
            setShowGameEndedModal(true);
        }

        // Handle waiting logic
        if (!isCurrentRoleWaiting && gameStatus.waitingfor.length !== 0) {
            setIsWaiting(true);
        } else if (isCurrentRoleWaiting) {
            setHasSubmitted(true);
            setIsWaiting(false); // Reset waiting state
        }
    }
}, [gameStatus, role, stationStatus]);

  useEffect(() => {
    if (move1) {
      moveBoat();
    }
  }, [move1]);

  function getIncomingOrder(obj) {
    if (obj && typeof obj === "object") {
      const subObjects = obj;
      for (const key in subObjects) {
        if (subObjects.hasOwnProperty(key)) {
          return subObjects[key];
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

  useEffect(() => {
    if (!loading && !error && (gameData || gameId || role)) {
      const getStationDetails = async () => {
        if (demo) {
          dispatch(
            getStationStatus({
              gameId: gameData.team_name,
              stationId: gameData.selected_station,
            })
          );
          dispatch(
            getGameStatus({
              gameId: gameData.team_name,
              stationId: gameData.selected_station,
            })
          );
        } else {
          dispatch(getStationStatus({ gameId: gameId, stationId: role }));
          dispatch(getGameStatus({ gameId: gameId, stationId: role }));
        }
      };

      getStationDetails();
      const intervalId = setInterval(getStationDetails, 1000); // 5000 ms = 5 seconds

      return () => clearInterval(intervalId);
    }

    // Clean up the interval when the component unmounts
  }, []);

  const [modalName, setModalName] = useState("Manufacturer");

  useEffect(() => {
    if (role) {
      setModalName(role);
    }
  }, [role]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (stationStatus?.script && stationStatus.script !== lastScriptShown && stationStatus.script !== "") {
      setScriptMessage(stationStatus.script);
      setIsMessageModalOpen(true);
      setLastScriptShown(stationStatus.script); // Update the last script shown
    }
  }, [stationStatus, lastScriptShown]);


  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputName = e.target.elements.name.value;
    setName(inputName);
    setIsModalOpen(false);
  };

  const handleSubmitTurn = async (value) => {
    const game_id = gameData ? gameData.team_name : gameId; // Get this from your game state or props
    const stationId = gameData ? gameData.selected_station : role; // Get this from your game state or props
    const week = currentWeek; // Get the current week from your game state

    // Extract suppliers and customers from playScreenInfo
    const suppliersList = playScreenInfo.suppliers; // Assuming playScreenInfo is in scope
    const customersList = playScreenInfo.customers; // Assuming playScreenInfo is in scope

    // Construct the suppliers and customers objects
    const suppliers = {};
    suppliersList.forEach((supplier) => {
      suppliers[supplier] = value;
    });

    const customers = {};
    customersList.forEach((customer) => {
      customers[customer] = currentWeek === 0 ? 0 : getShipments();
    });

    // Dispatch the action
    dispatch(
      submitTurn({ gameId: game_id, stationId, week, suppliers, customers })
    );
    setHasSubmitted(true);
    boatMovedRef.current = false;
  };

  const handleValue = async (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.value.value;
    setValue(inputValue);
    await handleSubmitTurn(inputValue);
  };

  const boat1_1 = useRef();
  const boat1_2 = useRef();
  const boat1_3 = useRef();
  const boat1_4 = useRef();
  const boat1_5 = useRef();
  const boat1_6 = useRef();
  const boat1_7 = useRef();
  const { contextSafe } = useGSAP();

  gsap.registerPlugin(MotionPathPlugin);
  const moveBoat = contextSafe(() => {
    const masterTimeline = gsap.timeline({
      onComplete: () => {
        gsap.delayedCall(1, () => {
          gsap.set(boat1_1.current, { clearProps: "all" });
          gsap.set(boat1_2.current, { clearProps: "all" });
          gsap.set(boat1_3.current, { clearProps: "all" });
          gsap.set(boat1_4.current, { clearProps: "all" });
          gsap.set(boat1_5.current, { clearProps: "all" });
          gsap.set(boat1_6.current, { clearProps: "all" });
          gsap.set(boat1_7.current, { clearProps: "all" });
        });
      },
    });

    // Define the motion paths
    const path1 = [
      { x: 0, y: -10 },
      { x: 5, y: -20 },
      { x: 50, y: -35 },
      { x: 150, y: -50 },
    ];
    const path2 = [{ x: 500, y: -85 }];
    const path3 = [
      { x: 150, y: -2 },
      { x: 175, y: -5 },
      { x: 200, y: -10 },
      { x: 350, y: 5 },
    ];
    const path5 = [{ x: -70, y: 400 }];
    const path6 = [
      { x: 0, y: 10 },
      { x: -10, y: 100 },
      { x: 5, y: 150 },
    ];
    const path8 = [
      { x: 0, y: 0 },
      { x: -30, y: 5 },
      { x: -100, y: 10 },
      { x: -200, y: 5 },
    ];
    const path9 = [
      { x: -150, y: 5 },
      { x: -200, y: 7 },
      { x: -350, y: 10 },
      { x: -400, y: 15 },
    ];
    const path10 = [
      { x: -120, y: 0 },
      { x: -140, y: 2 },
      { x: -150, y: 4 },
    ];
    const path11 = [
      { x: -180, y: 5 },
      { x: -200, y: 5 },
    ];
    const path12 = [
      { x: 0, y: 0 },
      { x: -100, y: 0 },
    ];

    // Define individual timelines for each boat
    const timeline1 = gsap.timeline();
    timeline1
      .to(boat1_1.current, {
        duration: 1,
        rotate: -80,
        ease: "power1.inOut",
      })
      .to(boat1_1.current, {
        duration: 1,
        motionPath: { path: path1, curviness: 1 },
        rotate: -30,
        ease: "power1.inOut",
      })
      .to(boat1_1.current, {
        duration: 1,
        motionPath: { path: path2, curviness: 1 },
        rotate: -20,
        ease: "power1.inOut",
      })
      .to(boat1_1.current, {
        duration: 1,
        opacity: 0,
        ease: "power1.inOut",
      });

    const timeline2 = gsap.timeline();
    timeline2
      .to(boat1_2.current, {
        duration: 3,
        motionPath: { path: path3, curviness: 1 },
        ease: "power1.inOut",
      })
      .to(boat1_2.current, {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          setReset(true);
        },
        ease: "power1.inOut",
      });

    const timeline3 = gsap.timeline();
    timeline3
      .to(boat1_3.current, {
        duration: 3,
        motionPath: { path: path5, curviness: 1 },
        ease: "power1.inOut",
      })
      .to(boat1_3.current, {
        duration: 1,
        opacity: 0,
        ease: "power1.inOut",
      });

    const timeline4 = gsap.timeline();
    timeline4
      .to(boat1_4.current, {
        duration: 3,
        motionPath: { path: path6, curviness: 1 },
        ease: "power1.inOut",
      })
      .to(boat1_4.current, {
        duration: 1,
        opacity: 0,
        ease: "power1.inOut",
      });

    const timeline5 = gsap.timeline();
    timeline5.to(boat1_5.current, {
      duration: 3,
      motionPath: { path: path9, curviness: 1 },
      opacity: 0,
      ease: "power1.inOut",
    });

    const timeline6 = gsap.timeline();
    timeline6
      .to(boat1_6.current, {
        duration: 3,
        motionPath: { path: path10, curviness: 1 },
        ease: "linear",
      })
      .to(boat1_6.current, {
        duration: 1,
        motionPath: { path: path11, curviness: 1 },
        opacity: 0,
        ease: "power1.inOut",
      });

    const timeline7 = gsap.timeline();
    timeline7.to(boat1_7.current, {
      duration: 4,
      motionPath: { path: path12, curviness: 1 },
      opacity: 0,
      ease: "power1.inOut",
      onComplete: () => {
        setMove1(false);
        setHasSubmitted(false);
        boatMovedRef.current = false;
        setTimeout(() => {
            handleToggleModal();
        }, 1000);
      },
    });

    masterTimeline.add(timeline1, 1);
    masterTimeline.add(timeline2, 1);
    masterTimeline.add(timeline3, 1);
    masterTimeline.add(timeline4, 1);
    masterTimeline.add(timeline5, 1);
    masterTimeline.add(timeline6, 1);
    masterTimeline.add(timeline7, 1);
  });

  useEffect(() => {
    if (move1) {
      moveBoat();
    }
  }, [move1]);
 
  return (
    <div className="w-full flex justify-center items-center">
      <Map />
      <div className=" w-full h-[900px] relative">
        <div
          className="Boat w-20 h-[4.6rem] absolute  top-[80px] left-[10vw]"
          ref={boat1_1}
        >
          {((gameData && gameData.selected_station == "Manufacturer") ||
            (gameId && role == "Manufacturer")) && (
            <p className="text-[1.2rem] font-bold">
              {gameStatus && getShipments()}
            </p>
          )}
        </div>
        <div
          className="Boat2 w-20 h-[4.6rem] absolute top-[6vw] right-[12vw] rotate-distributor"
          ref={boat1_3}
        >
          {((gameData && gameData.selected_station == "Distributor") ||
            (gameId && role == "Distributor")) && (
            <p className="text-[1.2rem] font-bold">
              {gameStatus && getShipments(stationStatus)}
            </p>
          )}
        </div>
        <div
          className="Boat2 w-20 h-[4.6rem] absolute bottom-[300px] right-[352px] rotate-wholesaler"
          ref={boat1_5}
        >
          {((gameData && gameData.selected_station == "Wholesaler") ||
            (gameId && role == "Wholesaler")) && (
            <p className="text-[1.2rem] font-bold">
              {gameStatus && getShipments(stationStatus)}
            </p>
          )}
        </div>
        <div
          className="Boat w-20 h-[4.6rem] absolute  bottom-[300px] left-[144px] rotate-retailer"
          ref={boat1_7}
        >
          {((gameData && gameData.selected_station == "Retailer") ||
            (gameId && role == "Retailer")) && (
            <p className="text-[1.2rem] font-bold">
              {gameStatus && getShipments(stationStatus)}
            </p>
          )}
        </div>

        {/* Boxes in the corners */}

        {modalName && (
          <div className="absolute z-[120] bottom-[250px] left-[24%] w-[40%] text-center bg-white rounded-3xl bg-opacity-80 py-2">
            <div className="flex items-center justify-between px-5">
              <div></div>
              <h2 className="font-bold text-xl">{modalName}</h2>
              <div className="flex items-center gap-2">
                <LuRefreshCcw />
                <MdComputer />
              </div>
            </div>
            <div className="border-t mt-5 p-5">
              <div className="flex items-center justify-between">
                <h2>
                  Stock:{" "}
                  <span className="font-bold">
                    {stationStatus ? stationStatus.inventory : "?"}
                  </span>
                </h2>
                <form onSubmit={handleValue}>
                  <div className="flex items-center">
                    <input
                      type="number"
                      placeholder="Quantity"
                      name="value"
                      id="value"
                      className="h-[3rem] w-[100px]"
                      style={{
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px",
                      }}
                      disabled={isWaiting}
                    />
                    {isWaiting ? (
                      <div
                        className="flex items-center justify-center bg-orange-500 py-2 px-5 h-[3rem] text-white"
                        style={{
                          borderTopRightRadius: "20px",
                          borderBottomRightRadius: "20px",
                        }}
                      >
                        Waiting...
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="bg-orange-500 py-2 px-5 h-[3rem] text-white"
                        style={{
                          borderTopRightRadius: "20px",
                          borderBottomRightRadius: "20px",
                        }}
                      >
                        Order
                      </button>
                    )}
                  </div>
                </form>

                <h2>
                  Cost:{" "}
                  <span className="font-bold text-red-500">
                    {stationStatus ? stationStatus.total_cost : "?"}
                  </span>
                </h2>
              </div>
              <div className="flex items-center justify-between gap-5 text-base mt-5">
                <div className="flex items-center gap-2">
                  <h2>Receipt:</h2>
                  <h2 className="text-blue-500 font-bold">
                    {stationStatus
                      ? getIncomingOrder(stationStatus.incomming_delivery)
                      : "?"}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <h2>Backorders:</h2>
                  <h2 className="text-blue-500 font-bold">
                    {stationStatus
                      ? getIncomingOrder(stationStatus.backorder)
                      : "?"}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <h2>Incoming Order:</h2>
                  <h2 className="text-red-500 font-bold">
                    {stationStatus
                      ? getIncomingOrder(stationStatus.incomming_order)
                      : "?"}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h3 className="text-lg font-semibold text-gray-900 ">
                    Enter Your Name
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                    onClick={handleCloseModal}
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
                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {showGameEndedModal && <GameEndedModal />}
        {isMessageModalOpen && <MessageModal message={scriptMessage} onClose={handleCloseMessageModal} />}
      </div>
    </div>
  );
};

const MessageModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Game Message</h2>
        <p className="text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Game;
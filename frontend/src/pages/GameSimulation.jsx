import { useEffect, useRef, useState } from "react";
import GameSideBar from "../components/game/GameSideBar";
import GameNav from "../components/game/GameNav";
import GameScreen from "../components/game/GameScreen";
import Modal1 from "../components/game/Modal1";
import Modal2 from "../components/game/Modal2/Modal2";
import StatisticsModal from "../components/game/StatisticsModal/StatisticsModal";
import GameEndedModal from '../components/game/GameEndedModal'
import { useSelector } from "react-redux";

const GameSimulation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState("sessions");
  const [showModal1, setShowModal1] = useState(true);
  const [showModal2, setShowModal2] = useState(false);
  const [isGameEndedModal, setGameEndedModal] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [name, setName] = useState("");
  const gameContainerRef = useRef(null);
  const [shouldShowModal, setShouldShowModal] = useState(true);

  const {stationStatus} = useSelector((state) => state.game);

  useEffect(() => {
    if(stationStatus && stationStatus.game_done == true) {
      setGameEndedModal(true);
    } else {
      setGameEndedModal(false)
    }
  }, [])

  const handleShowStatistics = () => {
    setShowStatistics(!showStatistics);
  };

  useEffect(() => {
    const handleResize = () => {
      const gameContainer = gameContainerRef.current;

      // The desired width and height in pixels
      const baseWidth = 1440; // Adjust according to your design
      const baseHeight = 800; // Adjust according to your design

      // Calculate the scale based on the available viewport size
      const scaleX = window.innerWidth / baseWidth;
      const scaleY = window.innerHeight / baseHeight;

      // Use the smaller scale to maintain the aspect ratio
      const scale = Math.min(scaleX, scaleY);

      // Apply the scale
      gameContainer.style.transform = `scale(${scale})`;
      gameContainer.style.transformOrigin = "top left";

      // Center the game container on the screen
      gameContainer.style.position = "absolute";
      gameContainer.style.left = `calc(50% - ${baseWidth * scale / 2}px)`;
      gameContainer.style.top = `calc(50% - ${baseHeight * scale / 2}px)`;
    };

    // Initial call to handleResize
    handleResize();

    // Add event listener to resize the game container on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#fafafa] justify-center items-center overflow-hidden">
      <div ref={gameContainerRef} className="game-container">
        <GameSideBar
          setIsExpanded={setIsExpanded}
          isExpanded={isExpanded}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          showStatistics={showStatistics}
          handleShowStatistics={handleShowStatistics}
        />
        <div className="ml-[20%] md:ml-[10%] lg:ml-[20%] w-full h-full flex justify-start items-start">
          <div className="w-full">
            <GameNav isExpanded={isExpanded} />
            {showModal1 && (
              <Modal1
                setName={setName}
                onClose={() => {
                  setShowModal1(false);
                  setShowModal2(true);
                }}
              />
            )}
            {showStatistics && (
              <StatisticsModal onClose={handleShowStatistics} />
            )}
            {showModal2 && <Modal2 onClose={() => setShowModal2(false)} />}
            {!showModal1 && !showModal2 && (
              <GameScreen
                name={name}
                setName={setName}
                setShowModal1={setShowModal1}
                setShouldShowModal={setShouldShowModal}
              />
            )}
            {
              isGameEndedModal && (
                <GameEndedModal />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSimulation;
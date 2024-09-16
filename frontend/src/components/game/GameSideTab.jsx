import React from "react";
import reset from "../../assets/Game/reset.svg";
import amimation from "../../assets/Game/animation.svg";
import statistics from "../../assets/Game/statistics.svg";
import fast from "../../assets/Game/fast.svg";
import instructions from "../../assets/Game/instructions.svg";
import { useSelector } from "react-redux";

const GameSideTab = ({
  selectedTab,
  setSelectedTab,
  isExpanded,
  isLargeScreen,
  handleShowStatistics
}) => {
  const {gameStatus} = useSelector((state) => state.game);
  return (
    <div className=" w-full h-[full] flex flex-col justify-center items-center mt-10">
      {/* //first */}
      {/* <div
        className={`cursor-pointer bg-[#EB5757] px-0 md:px-2 lg:px-8 w-[4rem] md:w-[5rem] ${isExpanded ? "w-[8rem] px-2 md:w-[11rem]" : ""} lg:w-[12rem] flex justify-between items-center h-[3rem] rounded-full ${
          selectedTab === "reset" ? "bg-red-800" : ""
        }`}
        onClick={() => handleTab("reset")}
      >
        <div
          className={`w-[75%] h-full flex justify-start items-center ${
            isExpanded ? "block" : isLargeScreen ? "block" : "hidden"
          }`}
        >
          <p className="text-base text-white">Reset</p>
        </div>
        <div
          className={` ${
            isExpanded ? "w-[20%]" : isLargeScreen ? "w-[20%]" : "w-[50%] mx-auto"
          }  h-full flex justify-center items-center`}
        >
          <img src={reset} alt="" style={{ transform: "scale(1.2)" }} />
        </div>
      </div> */}

      {/* //second */}
      {/* <div
        className={` cursor-pointer bg-blue-500 px-0 md:px-2 lg:px-8 w-[4rem] md:w-[5rem] ${isExpanded ? "w-[8rem] px-2 md:w-[11rem]" : ""} lg:w-[12rem] flex justify-between items-center h-[3rem] rounded-full my-5 ${
          selectedTab === "animation" ? "bg-blue-800" : ""
        }`}
        onClick={() => handleTab("animation")}
      >
        <div
          className={`w-[75%] h-full flex justify-start items-center ${
            isExpanded ? "block" : isLargeScreen ? "block" : "hidden"
          }`}
        >
          <p className="text-base text-white">Animations</p>
        </div>
        <div
          className={` ${
            isExpanded ? "w-[20%]" : isLargeScreen ? "w-[20%]" : "w-[100%]"
          }  h-full flex justify-center items-center`}
        >
          <img src={amimation} alt="" style={{ transform: "scale(1.2)" }} />
        </div>
      </div> */}

      {/* //third */}
      <div
        className={` cursor-pointer flex bg-[#23BB86] justify-between items-center px-0 md:px-2 lg:px-8 w-[4rem] md:w-[5rem] ${isExpanded ? "w-[8rem] px-2 md:w-[11rem]" : ""} lg:w-[12rem] h-[3rem] rounded-full ${
          selectedTab === "statistics" ? "bg-green-800" : ""
        }`}
        onClick={() => handleShowStatistics()}
      >
        <div
          className={`w-[75%] h-full flex justify-start items-center ${
            isExpanded ? "block" : isLargeScreen ? "block" : "hidden"
          }`}
        >
          <p className="text-base text-white">Statistics</p>
        </div>
        <div
          className={` ${
            isExpanded ? "w-[20%]" : isLargeScreen ? "w-[20%]" : "w-[100%]"
          }  h-full flex justify-center items-center`}
        >
          <img src={statistics} alt="" style={{ transform: "scale(1.2)" }} />
        </div>
      </div>

      {/* //fourth */}
      {/* <div
        className={` cursor-pointer bg-gray-200 flex justify-between items-center px-0 md:px-2 lg:px-8 w-[4rem] md:w-[5rem] ${isExpanded ? "w-[8rem] px-2 md:w-[11rem]" : ""} lg:w-[12rem] h-[3rem] rounded-full my-5 ${
          selectedTab === "fast" ? "bg-gray-300" : ""
        }`}
        onClick={() => handleTab("fast")}
      >
        <div
          className={`w-[75%] h-full flex justify-start items-center ${
            isExpanded ? "block" : isLargeScreen ? "block" : "hidden"
          }`}
        >
          <p className="text-base text-[#0091D1]">Fast Forward</p>
        </div>
        <div
          className={` ${
            isExpanded ? "w-[20%]" : isLargeScreen ? "w-[20%]" : "w-[100%]"
          }  h-full flex justify-center items-center`}
        >
          <img src={fast} alt="" style={{ transform: "scale(1.2)" }} />
        </div>
      </div> */}

      {/* //fifth */}
      {/* <div
        className={` cursor-pointer bg-gray-200 flex justify-between items-center px-0 md:px-2 lg:px-8 w-[4rem] md:w-[5rem] ${isExpanded ? "w-[8rem] px-2 md:w-[11rem]" : ""} lg:w-[12rem] h-[3rem] rounded-full ${
          selectedTab === "instruction" ? "bg-gray-300" : ""
        }`}
        onClick={() => handleTab("instruction")}
      >
        <div
          className={`w-[75%] h-full flex justify-start items-center ${
            isExpanded ? "block" : isLargeScreen ? "block" : "hidden"
          }`}
        >
          <p className="text-base text-black">Instructions</p>
        </div>
        <div
          className={` ${
            isExpanded ? "w-[20%]" : isLargeScreen ? "w-[20%]" : "w-[100%]"
          }  h-full flex justify-center items-center`}
        >
          <img src={instructions} alt="" style={{ transform: "scale(1.2)" }} />
        </div>
      </div> */}

{gameStatus?.waitingfor?.length > 0 && (
        <div className="mt-8 w-full ">
          <h3 className="text-lg font-bold text-gray-700 mb-2 text-center ">Waiting for:</h3>
          <div className="flex flex-col flex-wrap gap-2">
            {gameStatus.waitingfor.map((role, index) => (
              <div
                key={index}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md text-center"
              >
                {role}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default GameSideTab;

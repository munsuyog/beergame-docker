import React, { useState, useEffect } from "react";
import SideTab from "./SideTab";
import Pro from "./Pro";

const SideBar = ({
  isExpanded,
  setIsExpanded,
  setSelectedTab,
  selectedTab,
  toggleMessageCenter
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const updateIsLargeScreen = () => {
    if (window.innerWidth >= 1024) {
      // Adjust based on your definition of 'desktop'
      setIsLargeScreen(true);
    } else {
      setIsLargeScreen(isExpanded); // Set based on sidebar state for tablets and mobile
    }
  };

  useEffect(() => {
    // Initial check
    updateIsLargeScreen();

    // Set up resize event listener
    window.addEventListener("resize", updateIsLargeScreen);

    // Clean up listener on component unmount
    return () => window.removeEventListener("resize", updateIsLargeScreen);
  }, [isExpanded]);

  return (
    <div
      className={`fixed w-100vw top-0 left-0 h-full transition-all duration-300 ease-in-out z-40 ${
        isExpanded
          ? "lg:w-[20%] md:w-[40%] w-[100%]"
          : "lg:w-[20%] md:w-[10%] w-[20%]"
      } bg-[#0091D1] text-white`}
    >
      <button
        className={`absolute max-w-fit top-4 right-2 left-2 bg-[#ffffff9d] text-white p-2 rounded ${
          // Hide button on desktop screens
          "lg:hidden block"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Close" : "Open"}
      </button>
      <div className="p-4 w-full  h-full flex flex-col">
        <div className="h-[60%] w-full flex flex-col justify-evenly items-center">
          <SideTab
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
            isExpanded={isExpanded}
            isLargeScreen={isLargeScreen}
            toggleMessageCenter={toggleMessageCenter}
          />
        </div>
        <Pro isExpanded={isExpanded} isLargeScreen={isLargeScreen} />
      </div>
    </div>
  );
};

export default SideBar;

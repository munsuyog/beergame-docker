import React from "react";
import sessionIcon from "../../assets/dashboard/sessions.svg";
import settingsIcon from "../../assets/dashboard/settings.svg";
import templateIcon from "../../assets/dashboard/template.svg";
import { MessageCircle } from "lucide-react";
const SideTab = ({
  selectedTab,
  setSelectedTab,
  isExpanded,
  isLargeScreen,
  toggleMessageCenter
}) => {
  const handleTab = (tabName) => {
    setSelectedTab(tabName);
  };
  return (
    <div className=" w-full h-[20rem] flex flex-col justify-evenly items-center ">
      {/* //first */}
      <div
        className={` cursor-pointer px-8 w-[12rem] flex justify-between items-center  h-[4rem] rounded-lg ${
          selectedTab === "sessions" ? "bg-[#ffffff50]" : ""
        }`}
        onClick={() => handleTab("sessions")}
      >
        <div
          className={` ${
            isExpanded ? "w-[20%]" : isLargeScreen ? "w-[20%]" : "w-[100%]"
          }  h-full flex justify-center items-center`}
        >
          <img src={sessionIcon} alt="" style={{ transform: "scale(1.2)" }} />
        </div>
        <div
          className={`w-[75%] h-full flex justify-start items-center ${
            isExpanded ? "block" : isLargeScreen ? "block" : "hidden"
          }`}
        >
          <p className="text-xl text-white">Sessions</p>
        </div>
      </div>

      {/* //second */}
      <div
        className={` cursor-pointer px-8 w-[12rem] flex justify-between items-center h-[4rem] rounded-lg ${
          selectedTab === "upgrade" ? "bg-[#ffffff50]" : ""
        }`}
        onClick={() => handleTab("upgrade")}
      >
        <div
          className={` ${
            isExpanded ? "w-[20%]" : isLargeScreen ? "w-[20%]" : "w-[100%]"
          }  h-full flex justify-center items-center`}
        >
          <img src={templateIcon} alt="" style={{ transform: "scale(1.2)" }} />
        </div>
        <div
          className={`w-[75%] h-full flex justify-start items-center ${
            isExpanded ? "block" : isLargeScreen ? "block" : "hidden"
          }`}
        >
          <p className="text-xl text-white">Upgrade</p>
        </div>
      </div>

      {/* //third */}
      <div
        className={` cursor-pointer flex justify-between items-center px-8 w-[12rem] h-[4rem] rounded-lg ${
          selectedTab === "settings" ? "bg-[#ffffff50]" : ""
        }`}
        onClick={() => handleTab("settings")}
      >
        <div
          className={` ${
            isExpanded ? "w-[20%]" : isLargeScreen ? "w-[20%]" : "w-[100%]"
          }  h-full flex justify-center items-center`}
        >
          <img src={settingsIcon} alt="" style={{ transform: "scale(1.2)" }} />
        </div>
        <div
          className={`w-[75%] h-full flex justify-start items-center ${
            isExpanded ? "block" : isLargeScreen ? "block" : "hidden"
          }`}
        >
          <p className="text-xl text-white">Settings</p>
        </div>
      </div>
      <div
        className={` cursor-pointer flex justify-between items-center px-8 w-[12rem] h-[4rem] rounded-lg ${
          selectedTab === "message-center" ? "bg-[#ffffff50]" : ""
        }`}
        onClick={() => toggleMessageCenter()}
      >
        <div
          className={` ${
            isExpanded ? "w-[20%]" : isLargeScreen ? "w-[20%]" : "w-[100%]"
          }  h-full flex justify-center items-center`}
        >
              <MessageCircle className="text-white" size={24} />
        </div>
        <div
          className={`w-[75%] h-full flex justify-start items-center ${
            isExpanded ? "block" : isLargeScreen ? "block" : "hidden"
          }`}
        >
          <p className="text-xl text-white">Message Center</p>
        </div>
      </div>
    </div>
  );
};

export default SideTab;

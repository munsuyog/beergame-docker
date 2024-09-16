// Dashboard.jsx
import React, { useState } from "react";
import SideBar from "../components/dashboard/SideBar";
import Navbar from "../components/dashboard/Navbar";
// import InitialSessions from "../components/dashboard/Overview";
import Session from "../components/dashboard/Session";
import Settings from "../components/dashboard/Settings";
import Upgrade from "../components/dashboard/Upgrade"
import MessageCenter from "../components/dashboard/MessageCenter";

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState("sessions");
  const [showInitialScreen, setShowInititalScreen] = useState(true);
  const [messageCenter, setMessageCenter] = useState(false);

  const toggleMessageCenter = () => {
    setMessageCenter(!messageCenter);
  }

  return (
    <div className="flex h-screen bg-[#fafafa]">
      <SideBar
        setIsExpanded={setIsExpanded}
        isExpanded={isExpanded}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        toggleMessageCenter={toggleMessageCenter}
      />
      <div className="ml-[20%] md:ml-[10%] lg:ml-[20%]  w-full h-full  flex justify-start items-start">
        <div className="w-full ">
          <Navbar isExpanded={isExpanded} />
          {selectedTab === "sessions" ? (
            showInitialScreen ? (
              <></>
            ) : (
              <Session />
            )
          ) : selectedTab === "settings" ? (
            <Settings />
          ) : selectedTab === "upgrade" ? (
            <Upgrade />
          ) : null}
        </div>
      </div>
      <MessageCenter selectedTab={messageCenter} setSelectedTab={setMessageCenter} />
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { FaRegUserCircle, FaChevronRight } from "react-icons/fa";
import Profile from "./Profile";

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: FaRegUserCircle },
    // Add more tabs here if needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="md:w-1/4 bg-gray-50 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition-colors duration-200 ${
                    selectedTab === tab.id
                      ? "bg-[#fff5f1] text-[#e86234]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <tab.icon className="mr-3 h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  <FaChevronRight className={`h-4 w-4 ${selectedTab === tab.id ? "text-[#e86234]" : "text-gray-400"}`} />
                </button>
              ))}
            </nav>
          </div>

          {/* Main content area */}
          <div className="md:w-3/4 p-6">
            {selectedTab === "profile" && <Profile />}
            {/* Add more tab content here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
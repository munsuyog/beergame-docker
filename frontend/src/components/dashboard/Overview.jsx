import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Overview = ({ setShowInitialScreen }) => {

  const navigate = useNavigate();
  const data = [
    {
      header: "Create Your First Session",
      points: ["Get started by creating a new session"],
    },
    {
      header: "Join a Game as a Participant",
      points: [
        "Join one of the games as a participant to get to know the app by playing against the computer.",
      ],
    },
    {
      header: "Finish a Game",
      points: [
        "Finish a game to discover the debriefing page available at the end of a game.",
      ],
    },
    {
      header: "Upgrade Your Account Plan",
      points: [
        "Upgrade your account plan to host multiplayer games.",
        "Discover the different options",
      ],
    },
    {
      header: "Host Multiplayer Games",
      points: [
        "Host games with your students and colleagues to fully benefit from the platform.",
        "Check browser and network compatibility",
      ],
    },
  ];

  return (
    <div className="w-full flex-1 overflow-auto bg-gray-50">
      <div className="w-full h-full max-w-4xl mx-auto">
        <section className="header md:flex-row flex flex-col justify-between md:items-center items-start mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Complete your Onboarding Tasks
          </h1>
          <button
            onClick={() => navigate('/dashboard/sessions')}
            className="mt-2 md:mt-0 px-4 py-2 bg-[#e86234] text-white rounded-md hover:bg-[#d55729] transition-colors duration-200"
          >
            Continue to Sessions
          </button>
        </section>
        <section className="bg-white shadow-md rounded-lg overflow-hidden">
          {data.map((item, index) => (
            <div 
              key={index} 
              className="border-b border-gray-200 last:border-b-0"
            >
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800 mb-2">{item.header}</p>
                <ul className="space-y-2">
                  {item.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="text-sm text-gray-600 flex items-start">
                      <FaChevronRight className="mr-2 mt-1 flex-shrink-0 text-[#e86234]" size={12} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Overview;
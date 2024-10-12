import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { handleSignOut } from "../../store/reducers/userSlice";
import Chatbot from "../Home/Landing/Chatbot";
import MessageCenter from "../dashboard/MessageCenter";

const dropdownItems = {
  "Games": [
    { name: "Beer Game", link: "/games/beergame" },
    { name: "Operations Game 1", link: "https://survey-48e68.web.app/group/group1"},
    { name: "Operations Game 2", link: "https://survey-48e68.web.app/group/group2"},
    { name: "Operations Game 3", link: "https://survey-48e68.web.app/group/group3"}
  ],
  "Resources": [
    { name: "Beer Game Guide", link: "/resources/beer-guide" },
    { name: "Case Studies", link: "/resources/case-studies" },
    { name: "Video", link: "/resources/videos" },
    { name: "Articles/Blogs", link: "/resources/articles" },
  ],
  "About Us": [
    { name: "Info about Game", link: "/about/game-info" },
    { name: "IITB Depts.", link: "/about/iitb-depts" },
    { name: "Professors and Teams", link: "/about/teams" },
  ],
  "Help Center": [
    { name: "Help Center", link: "/help" },
    { name: "Contact Us", link: "#", onClick: "toggleMessageCenter" }, // Include Contact Us
    { name: "Chatbot", link: "#", onClick: "toggleChatbot" }, // Chatbot in Help Center
  ],
};

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showMessageCenter, setShowMessageCenter] = useState(false); // State for MessageCenter
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = (index) =>
    setActiveDropdown(activeDropdown === index ? null : index);

  const toggleChatbot = () => setShowChatbot((prev) => !prev);
  const toggleMessageCenter = () => setShowMessageCenter((prev) => !prev); // Toggle MessageCenter

  const signOut = () => {
    dispatch(handleSignOut());
    navigate("/");
  };

  const navItems = ["Games", "Resources", "About Us", "Help Center"];

  return (
    <>
      <nav className="bg-white shadow-sm py-4">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <img src="/logo.svg" width={60} height={60} alt="logo" />
                <span className="text-lg font-bold text-[#F15412]">
                  Fruit Beer Game
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item, index) => (
                <div className="relative group" key={index}>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center justify-between py-2 px-3 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item}
                    {dropdownItems[item] && (
                      <svg
                        className={`w-2.5 h-2.5 ml-1 transform transition-transform ${
                          activeDropdown === index ? "rotate-180" : "rotate-0"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    )}
                  </button>
                  <AnimatePresence>
                    {activeDropdown === index && dropdownItems[item] && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bg-white text-black divide-y divide-gray-100 rounded-lg shadow-lg w-44 mt-2"
                      >
                        <ul className="py-2 text-sm">
                          {dropdownItems[item].map((child, idx) => (
                            <li key={idx}>
                              <Link
                                to={child.link}
                                onClick={
                                  child.onClick === "toggleChatbot"
                                    ? (e) => {
                                        e.preventDefault();
                                        toggleChatbot();
                                      }
                                    : child.onClick === "toggleMessageCenter"
                                    ? (e) => {
                                        e.preventDefault();
                                        toggleMessageCenter();
                                      }
                                    : undefined
                                }
                                className="block px-4 py-2 hover:bg-gray-100"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <button
                    onClick={signOut}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                  {user.role === "instructor" && (
                    <Link
                      to="/dashboard/overview"
                      className="bg-[#F15412] hover:bg-[#d43f0d] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signin"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Persistent Chatbot Button */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg w-96 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <button
              className="absolute top-1 right-1 text-gray-600 hover:text-gray-800"
              onClick={toggleChatbot}
            >
              ✕
            </button>
            <Chatbot /> {/* Chatbot Component */}
          </motion.div>
        )}

        {showMessageCenter && (
          <MessageCenter selectedTab={showMessageCenter} setSelectedTab={setShowMessageCenter} /> // MessageCenter Component
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

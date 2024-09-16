import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { handleSignOut } from "../../store/reducers/userSlice";

const NavItem = ({ item, index, activeDropdown, toggleDropdown }) => {
  return (
    <div className="relative group">
      <button
        onClick={() => toggleDropdown(index)}
        className="flex items-center justify-between py-2 px-3 text-gray-700 hover:text-gray-900 transition-colors duration-200"
      >
        {item}
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
      </button>
      <AnimatePresence>
        {activeDropdown === index && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bg-white text-black divide-y divide-gray-100 rounded-lg shadow-lg w-44 mt-2"
          >
            <ul className="py-2 text-sm">
              <li>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                  Child 1
                </Link>
              </li>
              <li>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                  Child 2
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = (index) =>
    setActiveDropdown(activeDropdown === index ? null : index);

  const signOut = () => {
    dispatch(handleSignOut());
    navigate("/");
  };

  const navItems = ["Games", "Solutions", "Pricing", "Resources", "Company"];

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-[#F15412]">
                BeerGame
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                item={item}
                index={index}
                activeDropdown={activeDropdown}
                toggleDropdown={toggleDropdown}
              />
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
            <Link
              to="/book-demo"
              className="bg-[#F15412] hover:bg-[#d43f0d] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

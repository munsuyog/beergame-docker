import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaChartLine, FaCog, FaGamepad, FaUsers, FaBars, FaTimes } from 'react-icons/fa';
import MessageCenter from '../components/dashboard/MessageCenter';
import { MessageCircle } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, toggleMessageCenter, setToggleMessageCenter }) => {
  const location = useLocation();
  const navItems = [
    { path: '/dashboard/overview', icon: FaChartLine, label: 'Overview' },
    { path: '/dashboard/sessions', icon: FaGamepad, label: 'Sessions' },
    { path: '/dashboard/upgrade', icon: FaUsers, label: 'Upgrade' },
    { path: '/dashboard/settings', icon: FaCog, label: 'Settings' },
  ];

  return (
    <aside className={`bg-[#0091D1] text-white h-screen fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} lg:w-64`}>
      <div className="flex justify-between items-center p-6">
        <h2 className={`text-xl font-bold ${isOpen ? 'block' : 'hidden'} lg:block`}>BeerGame</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-[#e86234] transition-colors duration-200 lg:hidden">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  location.pathname === item.path 
                    ? 'bg-white text-[#0091D1] shadow-md' 
                    : 'text-white hover:bg-white hover:text-[#0091D1] hover:shadow-md'
                }`}
              >
                {/* <span className={`absolute inset-y-0 left-0 w-1 bg-[#0091D1] transition-all duration-300 ${location.pathname === item.path ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span> */}
                <item.icon size={20} className={`mr-3 lg:mr-3 z-10`} />
                <span className={`${isOpen ? 'inline-block' : 'hidden'} lg:inline-block font-medium z-10`}>{item.label}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#fff5f1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </li>
          ))}
            <Link
                className={`flex items-center p-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                    'text-white hover:bg-white hover:text-[#0091D1] hover:shadow-md'
                }`}
                onClick={() => {setToggleMessageCenter(!toggleMessageCenter)}}
              >
                {/* <span className={`absolute inset-y-0 left-0 w-1 bg-[#0091D1] transition-all duration-300 ${location.pathname === item.path ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span> */}
                {/* <item.icon size={20} className={`mr-3 lg:mr-3 z-10`} /> */}
                <MessageCircle size={20} className='mr-3 lg:mr-3 z-10' />
                <span className={`${isOpen ? 'inline-block' : 'hidden'} lg:inline-block font-medium z-10`}>Help Center</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#fff5f1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
        </ul>
      </nav>
    </aside>
  );
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toggleMessageCenter, setToggleMessageCenter] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} toggleMessageCenter={toggleMessageCenter} setToggleMessageCenter={setToggleMessageCenter} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-20'} lg:ml-64`}>
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 hover:text-[#e86234] transition-colors duration-200 lg:hidden">
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Welcome to BeerGame</h1>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <MessageCenter selectedTab={toggleMessageCenter} setSelectedTab={setToggleMessageCenter} />
    </div>
  );
};

export default DashboardLayout;

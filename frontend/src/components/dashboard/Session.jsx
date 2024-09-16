import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { getSessions, createSession } from "../../store/reducers/gameSlice";
import CreateSessionModal from "./CreateSessionModal";
import { LoadingContext } from "../../contexts/LoadingContext";
import { Link } from "react-router-dom";

const Session = () => {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.game.sessions);
  const loading = useSelector((state) => state.game.loading);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (loading) {
      startLoading();
    } else {
      stopLoading();
      dispatch(getSessions());
    }
  }, [loading, startLoading, stopLoading, dispatch]);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateSession = (sessionData) => {
    dispatch(createSession(sessionData));
    closeModal();
  };

  const filteredSessions = sessions.filter((session) =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sessions</h1>
        <button
          onClick={openModal}
          className="bg-[#e86234] text-white px-4 py-2 rounded-full flex items-center hover:bg-[#d55729] transition duration-300"
        >
          Create <GoPlus className="ml-1" />
        </button>
      </div>

      <div className="mb-6">
        <div className="relative w-full md:w-1/3">
          <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search sessions"
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#e86234] transition duration-300"
          />
        </div>
      </div>

      <SessionCards sessions={filteredSessions} />

      {isModalOpen && (
        <CreateSessionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleCreateSession}
        />
      )}
    </div>
  );
};

const SessionCards = ({ sessions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{session.name}</h2>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                session.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {session.status}
              </span>
            </div>
            {/* <p className="text-gray-600 mb-4">Created on: {new Date(session.createdAt).toLocaleDateString()}</p> */}
            <div className="flex justify-between items-center">
              <Link
                to={`/session/${session.id}`}
                className="text-[#e86234] hover:text-[#d55729] font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Session;
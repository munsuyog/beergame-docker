import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown, IoMdSearch } from "react-icons/io";
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
  const [filter, setFilter] = useState("all");

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
    session.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === "all" || session.status.toLowerCase() === filter)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sessions</h1>
        <button
          onClick={openModal}
          className="bg-[#F53838] text-white px-4 py-2 rounded-full flex items-center hover:bg-[#D32F2F] transition duration-300"
        >
          Create <GoPlus className="ml-1" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search sessions"
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#F53838] transition duration-300"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${
              filter === "all" ? "bg-[#F53838] text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-[#D32F2F] hover:text-white transition duration-300`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-md ${
              filter === "active" ? "bg-[#F53838] text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-[#D32F2F] hover:text-white transition duration-300`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("archived")}
            className={`px-4 py-2 rounded-md ${
              filter === "archived" ? "bg-[#F53838] text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-[#D32F2F] hover:text-white transition duration-300`}
          >
            Archived
          </button>
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
  const dispatch = useDispatch();
  const [selectedSession, setSelectedSession] = useState(null);

  const handleArchive = (session) => {
    dispatch(updateSession({ sessionId: session.id, updateData: { status: 'Archived' } }));
  };

  const handleDelete = (session) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      dispatch(deleteSession(session.id));
    }
  };

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
            <p className="text-gray-600 mb-4">Created on: {new Date(session.createdAt).toLocaleDateString()}</p>
            <div className="flex justify-between items-center">
              <Link
                to={`/session/${session.id}`}
                className="text-[#F53838] hover:text-[#D32F2F] font-medium"
              >
                View Details
              </Link>
              <div className="space-x-2">
                <button
                  onClick={() => handleArchive(session)}
                  className="text-gray-600 hover:text-[#F53838]"
                >
                  {session.status === 'Active' ? 'Archive' : 'Unarchive'}
                </button>
                <button
                  onClick={() => handleDelete(session)}
                  className="text-gray-600 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Session;
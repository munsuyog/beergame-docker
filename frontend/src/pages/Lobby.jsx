import React, { useEffect, useState } from 'react';
import Header from '../components/session/Header';
import TeamCard from '../components/session/TeamCard';
import { useParams, useNavigate } from 'react-router-dom';
import { getLobbyRolesStatus, getSession, joinSession, waitForGameStart } from '../store/reducers/gameSlice';
import { useDispatch, useSelector } from 'react-redux';

const Lobby = () => {
  const lobbyRolesStatus = useSelector((state) => state.game.lobbyRolesStatus);
  const currentSession = useSelector((state) => state.game.currentSession);
  const user = useSelector((state) => state.user.user);
  const { sessionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [joined, setJoined] = useState(false);
  const [playerRole, setPlayerRole] = useState(null);

  useEffect(() => {
    if (sessionId) {
      dispatch(getSession(sessionId));
      const lobbyInterval = setInterval(() => {
        dispatch(getLobbyRolesStatus(sessionId));
      }, 2000);
      return () => clearInterval(lobbyInterval);
    }
  }, [dispatch, sessionId]);

  useEffect(() => {
    if (joined && user && user.uid) {
      const gameStartInterval = setInterval(() => {
        dispatch(waitForGameStart({ sessionId, playerUid: user.uid }))
          .then((result) => {
            if (result.payload && result.payload.status === 'game_started') {
              setPlayerRole(result.payload.role);
              clearInterval(gameStartInterval);
              navigate(`/game/${result.payload.team}/${result.payload.role}`);
            }
          });
      }, 5000);
      return () => clearInterval(gameStartInterval);
    }
  }, [joined, dispatch, sessionId, user, navigate]);

  const handleJoinSession = () => {
    if (user && user.name && sessionId) {
      dispatch(joinSession({ sessionId, playerUID: user.uid ,playerName: user.name }))
        .then((result) => {
          if (result.payload) {
            setJoined(true);
          }
        })
        .catch((error) => {
          console.error("Error joining session:", error);
        });
    } else {
      console.error("Missing user data or session ID");
    }
  };

  if (!user || !sessionId) {
    return (
      <div>
        <div>Loading user data or you have not logged in yet. </div>
        <a href='/signin' className='text-blue-800 underline'>Please Login</a>
      </div>
    );
  }

  return (
    <div>
      <Header noButton={true} />
      <div className="mt-5 p-5">
        {!joined ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Game Lobby</h2>
            <p className="mb-4">Click the button below to join the session and wait for the game to start.</p>
            <button
              onClick={handleJoinSession}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Join Session
            </button>
          </div>
        ) : playerRole ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Game Started!</h2>
            <p className="mb-4">Your assigned role is: {playerRole}</p>
            <p>Redirecting to game screen...</p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Waiting for Game to Start</h2>
            <p className="mb-4">Please wait while the instructor assigns roles and starts the game.</p>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobby;
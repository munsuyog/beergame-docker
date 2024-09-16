import React, { useEffect } from 'react'
import Header from '../components/session/Header'
import TeamCard from '../components/session/TeamCard'
import { useParams } from 'react-router-dom';
import { getLobbyRolesStatus, getSession } from '../store/reducers/gameSlice';
import { useDispatch, useSelector } from 'react-redux';

const Lobby = () => {
    const lobbyRolesStatus = useSelector((state) => state.game.lobbyRolesStatus);
    const {sessionId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSession(sessionId));
        setInterval(() => {
          dispatch(getLobbyRolesStatus(sessionId));
        }, 2000)
    }, [dispatch]);
  return (
    <div>
        <Header noButton={true} />
        <div className="mt-5 p-5 flex flex-wrap justify-around align-center">
          {lobbyRolesStatus &&
            Object.keys(lobbyRolesStatus).map((teamName) => (
              <TeamCard
                key={teamName}
                teamName={teamName}
                roles={lobbyRolesStatus[teamName].map(
                  (roleStatus) => roleStatus
                )}
                selectedRoles={lobbyRolesStatus[teamName]
                  .filter((roleStatus) => roleStatus.taken)
                  .map((roleStatus) => roleStatus.role)}
              />
            ))}
        </div>
    </div>
  )
}

export default Lobby
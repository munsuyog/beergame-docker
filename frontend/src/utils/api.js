// api.js
const API_BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "https://profitable-sheela-suyog-75ba3372.koyeb.app";

const handleResponse = async (response) => {
  console.log(response);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An error occurred");
  }
  const text = await response.text();
  return JSON.parse(text, (key, value) => {
    if (value === "Infinity") return Infinity;
    if (value === "-Infinity") return -Infinity;
    return value;
  });
};

export const signUp = (idToken) =>
  fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);

export const signIn = (idToken) =>
  fetch(`${API_BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);

export const createDemo = () =>
  fetch(`${API_BASE_URL}/demo`, {
    method: "GET",
  }).then(handleResponse);

export const joinStation = (selectedGame, playerName, password) =>
  fetch(`${API_BASE_URL}/join_station`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      selected_game: selectedGame,
      player_name: playerName,
      password: password,
    }),
  }).then(handleResponse);

export const getPlayScreenInfo = (gameId, stationId) =>
  fetch(
    `${API_BASE_URL}/play_screen?selected_game=${gameId}&selected_station=${stationId}`,
    {
      method: "GET",
    }
  ).then(handleResponse);

export const submitTurn = (gameId, stationId, week, suppliers, customers) =>
  fetch(`${API_BASE_URL}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      DATA: {
        this_game: gameId,
        this_station: stationId,
        week: week,
        suppliers: suppliers,
        customers: customers,
      },
    }),
  }).then(handleResponse);

export const getGameStatus = (gameId, stationId) =>
  fetch(`${API_BASE_URL}/get_game_status?game=${gameId}&station=${stationId}`, {
    method: "GET",
  }).then(handleResponse);

export const getStationStatus = (gameId, stationId) =>
  fetch(
    `${API_BASE_URL}/get_station_status?game=${gameId}&station=${stationId}`,
    {
      method: "GET",
    }
  ).then(handleResponse);

  export const getGameSetup = (gameId) =>
    fetch(`${API_BASE_URL}/edit_game_setup?game=${gameId}&action=edit`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(handleResponse);

export const saveGameSetup = (gameId, setupData) =>
  fetch(`${API_BASE_URL}/change_game_settings?game=${gameId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(setupData),
  }).then(handleResponse);

export const createGameFromTemplate = (templateName) =>
  fetch(`${API_BASE_URL}/create_game_from_template`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ template: templateName }),
  }).then(handleResponse);

export const getGameTemplates = () =>
  fetch(`${API_BASE_URL}/get_game_templates`, {
    method: "GET",
  }).then(handleResponse);

export const copyGame = (originalGameId, newGameName) =>
  fetch(`${API_BASE_URL}/copy_game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      org: originalGameId,
      dst: newGameName,
    }),
  }).then(handleResponse);

export const renameGame = (gameId, newName) =>
  fetch(`${API_BASE_URL}/rename_game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      org: gameId,
      new_name: newName,
    }),
  }).then(handleResponse);

export const deleteGame = (gameId) =>
  fetch(`${API_BASE_URL}/delete_game?game_name=${gameId}`, {
    method: "GET",
  }).then(handleResponse);

export const resetGame = (gameId) =>
  fetch(`${API_BASE_URL}/reset_game?game_name=${gameId}`, {
    method: "POST",
  }).then(handleResponse);

export const importGameFile = (file) => {
  const formData = new FormData();
  formData.append("importfilename", file);
  return fetch(`${API_BASE_URL}/import_game_file`, {
    method: "POST",
    body: formData,
  }).then(handleResponse);
};

export const exportGameFile = (gameId) =>
  fetch(`${API_BASE_URL}/export_game_file?game_name=${gameId}`, {
    method: "GET",
  }).then((response) => response.blob());

// session management functions

export const createSession = (name, userId, teams, playersPerTeam) =>
  fetch(`${API_BASE_URL}/create_session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session_name: name, user_id: userId, num_teams: teams, playersPerTeam }),
  }).then(handleResponse);

export const getSessions = () =>
  fetch(`${API_BASE_URL}/get_sessions`, {
    method: "GET",
  }).then(handleResponse);

export const getSession = (sessionId) =>
  fetch(`${API_BASE_URL}/get_session/${sessionId}`, {
    method: "GET",
  }).then(handleResponse);

export const updateSession = (sessionId, updateData) =>
  fetch(`${API_BASE_URL}/update_session/${sessionId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  }).then(handleResponse);

export const deleteSession = (sessionId) =>
  fetch(`${API_BASE_URL}/delete_session/${sessionId}`, {
    method: "DELETE",
  }).then(handleResponse);

export const joinSession = (sessionId, playerName) =>
  fetch(`${API_BASE_URL}/join_session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session_id: sessionId, player_name: playerName }),
  }).then(handleResponse);

export const getSessionStatus = (sessionId) =>
  fetch(`${API_BASE_URL}/monitor_session/${sessionId}`, {
    method: "GET",
  }).then(handleResponse);

export const getTeamDetails = (sessionId, teamId) =>
  fetch(`${API_BASE_URL}/get_team_details/${sessionId}/${teamId}`, {
    method: "GET",
  }).then(handleResponse);

export const getSessionTeams = (sessionId) =>
  fetch(`${API_BASE_URL}/monitor_session/${sessionId}`, {
    method: "GET",
  }).then(handleResponse);

export const getLobbyRolesStatus = (sessionId) =>
  fetch(`${API_BASE_URL}/session/lobby/${sessionId}`, {
    method: "GET",
  }).then(handleResponse);
  
// Export all functions

export const getSessionGameSettings = (sessionId) =>
  fetch(`${API_BASE_URL}/get_session_game_settings?session=${sessionId}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(handleResponse);

export const changeSessionGameSettings = (sessionId, setupData) =>
  fetch(`${API_BASE_URL}/change_session_game_settings?session=${sessionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(setupData),
  }).then(handleResponse);

export const getSessionAnalysis = (sessionId) =>
  fetch(`${API_BASE_URL}/get_session_analysis/${sessionId}`, {
    method: "GET",
  }).then(handleResponse);
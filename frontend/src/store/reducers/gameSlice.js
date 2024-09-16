import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';

// Game Management Thunks
export const signUp = createAsyncThunk(
  'game/signUp',
  async (idToken, { rejectWithValue }) => {
    try {
      return await api.signUp(idToken);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'game/signIn',
  async (idToken, { rejectWithValue }) => {
    try {
      return await api.signIn(idToken);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createDemo = createAsyncThunk(
  'game/createDemo',
  async (_, { rejectWithValue }) => {
    try {
      return await api.createDemo();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const joinStation = createAsyncThunk(
  'game/joinStation',
  async ({ selectedGame, playerName, password }, { rejectWithValue }) => {
    try {
      return await api.joinStation(selectedGame, playerName, password);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPlayScreenInfo = createAsyncThunk(
  'game/getPlayScreenInfo',
  async ({ gameId, stationId }, { rejectWithValue }) => {
    try {
      return await api.getPlayScreenInfo(gameId, stationId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitTurn = createAsyncThunk(
  'game/submitTurn',
  async ({ gameId, stationId, week, suppliers, customers }, { rejectWithValue }) => {
    try {
      return await api.submitTurn(gameId, stationId, week, suppliers, customers);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getStationStatus = createAsyncThunk(
  'game/getStationStatus',
  async ({ gameId, stationId }, { rejectWithValue }) => {
    try {
      return await api.getStationStatus(gameId, stationId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getGameStatus = createAsyncThunk(
  'game/getGameStatus',
  async ({ gameId, stationId }, { rejectWithValue }) => {
    try {
      return await api.getGameStatus(gameId, stationId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getGameSetup = createAsyncThunk(
  'game/getGameSetup',
  async (gameId, { rejectWithValue }) => {
    try {
      return await api.getGameSetup(gameId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveGameSetup = createAsyncThunk(
  'game/saveGameSetup',
  async ({gameId, gameData}, { rejectWithValue }) => {
    try {
      return await api.saveGameSetup(gameId, gameData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createGameFromTemplate = createAsyncThunk(
  'game/createGameFromTemplate',
  async (templateName, { rejectWithValue }) => {
    try {
      return await api.createGameFromTemplate(templateName);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getGameTemplates = createAsyncThunk(
  'game/getGameTemplates',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getGameTemplates();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const copyGame = createAsyncThunk(
  'game/copyGame',
  async ({ originalGameId, newGameName }, { rejectWithValue }) => {
    try {
      return await api.copyGame(originalGameId, newGameName);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const renameGame = createAsyncThunk(
  'game/renameGame',
  async ({ gameId, newName }, { rejectWithValue }) => {
    try {
      return await api.renameGame(gameId, newName);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteGame = createAsyncThunk(
  'game/deleteGame',
  async (gameId, { rejectWithValue }) => {
    try {
      return await api.deleteGame(gameId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetGame = createAsyncThunk(
  'game/resetGame',
  async (gameId, { rejectWithValue }) => {
    try {
      return await api.resetGame(gameId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Session Management Thunks
export const createSession = createAsyncThunk(
  'game/createSession',
  async ({ name, userId, teams, playersPerTeam }, { rejectWithValue }) => {
    try {
      return await api.createSession(name, userId, teams, playersPerTeam);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSessions = createAsyncThunk(
  'game/getSessions',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getSessions();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSession = createAsyncThunk(
  'game/getSession',
  async (sessionId, { rejectWithValue }) => {
    try {
      return await api.getSession(sessionId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSession = createAsyncThunk(
  'game/updateSession',
  async ({ sessionId, updateData }, { rejectWithValue }) => {
    try {
      return await api.updateSession(sessionId, updateData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSession = createAsyncThunk(
  'game/deleteSession',
  async (sessionId, { rejectWithValue }) => {
    try {
      return await api.deleteSession(sessionId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const joinSession = createAsyncThunk(
  'game/joinSession',
  async ({ sessionId, playerName }, { rejectWithValue }) => {
    try {
      return await api.joinSession(sessionId, playerName);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSessionStatus = createAsyncThunk(
  'game/getSessionStatus',
  async (sessionId, { rejectWithValue }) => {
    try {
      return await api.getSessionStatus(sessionId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTeamDetails = createAsyncThunk(
  'game/getTeamDetails',
  async ({ sessionId, teamId }, { rejectWithValue }) => {
    try {
      return await api.getTeamDetails(sessionId, teamId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getSessionTeams = createAsyncThunk(
  'game/getSessionTeams',
  async (sessionId, { rejectWithValue }) => {
    try {
      return await api.getSessionTeams(sessionId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLobbyRolesStatus = createAsyncThunk(
  'game/getLobbyRolesStatus',
  async (sessionId, { rejectWithValue }) => {
    try {
      return await api.getLobbyRolesStatus(sessionId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSessionGameSettings = createAsyncThunk(
  'game/getSessionGameSettings',
  async (sessionId, { rejectWithValue }) => {
    try {
      return await api.getSessionGameSettings(sessionId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeSessionGameSettings = createAsyncThunk(
  'game/changeSessionGameSettings',
  async ({sessionId, setupData}, { rejectWithValue }) => {
    try {
      return await api.changeSessionGameSettings(sessionId, setupData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSessionAnalysis = createAsyncThunk(
  'game/getSessionAnalysis',
  async (sessionId, { rejectWithValue }) => {
    try {
      return await api.getSessionAnalysis(sessionId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    user: null,
    gameData: null,
    playScreenInfo: null,
    stationStatus: null,
    stationData: null,
    loading: false,
    gameStatus: null,
    error: null,
    gameSetup: null,
    gameTemplates: [],
    sessions: [],
    currentSession: null,
    sessionStatus: null,
    sessionTeams: [],
    currentTeam: null,
    lobbyRolesStatus: null,
    sessionGameSettings: null,
  },
  reducers: {
    // You can add any synchronous actions here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  extraReducers: (builder) => {
    builder
      // Game Management Cases
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDemo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDemo.fulfilled, (state, action) => {
        state.loading = false;
        state.gameData = action.payload;
      })
      .addCase(createDemo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(joinStation.fulfilled, (state, action) => {
        state.loading = false;
        state.stationData = action.payload;
      })
      .addCase(getPlayScreenInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.playScreenInfo = action.payload;
      })
      .addCase(submitTurn.fulfilled, (state, action) => {
        state.loading = false;
        // Update game state based on turn submission if needed
      })
      .addCase(getStationStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.stationStatus = action.payload;
      })
      .addCase(getGameStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGameStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.gameStatus = action.payload;
      })
      .addCase(getGameStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getGameSetup.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGameSetup.fulfilled, (state, action) => {
        state.loading = false;
        state.gameSetup = action.payload;
      })
      .addCase(getGameSetup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveGameSetup.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveGameSetup.fulfilled, (state, action) => {
        state.loading = false;
        state.gameSetup = action.payload;
      })
      .addCase(saveGameSetup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGameFromTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.gameData = action.payload;
      })
      .addCase(getGameTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.gameTemplates = action.payload;
      })
      .addCase(copyGame.fulfilled, (state, action) => {
        state.loading = false;
        // You might want to update the game list or current game data here
      })
      .addCase(renameGame.fulfilled, (state, action) => {
        state.loading = false;
        // You might want to update the game list or current game data here
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.loading = false;
        // You might want to remove the deleted game from the state here
      })
      .addCase(resetGame.fulfilled, (state, action) => {
        state.loading = false;
        // You might want to update the game data to reflect the reset state
      })
      // Session Management Cases
      .addCase(createSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = state.sessions.filter(session => session.id !== action.payload);
        if (state.currentSession && state.currentSession.id === action.payload) {
          state.currentSession = null;
        }
      })
      .addCase(joinSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload.session;
      })
      .addCase(getSessionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionStatus = action.payload;
      })
      .addCase(getTeamDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTeam = action.payload;
      })
      .addCase(getSessionTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionTeams = action.payload;
      })
      .addCase(getLobbyRolesStatus.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getLobbyRolesStatus.fulfilled, (state, action) => {
        // state.loading = false;
        state.lobbyRolesStatus = action.payload;
      })
      .addCase(getLobbyRolesStatus.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSessionGameSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSessionGameSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionGameSettings = action.payload.setup;
      })
      .addCase(getSessionGameSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeSessionGameSettings.pending, (state) => {
        // state.loading = true;
      })
      .addCase(changeSessionGameSettings.fulfilled, (state, action) => {
        // state.loading = false;
        state.sessionGameSettings = action.payload.setup;
      })
      .addCase(changeSessionGameSettings.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSessionAnalysis.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getSessionAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionAnalysis = action.payload;
      })
      .addCase(getSessionAnalysis.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      });
  },
});


export default gameSlice.reducer;
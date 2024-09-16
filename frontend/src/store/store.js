// store.js
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './reducers/gameSlice';
import userReducer from './reducers/userSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer
  },
});
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import gameReducer from './slices/gameSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});

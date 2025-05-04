import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import userDataReducer from './slices/userDataSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
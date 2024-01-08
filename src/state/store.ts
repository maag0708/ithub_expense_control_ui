import { configureStore } from '@reduxjs/toolkit';

import notificationSlice from './notificationSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    notificationSlice,
    userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

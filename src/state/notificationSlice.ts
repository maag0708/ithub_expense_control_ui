import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Notification } from '../types/notification';

export const initialState: Notification = {
  severity: undefined,
  message: '',
  summary: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNotification(state, action) {
      state = Object.assign(state, action.payload);
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const selectNotification = (state: RootState) => state.notificationSlice;

export default notificationSlice.reducer;

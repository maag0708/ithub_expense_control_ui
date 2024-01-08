import { createSlice } from '@reduxjs/toolkit';

import { Notification } from '../../../FROMA_BGT_UI/src/types/notification';
import { RootState } from './store';

export const initialState: Notification = {
  notificationType: undefined,
  message: '',
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

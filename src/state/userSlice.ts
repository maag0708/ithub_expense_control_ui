import { createSlice } from '@reduxjs/toolkit';

import { UserData } from '../types/user';
import { RootState } from './store';

export const initialState: UserData = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.userSlice.user;
export const selectRoleName = (state: RootState) => state.userSlice.user?.role;
export const selectVendorId = (state: RootState) => state.userSlice.user?.vendorID;
export default userSlice.reducer;

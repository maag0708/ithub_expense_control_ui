import { createSlice } from '@reduxjs/toolkit';

import { UserData } from '../types/user';
import { RootState } from './store';

export const initialState: UserData = {
  user: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setPermissions(state, action) {
      state.role = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setPermissions, setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.userSlice.user;
export const selectRoleName = (state: RootState) => state.userSlice.role?.name;
export const selectPermissions = (state: RootState) =>
  state.userSlice.role?.permissions;

export default userSlice.reducer;

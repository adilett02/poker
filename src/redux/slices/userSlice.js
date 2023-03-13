import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    uid: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload[0];
      state.uid = action.payload[1];
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

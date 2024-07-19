import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    isAuthenticated: false,
    otherUsers: null,
    selectedUser: null,
    onlineUsers: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      state.isAuthenticated = true;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUser: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setAuthUser, setOnlineUser, setOtherUsers, setSelectedUser } =
  userSlice.actions;
export default userSlice.reducer;

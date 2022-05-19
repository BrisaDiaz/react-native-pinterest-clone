import { createSlice } from "@reduxjs/toolkit";
export interface User {
  full_name: string;
  user_name: string;
  email: string;
  avatar?: string;
}
export interface Session {
  user: null | User;
}
const initialState: Session = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: Session, action: { payload: User }) => {
      state.user = action.payload;
    },
    removeUser: (state: Session) => {
      state.user = null;
    },
    setGuestUser: (state: Session) => {
      state.user = {
        full_name: "guest user",
        user_name: "guest user",
        avatar: undefined,
        email: "visitantUser@gmail.com",
      };
    },
  },
});
export const { setUser, removeUser, setGuestUser } = authSlice.actions;

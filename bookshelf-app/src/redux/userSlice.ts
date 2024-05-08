import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  key: string;
  secret: string;
  isUserSigned: boolean;
}

type UserKeys = {
  key: string;
  secret: string;
};

const initialState: UserState = {
  key: localStorage.getItem("key") || "",
  secret: localStorage.getItem("secret") || "",
  isUserSigned:
    localStorage.getItem("key") && localStorage.getItem("secret")
      ? true
      : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinUser: (state, action: PayloadAction<UserKeys>) => {
      state.key = action.payload.key;
      state.secret = action.payload.secret;

      localStorage.setItem("key", action.payload.key);
      localStorage.setItem("secret", action.payload.secret);

      state.isUserSigned = true;
    },
    logoutUser: (state) => {
      state.isUserSigned = false;

      localStorage.setItem("key", "");
      localStorage.setItem("secret", "");
    },
  },
});

export const { signinUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

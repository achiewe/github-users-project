import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GithubUser from "../../types";

export interface UserProps {
  userInfo: GithubUser[];
}

const initialState: UserProps = {
  userInfo: [],
};

const UserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setuserInfo: (state, action: PayloadAction<GithubUser[]>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setuserInfo } = UserInfoSlice.actions;
export default UserInfoSlice.reducer;

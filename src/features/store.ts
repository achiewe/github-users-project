import { configureStore } from "@reduxjs/toolkit";
import InputValueSlice, { InputProps } from "./InputValueSlice";
import UserInfoSlice, { UserProps } from "./UserInfoSlice";

const store = configureStore({
  reducer: {
    inputValue: InputValueSlice,
    userInfo: UserInfoSlice,
  },
});

export type Rootstate = {
  inputValue: InputProps;
  userInfo: UserProps;
};

export default store;

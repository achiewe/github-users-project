import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InputProps {
  inputValue: string;
}

const initialState: InputProps = {
  inputValue: "",
};

const InputValueSlice = createSlice({
  name: "inputValue",
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
});

export const { setInputValue } = InputValueSlice.actions;
export default InputValueSlice.reducer;

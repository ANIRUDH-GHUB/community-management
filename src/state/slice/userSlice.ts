import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER } from "../../model/interfaces";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUser(state, action: PayloadAction<USER>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

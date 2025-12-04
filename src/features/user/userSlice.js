import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  userName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    createUser(state, action) {
      state.userName = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { createUser } = userSlice.actions;

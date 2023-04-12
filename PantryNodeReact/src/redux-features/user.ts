
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from "../util/axiosInstance";
//Docs: https://redux-toolkit.js.org/api/createAsyncThunk
//Docs: https://redux-toolkit.js.org/introduction/getting-started
// First, create the thunk
export const login = createAsyncThunk(
  "user/login",
  async (payload: FormData, { fulfillWithValue, rejectWithValue }) =>
    axiosInstance
      .post("auth/login", payload)
      .then((res: any) => fulfillWithValue(res))
      .catch((err: any) => rejectWithValue(err))
);

const initialState = {
  name: "",
  email: "",
  token: "",
  status: "idle",
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.token = action.payload.token;
        state.status = "idle";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.error = action.error.message!;
      });
  },
});

export const selectStatus = (state: any) => state.user.status;
export const userAction = userSlice.actions;
export default userSlice.reducer;

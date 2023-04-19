import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from "../util/axiosInstance";

//Docs: https://redux-toolkit.js.org/api/createAsyncThunk
//Docs: https://redux-toolkit.js.org/introduction/getting-started
// First, create the thunk

type LoginDto = {
  email: string;
  password: string;
};
export const login = createAsyncThunk(
  "user/login",
  async (payload: LoginDto, { fulfillWithValue, rejectWithValue }) =>
    axiosInstance
      .post("login", payload)
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
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('token',  action.payload.token)
        axiosInstance.defaults.headers.common['Authorization'] = action.payload.token;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.token = action.payload.token;
        state.status = "authenticated";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export const selectStatus = (state: any) => state.user.status;
export const userAction = userSlice.actions;
export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from "../util/axiosInstance";
import { getToken, removeToken } from "../Components/Authentication/useToken";

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

const token = getToken();
let init_token = "";
let init_status = "idle";
if(token) {
  init_token = token;
  init_status = "authenticated";
}
const initialState = {
  name: "",
  email: "",
  token: init_token,
  status: init_status,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      removeToken();
      state.name = "";
      state.token = "";
      state.token = "";
      state.status = "idle";
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("token",  action.payload.token);
        axiosInstance.defaults.headers.common["Authorization"] = action.payload.token;
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
export const { logout } = userSlice.actions;
export default userSlice.reducer;

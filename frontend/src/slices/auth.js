import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/auth.service";
import Agent from "../services/auth-header";
import { Navigate } from "react-router-dom";
const user = Agent.getToken();

export const register = createAsyncThunk(
  "auth/register",
  async (
    { firstName, lastName, email, phoneNumber, password, dob, gender },
    thunkAPI
  ) => {
    return new Promise((resolve, reject) => {
      AuthService.register(
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          dob,
          gender,
        },
        (error, res) => {
          if (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            thunkAPI.dispatch(setMessage(message));
            reject(thunkAPI.rejectWithValue());
          } else {
            thunkAPI.dispatch(setMessage(res.data.message));
            resolve(res);
          }
        }
      );
    });
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    return new Promise((resolve, reject) => {
      AuthService.login(
        {
          email,
          password,
        },
        (error, res) => {
          if (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            thunkAPI.dispatch(setMessage(message));
            reject(thunkAPI.rejectWithValue());
          } else {
            thunkAPI.dispatch(setMessage(res.data.message));
            resolve(res);
          }
        }
      );
    });
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});



const { reducer } = authSlice;
export default reducer;

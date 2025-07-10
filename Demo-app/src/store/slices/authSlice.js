import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Register actions
    registerRequest: (state) => {
      state.registerLoading = true;
      state.registerError = null;
    },
    registerSuccess: (state, action) => {
      state.registerLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
      state.registerError = null;
    },
    registerFailure: (state, action) => {
      state.registerLoading = false;
      state.registerError = action.payload;
    },

    // Login actions
    loginRequest: (state) => {
      state.loginLoading = true;
      state.loginError = null;
    },
    loginSuccess: (state, action) => {
      state.loginLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
      state.loginError = null;
    },
    loginFailure: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    },

    // Logout action
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.registerError = null;
      state.loginError = null;
    },

    // Clear errors
    clearAuthErrors: (state) => {
      state.error = null;
      state.registerError = null;
      state.loginError = null;
    },

    // Set token from storage
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    // Set user from storage
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  clearAuthErrors,
  setToken,
  setUser,
} = authSlice.actions;

export default authSlice.reducer; 
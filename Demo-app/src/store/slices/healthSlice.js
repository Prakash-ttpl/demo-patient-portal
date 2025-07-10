import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  healthStatus: null,
  loading: false,
  error: null,
  lastChecked: null,
  isHealthy: false,
};

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    // Health check request
    healthCheckRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    healthCheckSuccess: (state, action) => {
      state.loading = false;
      state.healthStatus = action.payload;
      state.isHealthy = true;
      state.lastChecked = new Date().toISOString();
      state.error = null;
    },
    healthCheckFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isHealthy = false;
      state.lastChecked = new Date().toISOString();
    },

    // Clear health errors
    clearHealthErrors: (state) => {
      state.error = null;
    },

    // Reset health state
    resetHealthState: (state) => {
      state.healthStatus = null;
      state.loading = false;
      state.error = null;
      state.lastChecked = null;
      state.isHealthy = false;
    },
  },
});

export const {
  healthCheckRequest,
  healthCheckSuccess,
  healthCheckFailure,
  clearHealthErrors,
  resetHealthState,
} = healthSlice.actions;

export default healthSlice.reducer; 
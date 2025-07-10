import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [],
  currentPatient: null,
  loading: false,
  error: null,
  
  // CRUD operation states
  createLoading: false,
  createError: null,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null,
  fetchLoading: false,
  fetchError: null,
  
  // Pagination
  totalPatients: 0,
  currentPage: 1,
  pageSize: 10,
  
  // Filters
  filters: {
    search: '',
    gender: '',
    maritalStatus: '',
    race: '',
    ethnicity: '',
  },
};

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    // Fetch all patients
    fetchPatientsRequest: (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
    },
    fetchPatientsSuccess: (state, action) => {
      state.fetchLoading = false;
      state.patients = action.payload.patients || action.payload;
      state.totalPatients = action.payload.total || action.payload.length;
      state.fetchError = null;
    },
    fetchPatientsFailure: (state, action) => {
      state.fetchLoading = false;
      state.fetchError = action.payload;
    },

    // Create patient
    createPatientRequest: (state) => {
      state.createLoading = true;
      state.createError = null;
    },
    createPatientSuccess: (state, action) => {
      state.createLoading = false;
      state.patients.unshift(action.payload);
      state.totalPatients += 1;
      state.createError = null;
    },
    createPatientFailure: (state, action) => {
      state.createLoading = false;
      state.createError = action.payload;
    },

    // Get patient by ID
    getPatientRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPatientSuccess: (state, action) => {
      state.loading = false;
      state.currentPatient = action.payload;
      state.error = null;
    },
    getPatientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update patient
    updatePatientRequest: (state) => {
      state.updateLoading = true;
      state.updateError = null;
    },
    updatePatientSuccess: (state, action) => {
      state.updateLoading = false;
      const index = state.patients.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
      if (state.currentPatient && state.currentPatient.id === action.payload.id) {
        state.currentPatient = action.payload;
      }
      state.updateError = null;
    },
    updatePatientFailure: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },

    // Delete patient
    deletePatientRequest: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
    },
    deletePatientSuccess: (state, action) => {
      state.deleteLoading = false;
      state.patients = state.patients.filter(p => p.id !== action.payload);
      state.totalPatients -= 1;
      if (state.currentPatient && state.currentPatient.id === action.payload) {
        state.currentPatient = null;
      }
      state.deleteError = null;
    },
    deletePatientFailure: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    },

    // Clear current patient
    clearCurrentPatient: (state) => {
      state.currentPatient = null;
    },

    // Set current patient
    setCurrentPatient: (state, action) => {
      state.currentPatient = action.payload;
    },

    // Update filters
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filters change
    },

    // Update pagination
    updatePagination: (state, action) => {
      state.currentPage = action.payload.page || state.currentPage;
      state.pageSize = action.payload.pageSize || state.pageSize;
    },

    // Clear errors
    clearPatientErrors: (state) => {
      state.error = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
      state.fetchError = null;
    },

    // Reset state
    resetPatientState: (state) => {
      state.patients = [];
      state.currentPatient = null;
      state.loading = false;
      state.error = null;
      state.createLoading = false;
      state.createError = null;
      state.updateLoading = false;
      state.updateError = null;
      state.deleteLoading = false;
      state.deleteError = null;
      state.fetchLoading = false;
      state.fetchError = null;
      state.totalPatients = 0;
      state.currentPage = 1;
      state.filters = {
        search: '',
        gender: '',
        maritalStatus: '',
        race: '',
        ethnicity: '',
      };
    },
  },
});

export const {
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  createPatientRequest,
  createPatientSuccess,
  createPatientFailure,
  getPatientRequest,
  getPatientSuccess,
  getPatientFailure,
  updatePatientRequest,
  updatePatientSuccess,
  updatePatientFailure,
  deletePatientRequest,
  deletePatientSuccess,
  deletePatientFailure,
  clearCurrentPatient,
  setCurrentPatient,
  updateFilters,
  updatePagination,
  clearPatientErrors,
  resetPatientState,
} = patientSlice.actions;

export default patientSlice.reducer; 
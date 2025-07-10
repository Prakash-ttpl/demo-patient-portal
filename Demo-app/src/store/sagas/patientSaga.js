import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
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
} from '../slices/patientSlice';
import api from '../../services/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('health_first_token');
};

// Fetch all patients saga
function* fetchPatients(action) {
  try {
    const params = action.payload || {};
    const response = yield call(() => api.get('/patients', { params }));
    yield put(fetchPatientsSuccess(response.data));
  } catch (error) {
    let message = 'Failed to fetch patients';
    if (error.response) {
      message = error.response.data.message || message;
    }
    yield put(fetchPatientsFailure(message));
  }
}

// Get patient by ID saga
function* getPatient(action) {
  try {
    const response = yield call(() => api.get(`/patients/${action.payload}`));
    yield put(getPatientSuccess(response.data));
  } catch (error) {
    let message = 'Failed to fetch patient';
    if (error.response) {
      message = error.response.data.message || message;
    }
    yield put(getPatientFailure(message));
  }
}

// Create patient saga
function* createPatient(action) {
  try {
    const response = yield call(() => api.post('/patients', action.payload));
    yield put(createPatientSuccess(response.data));
  } catch (error) {
    let message = 'Failed to create patient';
    if (error.response) {
      message = error.response.data.message || message;
    }
    yield put(createPatientFailure(message));
  }
}

// Update patient saga
function* updatePatient(action) {
  try {
    const { id, ...data } = action.payload;
    const response = yield call(() => api.patch(`/patients/${id}`, data));
    yield put(updatePatientSuccess(response.data));
  } catch (error) {
    let message = 'Failed to update patient';
    if (error.response) {
      message = error.response.data.message || message;
    }
    yield put(updatePatientFailure(message));
  }
}

// Delete patient saga
function* deletePatient(action) {
  try {
    yield call(() => api.delete(`/patients/${action.payload}`));
    yield put(deletePatientSuccess(action.payload));
  } catch (error) {
    let message = 'Failed to delete patient';
    if (error.response) {
      message = error.response.data.message || message;
    }
    yield put(deletePatientFailure(message));
  }
}

// Watch for patient actions
export function* patientSaga() {
  yield takeLatest('patients/fetchPatientsRequest', fetchPatients);
  yield takeLatest('patients/getPatientRequest', getPatient);
  yield takeLatest('patients/createPatientRequest', createPatient);
  yield takeLatest('patients/updatePatientRequest', updatePatient);
  yield takeLatest('patients/deletePatientRequest', deletePatient);
} 
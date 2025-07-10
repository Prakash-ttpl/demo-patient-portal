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

// Mock API functions (replace with actual API calls)
const patientAPI = {
  getAllPatients: async (filters = {}) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockPatients = [
          {
            id: 'patient-1',
            firstName: 'John',
            middleName: 'Michael',
            lastName: 'Doe',
            dateOfBirth: '1990-01-01',
            gender: 'male',
            maritalStatus: 'single',
            timezone: 'America/New_York',
            language: 'English',
            ssn: '123-45-6789',
            race: 'Caucasian',
            ethnicity: 'Non-Hispanic',
            profilePicture: 'https://example.com/profile1.jpg',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z'
          },
          {
            id: 'patient-2',
            firstName: 'Jane',
            middleName: 'Elizabeth',
            lastName: 'Smith',
            dateOfBirth: '1985-05-15',
            gender: 'female',
            maritalStatus: 'married',
            timezone: 'America/Chicago',
            language: 'English',
            ssn: '987-65-4321',
            race: 'African American',
            ethnicity: 'Non-Hispanic',
            profilePicture: 'https://example.com/profile2.jpg',
            createdAt: '2024-01-02T00:00:00.000Z',
            updatedAt: '2024-01-02T00:00:00.000Z'
          },
          {
            id: 'patient-3',
            firstName: 'Carlos',
            middleName: 'Miguel',
            lastName: 'Rodriguez',
            dateOfBirth: '1978-12-20',
            gender: 'male',
            maritalStatus: 'divorced',
            timezone: 'America/Los_Angeles',
            language: 'Spanish',
            ssn: '456-78-9012',
            race: 'Hispanic',
            ethnicity: 'Hispanic',
            profilePicture: 'https://example.com/profile3.jpg',
            createdAt: '2024-01-03T00:00:00.000Z',
            updatedAt: '2024-01-03T00:00:00.000Z'
          }
        ];

        // Apply filters
        let filteredPatients = mockPatients;
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredPatients = mockPatients.filter(patient => 
            patient.firstName.toLowerCase().includes(searchTerm) ||
            patient.lastName.toLowerCase().includes(searchTerm) ||
            patient.email?.toLowerCase().includes(searchTerm)
          );
        }

        if (filters.gender) {
          filteredPatients = filteredPatients.filter(patient => 
            patient.gender === filters.gender
          );
        }

        if (filters.maritalStatus) {
          filteredPatients = filteredPatients.filter(patient => 
            patient.maritalStatus === filters.maritalStatus
          );
        }

        if (filters.race) {
          filteredPatients = filteredPatients.filter(patient => 
            patient.race === filters.race
          );
        }

        if (filters.ethnicity) {
          filteredPatients = filteredPatients.filter(patient => 
            patient.ethnicity === filters.ethnicity
          );
        }

        resolve({
          patients: filteredPatients,
          total: filteredPatients.length
        });
      }, 800);
    });
  },

  getPatientById: async (id) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockPatients = {
          'patient-1': {
            id: 'patient-1',
            firstName: 'John',
            middleName: 'Michael',
            lastName: 'Doe',
            dateOfBirth: '1990-01-01',
            gender: 'male',
            maritalStatus: 'single',
            timezone: 'America/New_York',
            language: 'English',
            ssn: '123-45-6789',
            race: 'Caucasian',
            ethnicity: 'Non-Hispanic',
            profilePicture: 'https://example.com/profile1.jpg',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z'
          }
        };

        const patient = mockPatients[id];
        if (patient) {
          resolve(patient);
        } else {
          reject(new Error('Patient not found'));
        }
      }, 500);
    });
  },

  createPatient: async (patientData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPatient = {
          id: 'patient-' + Date.now(),
          ...patientData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        resolve(newPatient);
      }, 1000);
    });
  },

  updatePatient: async (id, patientData) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedPatient = {
          id,
          ...patientData,
          updatedAt: new Date().toISOString()
        };
        resolve(updatedPatient);
      }, 800);
    });
  },

  deletePatient: async (id) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 500);
    });
  }
};

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('health_first_token');
};

// Fetch all patients saga
function* fetchPatients(action) {
  try {
    const token = getAuthToken();
    if (!token) {
      yield put(fetchPatientsFailure('Authentication required'));
      return;
    }

    const filters = action.payload || {};
    const response = yield call(patientAPI.getAllPatients, filters);
    yield put(fetchPatientsSuccess(response));
  } catch (error) {
    yield put(fetchPatientsFailure(error.message));
  }
}

// Get patient by ID saga
function* getPatient(action) {
  try {
    const token = getAuthToken();
    if (!token) {
      yield put(getPatientFailure('Authentication required'));
      return;
    }

    const response = yield call(patientAPI.getPatientById, action.payload);
    yield put(getPatientSuccess(response));
  } catch (error) {
    yield put(getPatientFailure(error.message));
  }
}

// Create patient saga
function* createPatient(action) {
  try {
    const token = getAuthToken();
    if (!token) {
      yield put(createPatientFailure('Authentication required'));
      return;
    }

    const response = yield call(patientAPI.createPatient, action.payload);
    yield put(createPatientSuccess(response));
  } catch (error) {
    yield put(createPatientFailure(error.message));
  }
}

// Update patient saga
function* updatePatient(action) {
  try {
    const token = getAuthToken();
    if (!token) {
      yield put(updatePatientFailure('Authentication required'));
      return;
    }

    const { id, data } = action.payload;
    const response = yield call(patientAPI.updatePatient, id, data);
    yield put(updatePatientSuccess(response));
  } catch (error) {
    yield put(updatePatientFailure(error.message));
  }
}

// Delete patient saga
function* deletePatient(action) {
  try {
    const token = getAuthToken();
    if (!token) {
      yield put(deletePatientFailure('Authentication required'));
      return;
    }

    yield call(patientAPI.deletePatient, action.payload);
    yield put(deletePatientSuccess(action.payload));
  } catch (error) {
    yield put(deletePatientFailure(error.message));
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
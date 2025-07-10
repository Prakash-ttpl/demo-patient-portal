import { call, put, takeLatest, select } from 'redux-saga/effects';
import { 
  registerRequest, 
  registerSuccess, 
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  setToken,
  setUser
} from '../slices/authSlice';
import api from '../../services/api';

// Helper function to save token to localStorage
const saveTokenToStorage = (token) => {
  localStorage.setItem('health_first_token', token);
};

// Helper function to save user to localStorage
const saveUserToStorage = (user) => {
  localStorage.setItem('health_first_user', JSON.stringify(user));
};

// Helper function to get token from localStorage
const getTokenFromStorage = () => {
  return localStorage.getItem('health_first_token');
};

// Helper function to get user from localStorage
const getUserFromStorage = () => {
  const user = localStorage.getItem('health_first_user');
  return user ? JSON.parse(user) : null;
};

// Register saga
function* registerUser(action) {
  try {
    const response = yield call(() =>
      api.post('/auth/register', action.payload)
    );
    const { access_token, user } = response.data;
    localStorage.setItem('health_first_token', access_token);
    localStorage.setItem('health_first_user', JSON.stringify(user));
    yield put(registerSuccess({ access_token, user }));
  } catch (error) {
    let message = 'Registration failed';
    if (error.response) {
      if (error.response.status === 400) {
        message = error.response.data.message || 'Validation error';
      }
    }
    yield put(registerFailure(message));
  }
}

// Login saga
function* loginUser(action) {
  try {
    const response = yield call(() =>
      api.post('/auth/login', action.payload)
    );
    const { access_token, user } = response.data;
    localStorage.setItem('health_first_token', access_token);
    localStorage.setItem('health_first_user', JSON.stringify(user));
    yield put(loginSuccess({ access_token, user }));
  } catch (error) {
    let message = 'Login failed';
    if (error.response) {
      if (error.response.status === 401) {
        message = 'Invalid credentials';
      } else if (error.response.status === 400) {
        message = error.response.data.message || 'Validation error';
      }
    }
    yield put(loginFailure(message));
  }
}

// Initialize auth from storage saga
function* initializeAuth() {
  try {
    const token = getTokenFromStorage();
    const user = getUserFromStorage();
    
    if (token && user) {
      yield put(setToken(token));
      yield put(setUser(user));
    }
  } catch (error) {
    console.error('Error initializing auth from storage:', error);
  }
}

// Watch for auth actions
export function* authSaga() {
  yield takeLatest('auth/registerRequest', registerUser);
  yield takeLatest('auth/loginRequest', loginUser);
  yield takeLatest('auth/initializeAuth', initializeAuth);
}

// Export for initialization
export function* initializeAuthSaga() {
  yield call(initializeAuth);
} 
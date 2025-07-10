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

// Mock API functions (replace with actual API calls)
const authAPI = {
  register: async (userData) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password) {
          resolve({
            access_token: 'mock-jwt-token-' + Date.now(),
            user: {
              id: 'user-' + Date.now(),
              email: userData.email,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          });
        } else {
          reject(new Error('Invalid registration data'));
        }
      }, 1000);
    });
  },

  login: async (credentials) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
          resolve({
            access_token: 'mock-jwt-token-' + Date.now(),
            user: {
              id: 'user-' + Date.now(),
              email: credentials.email,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }
};

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
    const response = yield call(authAPI.register, action.payload);
    
    // Save to localStorage
    saveTokenToStorage(response.access_token);
    saveUserToStorage(response.user);
    
    yield put(registerSuccess(response));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

// Login saga
function* loginUser(action) {
  try {
    const response = yield call(authAPI.login, action.payload);
    
    // Save to localStorage
    saveTokenToStorage(response.access_token);
    saveUserToStorage(response.user);
    
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error.message));
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
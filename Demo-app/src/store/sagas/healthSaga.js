import { call, put, takeLatest } from 'redux-saga/effects';
import {
  healthCheckRequest,
  healthCheckSuccess,
  healthCheckFailure,
} from '../slices/healthSlice';

// Mock API function (replace with actual API call)
const healthAPI = {
  checkHealth: async () => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 95% success rate
        const isHealthy = Math.random() > 0.05;
        
        if (isHealthy) {
          resolve({
            status: 'healthy',
            message: 'Hello World!',
            timestamp: new Date().toISOString(),
            uptime: Math.floor(Math.random() * 86400), // Random uptime in seconds
            version: '1.0.0',
            environment: 'development'
          });
        } else {
          reject(new Error('Service temporarily unavailable'));
        }
      }, 300);
    });
  }
};

// Health check saga
function* checkHealth() {
  try {
    const response = yield call(healthAPI.checkHealth);
    yield put(healthCheckSuccess(response));
  } catch (error) {
    yield put(healthCheckFailure(error.message));
  }
}

// Watch for health actions
export function* healthSaga() {
  yield takeLatest('health/healthCheckRequest', checkHealth);
} 
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  healthCheckRequest,
  healthCheckSuccess,
  healthCheckFailure,
} from '../slices/healthSlice';
import api from '../../services/api';

// Health check saga
function* checkHealth() {
  try {
    const response = yield call(() => api.get('/'));
    yield put(healthCheckSuccess(response.data));
  } catch (error) {
    let message = 'Health check failed';
    if (error.response) {
      message = error.response.data.message || message;
    }
    yield put(healthCheckFailure(message));
  }
}

// Watch for health actions
export function* healthSaga() {
  yield takeLatest('health/healthCheckRequest', checkHealth);
} 
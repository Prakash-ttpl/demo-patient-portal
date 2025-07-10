import { all, fork } from 'redux-saga/effects';
import { authSaga, initializeAuthSaga } from './authSaga';
import { patientSaga } from './patientSaga';
import { healthSaga } from './healthSaga';

// Root saga that combines all sagas
export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(patientSaga),
    fork(healthSaga),
  ]);
}

// Initialize auth on app start
export function* initializeApp() {
  yield fork(initializeAuthSaga);
} 
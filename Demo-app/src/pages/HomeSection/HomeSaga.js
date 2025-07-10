import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  componentKey,
  setHomeData,
  setIsLoading,
  setError,
} from "./HomeSlice";
import store from "../../store/store";
import { addNotifications } from "../../components/common-components/toaster/ToasterSlice";
import HomeDataService from "../../services/HomeDataService";
import { TOASTER_VARIANT } from "../../components/common-components/toaster/Constants";

export const getHomeData = (payload) => {
  return {
    type: "HOME_SECTION/GET_HOME_DATA",
    payload,
  };
};

function* getHomeDataAsync() {
  try {
    yield put(setIsLoading(true));
    yield put(setError(null));
    
    const response = yield call(HomeDataService.getHomeData);
    const { data, status } = response;

    if (status === 200) {
      yield put(setHomeData(data));
      yield put(
        addNotifications({
          message: "Home data fetched successfully!",
          variant: TOASTER_VARIANT.SUCCESS,
        })
      );
    }
  } catch (error) {
    console.log("err: ", error);
    yield put(setError(error.message || "Failed to fetch home data"));
    yield put(
      addNotifications({
        message: "Failed to fetch home data. Please try again.",
        variant: TOASTER_VARIANT.ERROR,
      })
    );
  } finally {
    yield put(setIsLoading(false));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(getHomeData().type, getHomeDataAsync),
  ]);
}

store.sagaManager.addSaga(componentKey, rootSaga);

import { all, takeEvery } from "redux-saga/effects";
import General from "../../../libs/utility/General";
import DropdownDataService from "../../../services/DropdownDataService";
import store from "../../../store/store";
import { componentKey } from "./SelectDropdownSlice";

export const { getSelectOptions } = {
  getSelectOptions: (payload) => {
    return {
      type: "SELECT_DROPDOWN/GET_ALL_ROLES_AND_RESP",
      payload,
    };
  },
};

function* getSelectOptionsAsync(action) {
  const {
    url,
    params,
    labelKey,
    valueKey,
    labelKey2,
    addOptions,
    handlePaginationChange,
    onHasMoreUpdate,
  } = action.payload;

  try {
    const { data, status } = yield DropdownDataService.getOptions(url, params);

    if (status === 200) {
      const fetchedData = data?.data || { data: [], totalRecords: 0 };

      const options = General.addLableValuePair(
        fetchedData.data,
        labelKey,
        valueKey,
        labelKey2
      );

      handlePaginationChange({ totalRecords: fetchedData.totalRecords });

      addOptions(options);

      if (onHasMoreUpdate) {
        const hasMore = (params.page * params.limit) < fetchedData.totalRecords;
        onHasMoreUpdate(hasMore);
      }
    }
  } catch (error) {
    console.log(error);
    if (onHasMoreUpdate) {
      onHasMoreUpdate(false);
    }
  }
}

function* rootSaga() {
  yield all([takeEvery(getSelectOptions().type, getSelectOptionsAsync)]);
}

store.sagaManager.addSaga(componentKey, rootSaga);

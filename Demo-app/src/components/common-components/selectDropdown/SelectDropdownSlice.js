import store from "../../../store/store";

export const componentKey = "SELECT_DROPDOWN_SLICE";

const { actions } = store.reducerManager.add({
  key: componentKey,
  addedReducers: {},
  initialReducerState: {},
});

export const { setPaginationState, setDropdownOptions } = actions;

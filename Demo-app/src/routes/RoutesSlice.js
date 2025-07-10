import store from "../store/store";
export const componentKey = "APP_ROUTES";

const { actions } = store.reducerManager.add({
  key: componentKey,
  addedReducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  initialReducerState: {
    loggedInUser: {},
  },
});

export const { setLoggedInUser } = actions;

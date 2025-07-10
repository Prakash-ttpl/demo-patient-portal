import store from "../../store/store";

export const componentKey = "HOME_SECTION";

const initialState = {
  homeData: [],
  isLoading: false,
  error: null,
};

const { actions } = store.reducerManager.add({
  key: componentKey,
  addedReducers: {
    setHomeData: (state, action) => {
      state.homeData = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  initialReducerState: initialState,
});

export const {
  setHomeData,
  setIsLoading,
  setError,
} = actions;

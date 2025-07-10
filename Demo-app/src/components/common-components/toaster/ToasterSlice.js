import store from "../../../store/store";

export const componentKey = "APP/TOASTERS";

const { actions } = store.reducerManager.add({
  key: componentKey,
  addedReducers: {
    addNotifications: (state, action) => {
      state.notifications = [...state.notifications, action.payload];
    },
    removeNotification: (state) => {
      state.notifications = [];
    },
  },
  initialReducerState: {
    notifications: [],
  },
});

export const { addNotifications, removeNotification } = actions;

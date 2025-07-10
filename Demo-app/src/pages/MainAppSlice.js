import store from "../store/store"

export const componentKey = 'HOME_SECTION'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload
        },
    },
    initialReducerState: {
        loadingState: false,
    }
})

export const { setLoadingState } = actions
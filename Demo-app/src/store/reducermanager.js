import { combineReducers } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import patientReducer from './slices/patientSlice'
import healthReducer from './slices/healthSlice'

export default function createReducerManager() {
    const initialState = {
        auth: {
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,
            registerLoading: false,
            registerError: null,
            loginLoading: false,
            loginError: null,
        },
        patients: {
            patients: [],
            currentPatient: null,
            loading: false,
            error: null,
            createLoading: false,
            createError: null,
            updateLoading: false,
            updateError: null,
            deleteLoading: false,
            deleteError: null,
            fetchLoading: false,
            fetchError: null,
            totalPatients: 0,
            currentPage: 1,
            pageSize: 10,
            filters: {
                search: '',
                gender: '',
                maritalStatus: '',
                race: '',
                ethnicity: '',
            },
        },
        health: {
            healthStatus: null,
            loading: false,
            error: null,
            lastChecked: null,
            isHealthy: false,
        }
    }
    const reducers = {
        auth: authReducer,
        patients: patientReducer,
        health: healthReducer,
    }
    let combinedReducer = null
    let keysToRemove = []

    return {
        reduce: (state, action) => {
            // If any reducers have been removed, clean up their state first
            if (keysToRemove.length > 0) {
                state = { ...state }
                for (let key of keysToRemove) {
                    delete state[key]
                    state[key] = initialState[key]
                }
                keysToRemove = []
            }
            return combinedReducer ? combinedReducer(state, action) : initialState
        },

        // Adds a new reducer with the specified key
        add: ({ key, addedReducers, initialReducerState }) => {
            if (!key || reducers[key]) {
                return
            }

            const slice = createSlice({
                name: key,
                initialState: initialReducerState,
                reducers: addedReducers,
            })

            initialState[key] = initialReducerState
            reducers[key] = slice.reducer

            combinedReducer = combineReducers(reducers)
            return { actions: slice.actions }
        },

        remove: key => {
            if (!key || !reducers[key]) {
                return
            }
            keysToRemove.push(key)
            combinedReducer = combineReducers(reducers)
        }
    }
}

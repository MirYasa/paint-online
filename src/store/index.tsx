import {configureStore} from "@reduxjs/toolkit"
import toolReducer from './toolkit/reducer'

export const store = configureStore({
    reducer: {
        toolReducer
    }
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

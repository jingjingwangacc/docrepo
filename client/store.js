import { configureStore } from "@reduxjs/toolkit"
import submitReducer from './slice/submitSlice.js'
import reviewReducer from './slice/reviewSlice.js'
import homeReducer from './slice/homeSlice.js'

export const store = configureStore(
    {
        reducer: {
            submit: submitReducer,
            review: reviewReducer,
            home: homeReducer
        }
    })
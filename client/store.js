import { configureStore } from "@reduxjs/toolkit"
import submitReducer from './slice/slice.js'

export const store = configureStore({reducer: {submit: submitReducer}})
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/couter/counterSlide'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})
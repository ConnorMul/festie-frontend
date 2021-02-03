import { configureStore } from "@reduxjs/toolkit";
import festivalReducer from './festival'

const store = configureStore({
    reducer: {
        festival: festivalReducer
    }
})

export default store
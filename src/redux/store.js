// Import necessary dependencies 
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { courseReducer } from "./reducers/courseReducer";


// Create a Redux store using configureStore
export const store = configureStore({
    reducer: {
        authReducer,
        courseReducer
    }
})
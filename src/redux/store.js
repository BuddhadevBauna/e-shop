import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";

const store = configureStore({
    reducer : {
        allProduct : productReducer
    }
})

export default store;
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import categoryReducer from "./reducers/categorySlice";

const store = configureStore({
    reducer : {
        allCategory : categoryReducer,
        allProduct : productReducer
    }
})

export default store;
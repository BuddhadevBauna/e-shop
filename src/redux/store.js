import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import categoryReducer from "./reducers/categorySlice";
import productsCategoryReducer from "./reducers/productsCategorySlice";

const store = configureStore({
    reducer : {
        allCategory : categoryReducer,
        allProduct : productReducer,
        categoryProducts : productsCategoryReducer
    }
})

export default store;
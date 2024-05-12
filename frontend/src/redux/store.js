import { configureStore } from "@reduxjs/toolkit";
import allProductReducer from "./reducers/allProductSlice";
import categoryReducer from "./reducers/categorySlice";
import productsOfCategoryReducer from "./reducers/productsOfCategorySlice";
import productDetailsReducer from "./reducers/productDetailsSlice";

const store = configureStore({
    reducer : {
        allCategory : categoryReducer,
        allProduct : allProductReducer,
        categoryProducts : productsOfCategoryReducer,
        productDetails : productDetailsReducer
    }
})

export default store;
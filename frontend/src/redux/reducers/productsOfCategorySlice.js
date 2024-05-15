import { createSlice } from "@reduxjs/toolkit";

const productsOfCategorySlice = createSlice(
    {
        name : "products of category",
        initialState : {
            products: [],
            searchProducts: []
        },
        reducers : {
            setProductsOfCategory(state, action) {
                // console.log(action.payload);
                return {
                    ...state, 
                    products: [...action.payload]
                };
            },
            setProductsOfCategorySearch(state, action) {
                return {
                    ...state, 
                    searchProducts: [...action.payload]
                };
            },
            removeCategoryProducts() {
                return {};
            },
        }
    }
)

export const { setProductsOfCategory, setProductsOfCategorySearch, removeCategoryProducts} = productsOfCategorySlice.actions
export default productsOfCategorySlice.reducer
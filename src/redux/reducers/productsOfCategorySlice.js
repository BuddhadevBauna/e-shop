import { createSlice } from "@reduxjs/toolkit";

const productsOfCategorySlice = createSlice(
    {
        name : "products of category",
        initialState : {},
        reducers : {
            setProductsOfCategory(state, action) {
                // console.log(action.payload);
                return {...state, ...action.payload};
            },
            removeProductOfCategory() {
                return {};
            }
        }
    }
)

export const { setProductsOfCategory, removeProductOfCategory } = productsOfCategorySlice.actions
export default productsOfCategorySlice.reducer
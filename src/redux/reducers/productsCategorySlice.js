import { createSlice } from "@reduxjs/toolkit";

const productsCategorySlice = createSlice(
    {
        name : "products of category",
        initialState : {},
        reducers : {
            setProductsOfCategory(state, action) {
                // console.log(action.payload);
                return {...state, ...action.payload};
            }
        }
    }
)

export const { setProductsOfCategory } = productsCategorySlice.actions
export default productsCategorySlice.reducer
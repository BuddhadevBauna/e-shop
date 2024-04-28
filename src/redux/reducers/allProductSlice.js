import { createSlice } from "@reduxjs/toolkit";

const allProductSlice = createSlice(
    {
        name : 'products',
        initialState : {},
        reducers : {
            setAllProducts(state, action) {
                return {...state, ...action.payload};
            }
        }
        
    }
)

// Action creators are generated for each case reducer function
export const { setAllProducts } = allProductSlice.actions
export default allProductSlice.reducer

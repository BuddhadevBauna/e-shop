import { createSlice } from "@reduxjs/toolkit";


const categorySlice = createSlice(
    {
        name : "categories",
        initialState : [],
        reducers  : {
            setCategories(state, action){
                // console.log([...state, ...action.payload]);
                return [...state, ...action.payload];
            }
        }
    }
)

export const { setCategories } = categorySlice.actions
export default categorySlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const productDetailsSlice = createSlice(
    {
        name: "product details",
        initialState: {},
        reducers: {
            setProductDetails(state, action) {
                return {...state, ...action.payload};
            },
            removeProductDetails() {
                return {};
            }
        }
    }
)

export const { setProductDetails, removeProductDetails } = productDetailsSlice.actions
export default productDetailsSlice.reducer
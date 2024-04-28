import React, { useEffect } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "../../../redux/reducers/productDetailsSlice";

const ProductDetails = () => {
    const product = useSelector((state) => state.productDetails);
    console.log(product);

    const { productId } = useParams();
    // console.log(productId);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProductDetails = async() => {
            try {
                const response = await axios('https://dummyjson.com/products/' + productId);
                // console.log(response);
                // console.log(response.data);
                dispatch(setProductDetails(response.data));
            } catch (error) {
                console.log(error);
            }
        } 
        fetchProductDetails();
    })

    // const renderItem = () => {
    //     let {} = product;
    //     return (
    //         <div>

    //         </div>
    //     );
    // }

    return (
        <h1>Hello</h1>
    );
}

export default ProductDetails;
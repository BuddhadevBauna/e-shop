import React, { useEffect } from "react";
import AllProductDetailsPage from "./ProductDetails/AllProductDetailsPage";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/reducers/productSlice";
import axios from "axios";

const AllProduct = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const response = await axios('https://dummyjson.com/products');
                if (response.status === 200) {
                    dispatch(setProducts(response.data));
                } else {
                    console.log("Failed to fetch products: ", response.status);
                }
            } catch (error) {
                console.log(error.messege);
            }
        }
        fetchProducts();
    }, [dispatch])

    return (
        <div className="grid-container">
            <AllProductDetailsPage />
        </div>
    );
}

export default AllProduct;
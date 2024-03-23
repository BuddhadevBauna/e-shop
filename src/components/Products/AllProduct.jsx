import React, { useEffect } from "react";
import "./AllProduct.css";
import AllProductDetailsPage from "./ProductDetails/AllProductDetailsPage";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/reducers/productSlice";
import { setCategories } from "../../redux/reducers/categorySlice";
import axios from "axios";
import AllCategories from "./filter/AllCategories";

const AllProduct = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProductsCategory = async () => {
            try {
                const response = await axios('https://dummyjson.com/products/categories');
                if (response.status === 200) {
                    // console.log(response);
                    // console.log(response.data);
                    dispatch(setCategories(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductsCategory();
    }, [dispatch]);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios('https://dummyjson.com/products');
                if (response.status === 200) {
                    // console.log(response);
                    // console.log(response.data);
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
        <div className="container">
            <div className="flex-container">
                <h1>Category</h1>
                <AllCategories />
            </div>
            <div className="grid-container">
                <AllProductDetailsPage />
            </div>
        </div>
    );
}

export default AllProduct;
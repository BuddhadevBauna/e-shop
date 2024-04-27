import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../redux/reducers/productSlice";
import axios from "axios";
import ProductsView from "../productView/ProductsView";

const Products = () => {
    const dispatch = useDispatch();

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
        <ProductsView 
            menu = "allProducts"
        />
    );
}

export default Products;
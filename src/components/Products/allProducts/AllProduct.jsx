import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllProducts } from "../../../redux/reducers/allProductSlice";
import axios from "axios";
import ProductsView from "../productView/ProductsView";
import { removeProductOfCategory } from "../../../redux/reducers/productsOfCategorySlice";

const AllProduct = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(removeProductOfCategory());
            try {
                const response = await axios('https://dummyjson.com/products');
                if (response.status === 200) {
                    // console.log(response);
                    // console.log(response.data);
                    dispatch(setAllProducts(response.data));
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

export default AllProduct;
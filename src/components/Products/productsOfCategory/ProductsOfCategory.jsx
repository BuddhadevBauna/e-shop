import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setProductsOfCategory } from "../../../redux/reducers/productsOfCategorySlice";
import ProductsView from "../productView/ProductsView";

const ProductsOfCategory = () => {
    const { particularCategory } = useParams();
    // console.log(particularCategory);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProductsOfCategory = async() => {
            try {
                const response = await axios(`https://dummyjson.com/products/category/${particularCategory}`);
                // console.log(response);
                // console.log(response.data);
                dispatch(setProductsOfCategory(response.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductsOfCategory();
    }, [particularCategory, dispatch]);


    return (
        <ProductsView 
            menu = "productsOfCategory"
        />  
    );
}

export default ProductsOfCategory;
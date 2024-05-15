import React, { useEffect } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeProductDetails, setProductDetails } from "../../../redux/reducers/productDetailsSlice";
import { removeCategoryProducts, setProductsOfCategory } from "../../../redux/reducers/productsOfCategorySlice";
import DetailsItem from "./detailsContainer/DetailsItem";
import { SimilarProductSlider } from "./slider/Slider";



const ProductDetails = () => {
    const particularProduct = useSelector((state) => state.productDetails);
    // console.log(particularProduct);


    const { productId } = useParams();
    // console.log(productId);

    //for fetching particular product
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProductDetails = async () => {
            dispatch(removeProductDetails());
            dispatch(removeCategoryProducts());
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
    }, [productId, dispatch])


    //for fetching category of products
    useEffect(() => {
        const fetchProductsOfCategory = async () => {
            try {
                // console.log(particularProduct.category);
                const response = await axios(`https://dummyjson.com/products/category/${particularProduct.category}`);
                // console.log(response);
                // console.log(response.data.products);
                dispatch(setProductsOfCategory(response.data.products));
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductsOfCategory();
    }, [particularProduct.category, dispatch])

   
    return (
        <div className="product-similar-products">
            <>{DetailsItem()}</>
            <>{SimilarProductSlider()}</>
        </div>
    );
}

export default ProductDetails;
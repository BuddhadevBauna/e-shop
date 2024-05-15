import React, { useEffect, useState } from "react";
import "./ProductsOfCategoryContainer.css";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {   setProductsOfCategory, setProductsOfCategorySearch, removeCategoryProducts } from "../../../redux/reducers/productsOfCategorySlice";
import { removeProductDetails } from "../../../redux/reducers/productDetailsSlice";
import ProductsOfCategory from "./ProductOfCategory";


const ProductsOfCategoryContainer = () => {
    // This for search filter
    const location = useLocation();
    const { searchCategories, searchProducts } = location.state || {};
    // console.log(searchCategories);
    // console.log(searchProducts);


    //Apply filters, This for (all screen)--->
    const [filters, setFilters] = useState({
        brand: [],
        rating: [],
        price: [],
    });
    // console.log(filters);

    //This for (all screen)----->
    const [brandFilter, setBrandFilter] = useState([]);
    // console.log(brandFilter);
    const [ratingFilter, setRatingFilter] = useState([]);
    // console.log(ratingFilter);
    const [priceFilter, setPriceFilter] = useState([]);
    // console.log(priceFilter);

    //This for (small screen)---->
    const [isCategoryContainerActive, setCategoryContainerActive] = useState(false);
    const [isBrandContainerActive, setBrandContainerActive] = useState(false);
    const [isRatingContainerActive, setRatingContainerActive] = useState(false);
    const [isPriceContainerActive, setPriceContainerActive] = useState(false);


    const { particularCategory } = useParams();
    // console.log(particularCategory);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProductsOfCategory = async () => {
            dispatch(removeProductDetails());
            dispatch(removeCategoryProducts());
            //Clear Filters
            setBrandFilter([]);
            setRatingFilter([]);
            setPriceFilter([]);
            setFilters(() => {
                return {
                    brand: [],
                    rating: [],
                    price: []
                }
            })
            //Clear active container in (small screen)---->
            if(window.innerWidth <= 767) {
                setCategoryContainerActive(false);
                setBrandContainerActive(false);
                setRatingContainerActive(false);
                setPriceContainerActive(false);
            }

            try {
                if(!searchProducts) {
                    const response = await axios(
                        `https://dummyjson.com/products/category/${particularCategory}`
                    );
                    // console.log(response);
                    // console.log(response.data.products);
                    dispatch(setProductsOfCategory(response.data.products));
                } else {
                    dispatch(setProductsOfCategorySearch(searchProducts));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchProductsOfCategory();
    }, [particularCategory, dispatch, searchProducts]);

    return (
        <ProductsOfCategory
            filters={filters}
            setFilters={setFilters}
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            isCategoryContainerActive={isCategoryContainerActive}
            setCategoryContainerActive={setCategoryContainerActive}
            isBrandContainerActive={isBrandContainerActive}
            setBrandContainerActive={setBrandContainerActive}
            isRatingContainerActive={isRatingContainerActive}
            setRatingContainerActive={setRatingContainerActive}
            isPriceContainerActive={isPriceContainerActive}
            setPriceContainerActive={setPriceContainerActive}
            //for search logic
            searchCategories={searchCategories}
        />
    )
}

export default ProductsOfCategoryContainer;
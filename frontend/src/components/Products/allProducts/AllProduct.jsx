import React, { useEffect } from "react";
import "./AllProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../../../redux/reducers/allProductSlice";
import axios from "axios";
import { removeCategoryProducts } from "../../../redux/reducers/productsOfCategorySlice";
import Product from "../product/Product";
import { removeProductDetails } from "../../../redux/reducers/productDetailsSlice";

const AllProduct = () => {
    const products = useSelector((state) => state.allProduct.products);
    // console.log(products);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(removeCategoryProducts());
            dispatch(removeProductDetails());
            try {
                const response = await axios("https://dummyjson.com/products");
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
        };
        fetchProducts();
    }, [dispatch]);

    
    if (!products) {
        return <div>Loading...</div>;
    }
    const renderList = products.map((product, index) => {
        return (
            <Product
                key={product.id}
                products={products}
                product={product}
                index={index}
            />
        );
    });

    return (
        <div className="grid-container">
            {renderList}
        </div>
    );
};

export default AllProduct;

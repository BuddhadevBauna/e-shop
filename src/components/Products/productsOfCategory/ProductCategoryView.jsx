import React, { useEffect } from "react";
// import "../allProducts/Products.css"
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setProductsOfCategory } from "../../../redux/reducers/productsCategorySlice";

const ProductCategoryView = () => {
    const products = useSelector((state) => state.categoryProducts.products);
    // console.log(products);

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

    if (!products) {
        return <div>Loading...</div>;
    }

    const renderList = products.map((product) => {
        let { id, title, images, price, category } = product;
        return (
            <div className="product-container" key={id}>
                <img className="product-img" src={images[0]} alt={title} />
                <div className="product-body">
                    <p className="product-text">{title.length > 25 ? title.substring(0, 25) + "..." : title}</p>
                    <div>
                        <small className="product-category">{category}</small>
                        <button type="button" className="btn product-price">$ {price}</button>
                    </div>
                </div>
            </div>
        );
    })

    return (
        <>{ renderList }</>
    );
}

export default ProductCategoryView;
import React, { useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../redux/reducers/productSlice";
import axios from "axios";

const Products = () => {
    const products = useSelector(state => state.allProduct.products);
    // console.log(products);


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

export default Products;
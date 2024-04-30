import React, { useEffect, useState } from "react";
import "./AllProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../../../redux/reducers/allProductSlice";
import axios from "axios";
import { removeProductOfCategory } from "../../../redux/reducers/productsOfCategorySlice";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const AllProduct = () => {
    const products = useSelector((state) => state.allProduct.products);

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

    const [hoverStates, setHoverStates] = useState(products ? new Array(products.length).fill(false) : []);
    const handleMouseHover = (index) => {
        const newHoverStates = [...hoverStates];
        newHoverStates[index] = true;
        setHoverStates(newHoverStates);
    }
    const handleMouseLeave = (index) => {
        const newHoverStates = [...hoverStates];
        newHoverStates[index] = false;
        setHoverStates(newHoverStates);
    }
    // console.log(hoverStates);


    if (!products) {
        return <div>Loading...</div>;
    }
    const renderList = products.map((product, index) => {
        let { id, title, images, category, price, discountPercentage, rating } = product;
        let MRP = price / (1 - (discountPercentage / 100));
        let MRPInt = Math.round(MRP);
        return (
            <Link to={`/products/${id}`} className="product-container" key={id} >
                <img className="product-img" src={images[0]} alt={title} />
                <div className="product-body">
                    <div className="product-stock">
                        <small>{category}</small>
                        <i
                            onMouseOver={() => handleMouseHover(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            {hoverStates[index] ? <FaHeart className="heart"/> : <FaRegHeart />}
                        </i>
                    </div>
                    <div className="product-name">
                        <p>{title.length > 25 ? title.substring(0, 25) + "..." : title}</p>
                    </div>
                    <div className="product-buy">
                        <p>₹ {price}</p>
                        <small><span>₹ {MRPInt}</span> {discountPercentage}% off </small>
                        <small className="rating">{rating} ★</small>
                    </div>
                    <div className="product-btn">
                        <button type="button" className="btn">Add To Cart</button>
                        <Link to={`/products/${id}`} className="btn view-btn">
                            <i><IoEyeSharp /></i>
                        </Link>
                    </div>
                </div>
            </Link>
        );
    })

    return (
        <div className="grid-container">
            {renderList}
        </div>
    );
}

export default AllProduct;
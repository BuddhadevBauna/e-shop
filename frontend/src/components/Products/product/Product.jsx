import React, { useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";


const Product = (props) => {
    const products = props.products;
    const [hoverStates, setHoverStates] = useState(
        products ? new Array(products.length).fill(false) : []
    );
    const handleMouseHover = (index) => {
        const newHoverStates = [...hoverStates];
        newHoverStates[index] = true;
        setHoverStates(newHoverStates);
    };
    const handleMouseLeave = (index) => {
        const newHoverStates = [...hoverStates];
        newHoverStates[index] = false;
        setHoverStates(newHoverStates);
    };
    // console.log(hoverStates);


    let { id, title, thumbnail, category, price, discountPercentage, rating } = props.product;
    let MRP = price / (1 - discountPercentage / 100);
    let MRPInt = Math.round(MRP);
    return (
        <div className="product-container">
            <Link to={`/products/${id}`} className="product-img">
                <img className="image" src={thumbnail} alt={`${category}-img`} />
            </Link>
            <div className="product-body">
                <div className="product-stock">
                    <small>{category}</small>
                    <i
                        onMouseOver={() => handleMouseHover(props.index)}
                        onMouseLeave={() => handleMouseLeave(props.index)}
                    >
                        {hoverStates[props.index] ? (
                            <FaHeart className="heart" />
                        ) : (
                            <FaRegHeart />
                        )}
                    </i>
                </div>
                <Link to={`/products/${id}`} className="product-name">
                    <p>{title.length > 25 ? title.substring(0, 25) + "..." : title}</p>
                </Link>
                <div className="product-buy">
                    <p>₹ {price}</p>
                    <small>
                        <span>₹ {MRPInt}</span> {discountPercentage}% off{" "}
                    </small>
                    <small className="rating">{rating} ★</small>
                </div>
                <div className="product-btn">
                    <Link to={"/cart"} className="btn">
                        Add To Cart
                    </Link>
                    <Link to={`/products/${id}`} className="btn view-btn">
                        <i>
                            <IoEyeSharp />
                        </i>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Product;
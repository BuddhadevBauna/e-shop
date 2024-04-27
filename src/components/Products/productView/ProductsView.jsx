import React from "react";
import "./ProductsView.css";
import { useSelector } from "react-redux";

const ProductsView = (props) => {
    const products = useSelector((state) => {
        return (props.menu === "allProducts" 
        ? state.allProduct.products
        : state.categoryProducts.products);
    });
    // console.log(products);


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
        <div className="grid-container">
            { renderList }
        </div>
    );
}

export default ProductsView;
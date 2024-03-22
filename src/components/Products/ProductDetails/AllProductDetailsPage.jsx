import React from "react";
import { useSelector } from "react-redux";
import "./AllProductDetailsPage.css"

const AllProductDetailsPage = () => {
    const products = useSelector(state => state.allProduct.products);
    console.log(products);

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
        <>{renderList}</>
    );
}

export default AllProductDetailsPage;
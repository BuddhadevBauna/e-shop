import React from "react";
import "./ProductRoot.css";
import { Outlet } from "react-router-dom";
import AllCategories from "../../components/Products/allCategories/AllCategories";

const ProductRoot = () => {
    return (
        <div className="container">
            <AllCategories />
            <Outlet />
        </div>
    );
}

export default ProductRoot;
import React from "react";
import "./ProductRoot.css";
import { Outlet } from "react-router-dom";
import AllCategories from "../components/Products/allCategories/AllCategories";

const ProductRoot = () => {
    return (
        <div className="container">
            <AllCategories />
            <div className="grid-container">
                <Outlet />
            </div>
        </div>
    );
}

export default ProductRoot;
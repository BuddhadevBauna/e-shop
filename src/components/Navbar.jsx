import React from "react";
import "./Navbar.css";
import { ImAidKit } from "react-icons/im";
import { MdAccountCircle } from "react-icons/md";
import {
    FaCartArrowDown,
    FaProductHunt,
    FaSearch,
} from "react-icons/fa";

const Navbar = () => {

    return (
        <div className="navabar-container">
            <div className="main-container">
                <h1 className="logo">
                    <ImAidKit />
                </h1>
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search products..." />
                <button className="search-btn">
                    <i className="search-icon">
                        <FaSearch />
                    </i>
                </button>
            </div>
            <ul className="list-item-container">
                <li className="list-item">
                    <i>
                        <MdAccountCircle />
                    </i>
                    <p>Account</p>
                </li>
                <li className="list-item">
                    <i>
                        <FaProductHunt />
                    </i>
                    <p>Product</p>
                </li>
                <li className="list-item">
                    <i>
                        <FaCartArrowDown />
                    </i>
                    <p>Cart</p>
                </li>
            </ul>
        </div>
    );
};
export default Navbar;

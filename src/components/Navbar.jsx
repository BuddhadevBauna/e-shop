import React, { useState } from "react";
import "./Navbar.css";
import { ImAidKit } from "react-icons/im";
import { MdAccountCircle } from "react-icons/md";
import {
    FaArrowUp,
    FaBars,
    FaCartArrowDown,
    FaProductHunt,
    FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isSearchContainerVisible, setSearchContainerVisible] = useState(false);
    const toggleSearchContainer = () => {
        setSearchContainerVisible(!isSearchContainerVisible);
    }
    const collapseNavbar = () => {
        setSearchContainerVisible(!isSearchContainerVisible);
    }
    const [isListchContainerVisible, setListContainerVisible] = useState(false);
    const toggleListContainer = () => {
        setListContainerVisible(!isListchContainerVisible);
    }

    return (
        <div
            className={`navabar-container ${isSearchContainerVisible ? "navbar-container-sm" : ""}`}
        >
            <div className="main-container">
                <div className="sidebar-container">
                    <i className="sidebar-icon-sm" onClick={toggleListContainer}>
                        <FaBars />
                    </i>
                    <h1 className="logo">
                        <ImAidKit />
                    </h1>
                </div>
                <div className="search-and-account-sm">
                    <button className="search-btn" onClick={toggleSearchContainer}>
                        <i className="search-icon">
                            <FaSearch />
                        </i>
                    </button>
                    <Link className="nav-link" to="/login">
                        <i><MdAccountCircle /></i>
                        <p>Account</p>
                    </Link>
                </div>
            </div>
            <div
                className={`search-container ${isSearchContainerVisible ? "search-active" : ""}`}
            >
                <div className="search-box-and-submit-btn">
                    <input type="text" placeholder="Search products..." />
                    <button className="search-btn">
                        <i className="search-icon">
                            <FaSearch />
                        </i>
                    </button>
                </div>
                <i className="collapse-icon-sm" onClick={collapseNavbar}>
                    <FaArrowUp />
                </i>
            </div>
            <ul
                className={`list-item-container 
                ${isSearchContainerVisible ? "list-item-container-sm" : ""}
                ${isListchContainerVisible ? "list-active" : ""}`}
            >
                <li className="list-item">
                    <Link className="nav-link" to="/login">
                        <i><MdAccountCircle /></i>
                        <p>Account</p>
                    </Link>
                </li>
                <li className="list-item">
                    <Link className="nav-link" to="/products">
                        <i><FaProductHunt /></i>
                        <p>Product</p>
                    </Link>
                </li>
                <li className="list-item">
                    <Link className="nav-link" to="/cart">
                        <i><FaCartArrowDown /></i>
                        <p>Cart</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export default Navbar;

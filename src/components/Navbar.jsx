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

const Navbar = () => {
    const[isSearchContainerVisible, setSearchContainerVisible] = useState(false);
    const handleSearchContainer = () => {
        setSearchContainerVisible(!isSearchContainerVisible);
    }
    const collapseNavbar = () => {
        setSearchContainerVisible(!isSearchContainerVisible);
    }

    return (
        <div 
            className={`navabar-container ${isSearchContainerVisible ? "navbar-container-sm" : ""}`}
        >
            <div className="main-container">
                <div className="sidebar-container">
                    <i className="sidebar-icon-sm">
                        <FaBars />
                    </i>
                    <h1 className="logo">
                        <ImAidKit />
                    </h1>
                </div>
                <div className="search-and-account-sm">
                    <button className="search-btn" onClick={handleSearchContainer}>
                        <i className="search-icon">
                            <FaSearch />
                        </i>
                    </button>
                    <li className="list-item">
                        <i>
                            <MdAccountCircle />
                        </i>
                        <p>Account</p>
                    </li>
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
                className={`list-item-container ${isSearchContainerVisible ? "list-item-container-sm" : ""}`}
            >
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

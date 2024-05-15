import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchContainer = () => {
    const categories = useSelector((state) => state.allCategory);

    const navigate = useNavigate();

    const [input, setInput] = useState("");
    const [resultProducts, setResultProducts] = useState([]);

    const handleChange = (value) => {
        setInput(value);
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            // console.log("Enter key pressed");
            fetchSearchResults(input);
            setInput("");
        }
    }
    const handleButtonClick = () => {
        fetchSearchResults(input);
        setInput("");
    }
    const fetchSearchResults = (value) => {
        if (!value) {
            setResultProducts([]);
        } else {
            const result = categories.filter(category => {
                return category && category.toLowerCase().includes(value.toLowerCase());
            })
            setResultProducts([]);
            if (result.length === 0) {
                categories.forEach(category => {
                    fetchProductsForCategory(input, category);
                });
            } else {
                navigate(`products/category/${result[0]}`, { state : {searchCategories : result}});
            }
        }
    }
    const fetchProductsForCategory = async (value, category) => {
        const response = await axios(`https://dummyjson.com/products/category/${category}`);
        // console.log(response);
        const result = response.data.products.filter(product => {
            return product && product.title && product.title.toLowerCase().includes(value.toLowerCase());
        })
        if (result.length !== 0) {
            // console.log(result);
            setResultProducts((prevProducts) => {
                return [...prevProducts, result]
            });
        }
    }
    useEffect(() => {
        if(resultProducts.length !== 0) {
            navigate(`products/category/${resultProducts[0][0].category}`, { state : {searchProducts : resultProducts}});
        }
    }, [navigate, resultProducts])
    // console.log(resultProducts);

    return (
        <>
            <input
                type="text"
                placeholder="Search products..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            <button className="search-btn" onClick={() => handleButtonClick()}>
                <i className="search-icon">
                    <FaSearch />
                </i>
            </button>
        </>
    );
}

export default SearchContainer;
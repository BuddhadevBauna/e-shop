import React, { useEffect, useRef, useState } from "react";
import "./ProductsOfCategory.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setProductsOfCategory } from "../../../redux/reducers/productsOfCategorySlice";
import { FaRegHeart } from "react-icons/fa";

const ProductsOfCategory = () => {
    const products = useSelector((state) => state.categoryProducts.products);
    // console.log(products);

    const { particularCategory } = useParams();
    // console.log(particularCategory);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProductsOfCategory = async () => {
            try {
                const response = await axios(`https://dummyjson.com/products/category/${particularCategory}`);
                // console.log(response);
                // console.log(response.data);
                dispatch(setProductsOfCategory(response.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductsOfCategory();
    }, [particularCategory, dispatch]);

    useEffect(() => {
        const handaleResize = () => {
            if (window.innerWidth > 767) {
                setCategory(true);
                setBrand(true);
                setRating(true);
                setPrice(true);
            } else {
                setCategory(false);
                setBrand(false);
                setRating(false);
                setPrice(false);
            }
        }

        //Call handaleResize initially
        handaleResize();

        //add Event Listner for window resize
        window.addEventListener("resize", handaleResize);

        //CleanUp
        return () => {
            window.addEventListener("resize", handaleResize);
        }
    }, [])

    const filterContainerRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterContainerRef.current && !filterContainerRef.current.contains(event.target)) {
                if (window.innerWidth > 767) {
                    setCategory(true);
                    setBrand(true);
                    setRating(true);
                    setPrice(true);
                } else {
                    setCategory(false);
                    setBrand(false);
                    setRating(false);
                    setPrice(false);
                }
            }
        };
        const handleScroll = () => {
            if (window.innerWidth > 767) {
                setCategory(true);
                setBrand(true);
                setRating(true);
                setPrice(true);
            } else {
                setCategory(false);
                setBrand(false);
                setRating(false);
                setPrice(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [isCategory, setCategory] = useState(false);
    const [isBrand, setBrand] = useState(false);
    const [isRating, setRating] = useState(false);
    const [isPrice, setPrice] = useState(false);
    //for check any of filter active
    const handleCategory = () => {
        if (window.innerWidth <= 767) {
            setCategory(!isCategory);
            // Another filter deactive
            setBrand(false);
            setRating(false);
            setPrice(false);
        }
    }
    const handleBrand = () => {
        if (window.innerWidth <= 767) {
            setBrand(!isBrand);
            // Another filter deactive
            setCategory(false);
            setRating(false);
            setPrice(false);
        }
    }
    const handleRating = () => {
        if (window.innerWidth <= 767) {
            setRating(!isRating);
            // Another filter deactive
            setCategory(false);
            setBrand(false);
            setPrice(false);
        }
    }
    const handlePrice = () => {
        if (window.innerWidth <= 767) {
            setPrice(!isPrice);
            // Another filter deactive
            setCategory(false);
            setBrand(false);
            setRating(false);
        }
    }

    const disableLink = (e) => {
        if ((isCategory || isBrand || isRating || isPrice) && window.innerWidth <= 767) {
            e.preventDefault();
        }
    }

    const [filters, setFilters] = useState({
        brand: [],
        rating: [],
        price: []
    })
    const handleBrandFilters = (brand, isChecked) => {
        // console.log(isChecked);
        setFilters(prevFilters => {
            //If the brand is already in filters, that's mean user click for removing the filters
            if(filters.brand.includes(brand)) {
                return {
                    ...prevFilters,
                    brand: prevFilters.brand.filter(item => item !== brand)
                }
            } else {
                //If the brand is not in filters, that's mean user click for adding the filters
                return {
                    ...prevFilters,
                    brand: [...prevFilters.brand, brand]
                }
            }
        })
    }
    const handleRatingFilters = (rating, isChecked) => {
        // console.log(isChecked);
        setFilters((prevFilters) => {
            if(filters.rating.includes(rating)) {
                return {
                    ...prevFilters,
                    rating: prevFilters.rating.filter(item => item !== rating)
                }
            } else {
                return {
                    ...prevFilters,
                    rating: [...prevFilters.rating, rating]
                }
            }
        })
    }

    if (!products) {
        return <div>Loading...</div>
    }
    const filterProducts = products.filter(product => {
        return filters.brand.length === 0 || filters.brand.includes(product.brand)
        // filters.rating.length === 0 || filters.rating.includes()
        ;
    })
    const renderList = filterProducts.map((product) => {
        let { id, title, images, rating, description, price, discountPercentage, stock } = product;
        let MRP = price / (1 - (discountPercentage / 100));
        let MRPInt = Math.round(MRP);
        return (
            <Link to={`/products/${id}`}
                key={id}
                className={`product-menu ${isCategory || isBrand || isRating || isPrice ? 'product-menu-inactive' : ''}`}
                onClick={(e) => disableLink(e)}
            >
                <div className="product-img">
                    <img src={images[0]} alt="product-img"></img>
                    <i><FaRegHeart /></i>
                </div>
                <div className="product-details">
                    <div className="product-description">
                        <h2>{title}</h2>
                        <p><span className="rating">{rating}★</span> <span>80 Rating & 10 Reviews</span></p>
                        <p className="description">{description}</p>
                    </div>
                    <div className="product-buy">
                        <p>₹ {price}</p>
                        <small><span>₹ {MRPInt}</span> {discountPercentage}% off </small>
                        <small className="stock">only {stock} left</small>
                        <button>Buy Now</button>
                    </div>
                </div>
            </Link>
        );
    })

    const uniqeBrands = [];
    products.forEach(product => {
        if(!uniqeBrands.includes(product.brand)) {
            uniqeBrands.push(product.brand);
        }
    });
    
    return (
        <div className="product-category-container">
            <div>
                <div className="filter-container" ref={filterContainerRef}>
                    <div className="filter">
                        <p>Filters</p>
                        <p>Clear All</p>
                    </div>
                    <div className="category">
                        <p onClick={() => handleCategory()}>CATEGORY</p>
                        {isCategory &&
                            <div className="inner-div">
                                <p>CATEGORY</p>
                                <ul>
                                    <li>{particularCategory}</li>
                                </ul>
                            </div>
                        }
                    </div>
                    <div className="brand">
                        <p onClick={() => handleBrand()}>BRAND</p>
                        {isBrand &&
                            <div className="inner-div">
                                <p>BRAND</p>
                                <ul>
                                    {
                                        uniqeBrands.map(brand => {
                                            return (
                                                <li key={brand}>
                                                    <span>
                                                        <input 
                                                            type="checkbox"
                                                            checked={filters.brand.includes(brand)}
                                                            onChange={(e) => handleBrandFilters(brand, e.target.checked)}
                                                        />
                                                        <menu>{brand}</menu>
                                                    </span>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                                <hr></hr>
                                <div className="filter-sm">
                                    <p>Clear Filtes</p>
                                    <p>Show Results</p>
                                </div>
                                <hr></hr>
                            </div>
                        }
                    </div>
                    <div className="rating">
                        <p onClick={() => handleRating()}>RATING</p>
                        {isRating &&
                            <div className="inner-div">
                                <p>RATING</p>
                                <ul>
                                    <li>
                                        <span>
                                            <input 
                                                type="checkbox"
                                                checked={filters.rating.includes(4)}
                                                onChange={(e) => handleRatingFilters(4, e.target.checked)}
                                            />
                                            <menu>4★ & above</menu>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <input 
                                                type="checkbox"
                                                checked={filters.rating.includes(4.5)}
                                                onChange={(e) => handleRatingFilters(4.5, e.target.checked)}
                                            />
                                            <menu>4.5★ & above</menu>
                                        </span>
                                    </li>
                                </ul>
                                <hr></hr>
                                <div className="filter-sm">
                                    <p>Clear Filtes</p>
                                    <p>Show Results</p>
                                </div>
                                <hr></hr>
                            </div>
                        }
                    </div>
                    <div className="price">
                        <p onClick={() => handlePrice()}>PRICE</p>
                        {isPrice &&
                            <div className="inner-div">
                                <p>PRICE</p>
                                <ul>
                                    <li>
                                        <span>
                                            <input 
                                                type="checkbox"
                                                // checked={filte}
                                            /> 
                                            <menu>500 & bellow</menu>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <input 
                                                type="checkbox"
                                                // checked={filte}
                                            />
                                            <menu>1000 & bellow</menu>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <input 
                                                type="checkbox"
                                                // checked={filte}
                                            />
                                            <menu>1500 & bellow</menu>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <input 
                                                type="checkbox"
                                                    // checked={filte}
                                            />
                                            <menu>1500 & above</menu>
                                        </span>
                                    </li>
                                </ul>
                                <hr></hr>
                                <div className="filter-sm">
                                    <p>Clear Filtes</p>
                                    <p>Show Results</p>
                                </div>
                                <hr></hr>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="product-container">
                {renderList}
            </div>
        </div>
    );
}

export default ProductsOfCategory;
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
        // const handleClickOutside = (event) => {
        //     if (filterContainerRef.current && !filterContainerRef.current.contains(event.target)) {
        //         if (window.innerWidth > 767) {
        //             setCategory(true);
        //             setBrand(true);
        //             setRating(true);
        //             setPrice(true);
        //         } else {
        //             setCategory(false);
        //             setBrand(false);
        //             setRating(false);
        //             setPrice(false);
        //         }
        //     }
        // };
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

        // document.addEventListener("click", handleClickOutside);
        document.addEventListener("scroll", handleScroll);

        return () => {
            // document.removeEventListener("click", handleClickOutside);
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

    const handleFilterContainer = () => {
        if(window.innerWidth <= 767) {
            if(isCategory) {
                setCategory(false);
            } else if(isBrand) {
                setBrand(false);
            } else if(isRating) {
                setRating(false);
            } else if(isPrice) {
                setPrice(false);
            }
        }
    }

    const disableLink = (e) => {
        if ((isCategory || isBrand || isRating || isPrice) && window.innerWidth <= 767) {
            e.preventDefault();
        }
    }


    //Apply filter
    const [filters, setFilters] = useState({
        brand: [],
        rating: [],
        price: []
    })
    const handleBrandFilters = (brand) => {
        setFilters(prevFilters => {
            //If the brand is already in filters, that's mean user click for removing the filters
            if(prevFilters.brand.includes(brand)) {
                return {
                    ...prevFilters,
                    brand: prevFilters.brand.filter(brandName => brandName !== brand)
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
    const handleRatingFilters = (rating) => {
        setFilters((prevFilters) => {
            if(prevFilters.rating.includes(rating)) {
                return {
                    ...prevFilters,
                    rating: prevFilters.rating.filter(ratingValue => ratingValue !== rating)
                }
            } else {
                return {
                    ...prevFilters,
                    rating: [...prevFilters.rating, rating]
                }
            }
        })
        
    }
    const handlePriceFiltes = (price) => {
        setFilters((prevFilters) => {
            if(prevFilters.price.includes(price)) {
                return {
                    ...prevFilters,
                    price: prevFilters.price.filter(priceValue => priceValue !== price)
                }
            } else {
                return {
                    ...prevFilters,
                    price: [...prevFilters.price, price]
                }
            }
        })
        
    }

    //Clear All button visible or not for large screen
    const [isFilter, setFilter] = useState(false);
    useEffect(() => {
        if(filters.brand.length !== 0 || filters.rating.length !== 0 || filters.price.length !== 0) {
            setFilter(true);
        } else {
            setFilter(false);
        }
    }, [filters])
    const handaleClearFilters = () => {
        //Clear all filter for large screen
        setFilters(() => {
            return {
                brand: [],
                rating: [],
                price: []
            };
        })
        //After removing all filters remove the clear all button
        setFilter(false);
    }


    //Clear Filter button visible or not for small screen in brand section
    const [isBrandFilter, setBrandFilter] = useState(false);
    //Clear Filter button visible or not for small screen in rating section
    const [isRatingFilter, setRatingFilter] = useState(false);
    //Clear Filter button visible or not for small screen in price section
    const [isPriceFilter, setPriceFilter] = useState(false);
    useEffect(() => {
        if(filters.brand.length !== 0) {
            setBrandFilter(true);
        } else {
            setBrandFilter(false);
        }
        if(filters.rating.length !== 0) {
            setRatingFilter(true);
        } else {
            setRatingFilter(false);
        }
        if(filters.price.length !== 0) {
            setPriceFilter(true);
        } else {
            setPriceFilter(false);
        }
    }, [filters])
    const clearBrandFilter = () => {
        //clear brand filter for small screen
        setFilters((prevFilters) => {
            return {
                ...prevFilters,
                brand: []
            }
        });
        //remove clear filter button
        setBrandFilter(false)
    }
    const clearRatingFilter = () => {
        setFilters((prevFilters) => {
            return {
                ...prevFilters,
                rating: []
            }
        })
        setRatingFilter(false);
    }
    const clearPriceFilter = () => {
        setFilters((prevFilters) => {
            return {
                ...prevFilters,
                price: []
            }
        })
        setPriceFilter(false);
    }



    if (!products) {
        return <div>Loading...</div>
    }
    const filterProducts = products.filter(product => {
        //If product brand is selected in filter or no brand is selected
        const brandFilterPass = filters.brand.length === 0 || filters.brand.includes(product.brand);

        //If product rating is selected in filter or no rating is selected
        const validateRating =  filters.rating.some(pRating => {
            return product.rating >= pRating;
        })
        const ratingFilterPass = filters.rating.length === 0 || validateRating;

        //If product price is selected in filter or no price is selected
        // const validatePrice = filters.price.includes(499) ? 
        // (product.price >= 0 && product.price <= 500) : 
        // filters.price.some(pPrice => product.price >= pPrice);
        //or------>
        const validatePrice = filters.price.some(pPrice => {
            if(pPrice === 499) {
                if(product.price >= 0 && product.price <= 500) {
                    return true;
                }
            } 
            else {
                return product.price >= pPrice;
            }
            return false;
        })
        const priceFilterPass = filters.price.length === 0 || validatePrice;

        return brandFilterPass && ratingFilterPass && priceFilterPass;
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
                        <p className="heading">Filtes</p>
                        { isFilter && 
                            <p 
                                className="clear-all"
                                onClick={() => handaleClearFilters()}
                            >   
                                Clear All
                            </p> 
                        }
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
                        <p
                            onClick={() => handleBrand()}
                            className={`${filters.brand.length !== 0 ? "brand-sm-change" : ""}`}
                        >BRAND</p>
                        {isBrand &&
                            <div className="inner-div">
                                <p>BRAND</p>
                                <ul>
                                    {
                                        uniqeBrands.map(brand => {
                                            return (
                                                <li key={brand}>
                                                    <span onClick={(e) => handleBrandFilters(brand)}>
                                                        <input 
                                                            type="checkbox"
                                                            checked={filters.brand.includes(brand)}
                                                            onChange={() => {}}
                                                        />
                                                        <menu>{brand}</menu>
                                                    </span>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                                <hr></hr>
                                <div className={`filter-sm ${!isBrandFilter ? "filter-sm-row-reverse" : ""}`}>
                                    { isBrandFilter &&
                                        <p onClick={() => clearBrandFilter()}>Clear Filtes</p>
                                    }
                                    <p onClick={() => handleFilterContainer()}>Show Results</p>
                                </div>
                                <hr></hr>
                            </div>
                        }
                    </div>
                    <div className="rating">
                        <p 
                            onClick={() => handleRating()}
                            className={`${filters.rating.length !== 0 ? "brand-sm-change" : ""}`}
                        >RATING</p>
                        {isRating &&
                            <div className="inner-div">
                                <p>RATING</p>
                                <ul>
                                    <li>
                                        <span onClick={() => handleRatingFilters(4)}>
                                            <input 
                                                type="checkbox"
                                                checked={filters.rating.includes(4)}
                                                onChange={() => {}}
                                            />
                                            <menu>4★ & above</menu>
                                        </span>
                                    </li>
                                    <li>
                                        <span onClick={() => handleRatingFilters(4.5)}>
                                            <input 
                                                type="checkbox"
                                                checked={filters.rating.includes(4.5)}
                                                onChange={() => {}}
                                            />
                                            <menu>4.5★ & above</menu>
                                        </span>
                                    </li>
                                </ul>
                                <hr></hr>
                                <div className={`filter-sm ${!isRatingFilter ? "filter-sm-row-reverse" : ""}`}>
                                    { isRatingFilter &&
                                        <p onClick={() => clearRatingFilter()}>Clear Filtes</p>
                                    }
                                    <p onClick={() => handleFilterContainer()}>Show Results</p>
                                </div>
                                <hr></hr>
                            </div>
                        }
                    </div>
                    <div className="price">
                        <p 
                            onClick={() => handlePrice()}
                            className={`${filters.price.length !== 0 ? "brand-sm-change" : ""}`}
                        >PRICE</p>
                        {isPrice &&
                            <div className="inner-div">
                                <p>PRICE</p>
                                <ul>
                                    <li>
                                        <span onClick={() => handlePriceFiltes(499)}>
                                            <input 
                                                type="checkbox"
                                                checked={filters.price.includes(499)}
                                                onChange={() => {}}
                                            /> 
                                            <menu>0 - 500</menu>
                                        </span>
                                    </li>
                                    <li>
                                        <span onClick={() => handlePriceFiltes(500)}>
                                            <input 
                                                type="checkbox"
                                                checked={filters.price.includes(500)}
                                                onChange={() => {}}
                                            />
                                            <menu>500 & above</menu>
                                        </span>
                                    </li>
                                    <li>
                                        <span onClick={() => handlePriceFiltes(1000)}>
                                            <input 
                                                type="checkbox"
                                                checked={filters.price.includes(1000)}
                                                onChange={() => {}}
                                            />
                                            <menu>1000 & above</menu>
                                        </span>
                                    </li>
                                    <li>
                                        <span onClick={() => handlePriceFiltes(1500)}>
                                            <input 
                                                type="checkbox"
                                                checked={filters.price.includes(1500)}
                                                onChange={() => {}}
                                            />
                                            <menu>1500 & above</menu>
                                        </span>
                                    </li>
                                </ul>
                                <hr></hr>
                                <div className={`filter-sm ${!isPriceFilter ? "filter-sm-row-reverse" : ""}`}>
                                    { isPriceFilter && 
                                        <p onClick={() => clearPriceFilter()}>Clear Filtes</p>
                                    }
                                    <p onClick={() => handleFilterContainer()}>Show Results</p>
                                </div>
                                <hr></hr>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="product-container" onClick={() => handleFilterContainer()}>
                {renderList}
            </div>
        </div>
    );
}

export default ProductsOfCategory;
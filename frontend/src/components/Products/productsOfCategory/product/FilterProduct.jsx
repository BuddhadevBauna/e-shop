import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FilterProduct = (props) => {
    const { filters, isCategoryContainerActive, setCategoryContainerActive, isBrandContainerActive,
        setBrandContainerActive, isRatingContainerActive, setRatingContainerActive, isPriceContainerActive,
        setPriceContainerActive, selectedCategory
    } = props;

    const products = useSelector((state) => state.categoryProducts.products);

    //for search logic
    const searchProducts = useSelector(state => state.categoryProducts.searchProducts);
    // console.log(searchProducts);
    // console.log(selectedCategory);


    //for (small screen)---->
    const handleFilterContainer = () => {
        if (window.innerWidth <= 767) {
            if (isCategoryContainerActive) {
                setCategoryContainerActive(false);
            } else if (isBrandContainerActive) {
                setBrandContainerActive(false);
            } else if (isRatingContainerActive) {
                setRatingContainerActive(false);
            } else if (isPriceContainerActive) {
                setPriceContainerActive(false);
            }
        }
    };

    const disableLink = (e) => {
        if ((isCategoryContainerActive || isBrandContainerActive || isRatingContainerActive
            || isPriceContainerActive) && window.innerWidth <= 767) {
            e.preventDefault();
        }
    };


    let [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        if (products && products.length > 0) {
            setProductList(products);
            setLoading(false);
        } else if (searchProducts && searchProducts.length > 0) {
            //This for search logic
            if (!selectedCategory) {
                setProductList(searchProducts[0]);
            } else {
                const foundProductArray = searchProducts.find(productArray => {
                    return productArray[0].category === selectedCategory;
                });
                setProductList(foundProductArray);
            }
            setLoading(false);
        }
    }, [products, searchProducts, selectedCategory])

    let [filterProducts, setFilterProducts] = useState([]);
    useEffect(() => {
        if (productList.length > 0) {
            const filteredProducts = productList.filter((product) => {
                //If product brand is selected in filter or no brand is selected
                const brandFilterPass = filters.brand.length === 0 || filters.brand.includes(product.brand);

                //If product rating is selected in filter or no rating is selected
                const validateRating = filters.rating.some((pRating) => {
                    return product.rating >= pRating;
                });
                const ratingFilterPass = filters.rating.length === 0 || validateRating;

                //If product price is selected in filter or no price is selected
                //const validatePrice = filters.price.includes(499) ?
                //(product.price >= 0 && product.price <= 500) :
                //filters.price.some(pPrice => product.price >= pPrice);
                //or------>
                const validatePrice = filters.price.some((pPrice) => {
                    if (pPrice === 499) {
                        if (product.price >= 0 && product.price <= 500) {
                            return true;
                        }
                    } else {
                        return product.price >= pPrice;
                    }
                    return false;
                });
                const priceFilterPass = filters.price.length === 0 || validatePrice;

                return brandFilterPass && ratingFilterPass && priceFilterPass;
            });
            setFilterProducts(filteredProducts);
        }
    }, [productList, filters])
    // console.log(filterProducts);

    let renderList;
    if (loading || !filterProducts) {
        // Display loading message while fetching products
        renderList = (
            <div>Loading...</div>
        );
    } else if (filterProducts.length === 0) {
        renderList = (
            <div className="product-menu default-msg-container">
                <h1 className="default-msg">No Product Found</h1>
            </div>
        );
    } else {
        renderList = filterProducts.map((product) => {
            let { id, title, images, rating, description, price, discountPercentage, stock } = product;
            let MRP = price / (1 - discountPercentage / 100);
            let MRPInt = Math.round(MRP);
            return (
                <Link
                    to={`/products/${id}`}
                    key={id}
                    className={`product-menu ${isCategoryContainerActive || isBrandContainerActive ||
                        isRatingContainerActive || isPriceContainerActive ? "product-menu-inactive" : ""}`}
                    onClick={(e) => disableLink(e)}
                >
                    <div className="product-img">
                        <img src={images[0]} alt="product-img"></img>
                    </div>
                    <div className="product-details">
                        <div className="icon">
                            <i>
                                <FaRegHeart />
                            </i>
                        </div>
                        <div className="product-details-container">
                            <div className="product-description">
                                <h2>{window.innerWidth < 767 ? `${title.slice(0, 18)}...` : title}</h2>
                                <p>
                                    <span className="rating">{rating}★</span>{" "}
                                    <span>80 Rating & 10 Reviews</span>
                                </p>
                                <p className="description">
                                    {window.innerWidth < 767 ? `${description.slice(0, 25)}...` : description}
                                </p>
                            </div>
                            <div className="product-buy">
                                <p>₹ {price}</p>
                                <small>
                                    <span>₹ {MRPInt}</span> {discountPercentage}% off{" "}
                                </small>
                                <small className="stock">only {stock} left</small>
                                <button>Buy Now</button>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        });
    }

    return (
        <div className={`container-product`} onClick={() => handleFilterContainer()}>
            {renderList}
        </div>
    );
}

export default FilterProduct;
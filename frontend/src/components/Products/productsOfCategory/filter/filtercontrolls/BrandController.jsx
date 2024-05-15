import React from "react";
import { useSelector } from "react-redux";
import ClearBrand from "./clearFiltes/smallScreen/ClearBrand";

const BrandController = (props) => {
    const { brandFilter, setBrandFilter, setCategoryContainerActive, isBrandContainerActive,
        setBrandContainerActive, setRatingContainerActive, setPriceContainerActive, filters, setFilters,
        selectedCategory
    } = props;

    const products = useSelector((state) => state.categoryProducts.products);
    // console.log(products);
    const searchProducts = useSelector(state => state.categoryProducts.searchProducts);
    // console.log(searchProducts);

    //This for (all screen)---->
    const handleBrandFilters = (brand) => {
        setBrandFilter((prevFilters) => {
            if (prevFilters.includes(brand)) {
                //If the brand is already in filters, that's mean user click for removing the filters
                return prevFilters.filter((brandName) => brandName !== brand);
            } else {
                //If the brand is not in filters, that's mean user click for adding the filters
                return [...prevFilters, brand];
            }
        });
    };

    //This for (small screen)---->
    const handleBrand = () => {
        if (window.innerWidth <= 767) {
            setBrandContainerActive(!isBrandContainerActive);
            // Another filter deContaineractive
            setCategoryContainerActive(false);
            setRatingContainerActive(false);
            setPriceContainerActive(false);
        }
    };


    //This for (all screen)---->
    let uniqeBrands = [];
    if (products) {
        products.forEach((product) => {
            if (!uniqeBrands.includes(product.brand)) {
                uniqeBrands.push(product.brand);
            }
        });
    } else if (searchProducts) {
        if(!selectedCategory) {
            searchProducts[0].forEach(product => {
                if(!uniqeBrands.includes(product.brand)) {
                    uniqeBrands.push(product.brand);
                }
            })
        } else {
            searchProducts.some(productArray => {
                if(productArray[0].category === selectedCategory) {
                    productArray.forEach(product => {
                        if(!uniqeBrands.includes(product.brand)) {
                            uniqeBrands.push(product.brand);
                        }
                    })
                    
                    // Terminate the outer loop
                    return true;
                }
                return false;
            })
        }
    }

    return (
        <div className="brand">
            <p
                onClick={() => handleBrand()}
                className={`${filters.brand.length !== 0 ? "brand-sm-change" : ""}`}
            >
                BRAND
            </p>
            {isBrandContainerActive && (
                <div className="inner-div">
                    <p>BRAND</p>
                    <ul>
                        {uniqeBrands.map((brand) => {
                            return (
                                <li key={brand}>
                                    <span onClick={(e) => handleBrandFilters(brand)}>
                                        <input
                                            type="checkbox"
                                            checked={brandFilter.includes(brand)}
                                            onChange={() => { }}
                                        />
                                        <menu>{brand}</menu>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <hr></hr>
                    <ClearBrand
                        isBrandContainerActive={isBrandContainerActive}
                        setBrandContainerActive={setBrandContainerActive}
                        filters={filters}
                        setFilters={setFilters}
                        setBrandFilter={setBrandFilter}
                    />
                    <hr></hr>
                </div>
            )}
        </div>
    );
};

export default BrandController;

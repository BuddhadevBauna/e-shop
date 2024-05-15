import React, { useEffect, useState } from "react";
import FilterSidebar from "./filter/FilterSidebar";
import FilterProduct from "./product/FilterProduct";

const ProductsOfCategory = (props) => {
    const {filters, setFilters, brandFilter, setBrandFilter, ratingFilter, setRatingFilter,
        priceFilter, setPriceFilter, isCategoryContainerActive, setCategoryContainerActive, 
        isBrandContainerActive, setBrandContainerActive, isRatingContainerActive, setRatingContainerActive,
        isPriceContainerActive, setPriceContainerActive, searchCategories
    } = props;

    const [selectedCategory, setSelectedCategory] = useState("");
    // console.log(selectedCategory);


    useEffect(() => {
        const handaleResize = () => {
            if (window.innerWidth > 767) {
                setCategoryContainerActive(true);
                setBrandContainerActive(true);
                setRatingContainerActive(true);
                setPriceContainerActive(true);
            } else {
                setCategoryContainerActive(false);
                setBrandContainerActive(false);
                setRatingContainerActive(false);
                setPriceContainerActive(false);
            }
        };
        //Call handaleResize initially
        handaleResize();
        //add Event Listner for window resize
        window.addEventListener("resize", handaleResize);
        //CleanUp
        return () => {
            window.addEventListener("resize", handaleResize);
        };
    }, [setCategoryContainerActive, setBrandContainerActive, setRatingContainerActive, setPriceContainerActive]);
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 767) {
                setCategoryContainerActive(true);
                setBrandContainerActive(true);
                setRatingContainerActive(true);
                setPriceContainerActive(true);
            } else {
                setCategoryContainerActive(false);
                setBrandContainerActive(false);
                setRatingContainerActive(false);
                setPriceContainerActive(false);
            }
        };
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [setCategoryContainerActive, setBrandContainerActive, setRatingContainerActive, setPriceContainerActive]);

    return (
        <div className="product-category-container">
            <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                brandFilter={brandFilter}
                setBrandFilter={setBrandFilter}
                ratingFilter={ratingFilter}
                setRatingFilter={setRatingFilter}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                isCategoryContainerActive={isCategoryContainerActive}
                setCategoryContainerActive={setCategoryContainerActive}
                isBrandContainerActive={isBrandContainerActive}
                setBrandContainerActive={setBrandContainerActive}
                isRatingContainerActive={isRatingContainerActive}
                setRatingContainerActive={setRatingContainerActive}
                isPriceContainerActive={isPriceContainerActive}
                setPriceContainerActive={setPriceContainerActive}
                //for search logic
                searchCategories={searchCategories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <FilterProduct 
                filters={filters} 
                isCategoryContainerActive={isCategoryContainerActive}
                setCategoryContainerActive={setCategoryContainerActive}
                isBrandContainerActive={isBrandContainerActive}
                setBrandContainerActive={setBrandContainerActive}
                isRatingContainerActive={isRatingContainerActive}
                setRatingContainerActive={setRatingContainerActive}
                isPriceContainerActive={isPriceContainerActive}
                setPriceContainerActive={setPriceContainerActive}
                //for search logic
                selectedCategory={selectedCategory}
            />
        </div>
    );
};

export default ProductsOfCategory;
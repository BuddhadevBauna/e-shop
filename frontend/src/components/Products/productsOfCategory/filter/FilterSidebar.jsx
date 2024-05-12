import React, { useEffect } from "react";
import CategoryController from "./filtercontrolls/CategoryController";
import BrandController from "./filtercontrolls/BrandController";
import RatingController from "./filtercontrolls/RatingController";
import PriceController from "./filtercontrolls/PriceController";
import ClearFilters from "./filtercontrolls/clearFiltes/largeScreen/ClearFilters";
import { useSelector } from "react-redux";

const FilterSidebar = (props) => {
    const {
        filters,
        setFilters,
        brandFilter,
        setBrandFilter,
        ratingFilter,
        setRatingFilter,
        priceFilter,
        setPriceFilter,
        isCategoryContainerActive,
        setCategoryContainerActive,
        isBrandContainerActive,
        setBrandContainerActive,
        isRatingContainerActive,
        setRatingContainerActive,
        isPriceContainerActive,
        setPriceContainerActive,
    } = props;

    useEffect(() => {
        setFilters((prevValue) => {
            return {
                ...prevValue,
                brand: brandFilter,
                rating: ratingFilter,
                price: priceFilter,
            };
        });
    }, [brandFilter, ratingFilter, priceFilter, setFilters]);

    return (
        <div>
            <div className="filter-container">
                <>
                    <ClearFilters
                        //This for (large screen)--->
                        filters={filters}
                        setFilters={setFilters}
                        setBrandFilter={setBrandFilter}
                        setRatingFilter={setRatingFilter}
                        setPriceFilter={setPriceFilter}
                    />
                </>
                <>
                    <CategoryController
                        //This for (small screen)---->
                        isCategoryContainerActive={isCategoryContainerActive}
                        setCategoryContainerActive={setCategoryContainerActive}
                        setBrandContainerActive={setBrandContainerActive}
                        setRatingContainerActive={setRatingContainerActive}
                        setPriceContainerActive={setPriceContainerActive}
                    />
                </>
                <>
                    <BrandController
                        //This for (all screen)----->
                        brandFilter={brandFilter}
                        setBrandFilter={setBrandFilter}
                        //This for (small screen)---->
                        setCategoryContainerActive={setCategoryContainerActive}
                        isBrandContainerActive={isBrandContainerActive}
                        setBrandContainerActive={setBrandContainerActive}
                        setRatingContainerActive={setRatingContainerActive}
                        setPriceContainerActive={setPriceContainerActive}
                        filters={filters}
                        setFilters={setFilters}
                    />
                </>
                <>
                    <RatingController
                        //This for (all screen)----->
                        ratingFilter={ratingFilter}
                        setRatingFilter={setRatingFilter}
                        //This for (small screen)---->
                        setCategoryContainerActive={setCategoryContainerActive}
                        setBrandContainerActive={setBrandContainerActive}
                        isRatingContainerActive={isRatingContainerActive}
                        setRatingContainerActive={setRatingContainerActive}
                        setPriceContainerActive={setPriceContainerActive}
                        filters={filters}
                        setFilters={setFilters}
                    />
                </>
                <>
                    <PriceController
                        //This for (all screen)----->
                        priceFilter={priceFilter}
                        setPriceFilter={setPriceFilter}
                        //This for (small screen)---->
                        setCategoryContainerActive={setCategoryContainerActive}
                        setBrandContainerActive={setBrandContainerActive}
                        setRatingContainerActive={setRatingContainerActive}
                        isPriceContainerActive={isPriceContainerActive}
                        setPriceContainerActive={setPriceContainerActive}
                        filters={filters}
                        setFilters={setFilters}
                    />
                </>
            </div>
        </div>
    );
};

export default FilterSidebar;
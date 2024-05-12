import React, { useEffect, useState } from "react";

//Clear Filter for (large screen)--->
const ClearFilters = (props) => {
    const { filters, setFilters, setBrandFilter, setRatingFilter, setPriceFilter } = props;

    //Clear All button visible or not for (large screen)---->
    const [isFilterActive, setFilterActive] = useState(false);
    useEffect(() => {
        if (filters.brand.length !== 0 || filters.rating.length !== 0 || filters.price.length !== 0) {
            setFilterActive(true);
        } else {
            setFilterActive(false);
        }
    }, [filters]);
    const handaleClearFilters = () => {
        //Clear all filter for (large screen)---->
        setBrandFilter([]);
        setRatingFilter([]);
        setPriceFilter([]);
        setFilters(() => {
            return {
                brand: [],
                rating: [],
                price: [],
            };
        });
        //After removing all filters hide the clear all button (large screen)---->
        setFilterActive(false);
    };

    return (
        <div className="filter">
            <p className="heading">Filtes</p>
            {isFilterActive && (
                <p className="clear-all" onClick={() => handaleClearFilters()}>
                    Clear All
                </p>
            )}
        </div>
    );
}

export default ClearFilters;
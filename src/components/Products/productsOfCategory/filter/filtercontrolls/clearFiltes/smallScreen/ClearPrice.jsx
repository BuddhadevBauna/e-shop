import React, { useEffect, useState } from "react";


const ClearPrice = (props) => {
    const {isPriceContainerActive, setPriceContainerActive, filters, setFilters, setPriceFilter} = props;
    
    const handlePriceContainer = () => {
        if (window.innerWidth <= 767) {
            if (isPriceContainerActive) {
                setPriceContainerActive(false);
            }
        }
    };
    //Clear Filter button visible or not for small screen in price section
    const [isPriceFilterActive, setPriceFilterActive] = useState(false);
    useEffect(() => {
        if (filters.price.length !== 0) {
            setPriceFilterActive(true);
        } else {
            setPriceFilterActive(false);
        }
    }, [filters]);
    const clearPriceFilter = () => {
        //clear brand filter for small screen
        setPriceFilter([]);
        setFilters((prevFilters) => {
            return {
                ...prevFilters,
                price: [],
            };
        });
        //hide clear filter button
        setPriceFilterActive(false);
    };

    return (
        <div className={`filter-sm ${!isPriceFilterActive ? "filter-sm-row-reverse" : ""}`}>
            {isPriceFilterActive && (
                <p onClick={() => clearPriceFilter()}>
                    Clear Filtes
                </p>
            )}
            <p onClick={() => handlePriceContainer()}>
                Show Results
            </p>
        </div>
    );
}

export default ClearPrice;
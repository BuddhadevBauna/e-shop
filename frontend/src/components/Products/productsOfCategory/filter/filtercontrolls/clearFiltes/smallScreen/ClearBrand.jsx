import React, { useEffect, useState } from "react";


const ClearBrand = (props) => {
    const {isBrandContainerActive, setBrandContainerActive, filters, setFilters, setBrandFilter} = props;
    
    const handleBrandContainer = () => {
        if (window.innerWidth <= 767) {
            if (isBrandContainerActive) {
                setBrandContainerActive(false);
            }
        }
    };

    //Clear Filter button visible or not for small screen in brand section
    const [isBrandFilterActive, setBrandFilterActive] = useState(false);
    useEffect(() => {
        if (filters.brand.length !== 0) {
            setBrandFilterActive(true);
        } else {
            setBrandFilterActive(false);
        }
    }, [filters]);
    const clearBrandFilter = () => {
        //clear brand filter for small screen
        setBrandFilter([]);
        setFilters((prevFilters) => {
            return {
                ...prevFilters,
                brand: [],
            };
        });
        //hide clear filter button
        setBrandFilterActive(false);
    };
    return (
        <div className={`filter-sm ${!isBrandFilterActive ? "filter-sm-row-reverse" : ""}`}>
            {isBrandFilterActive && (
                <p onClick={() => clearBrandFilter()}>
                    Clear Filtes
                </p>
            )}
            <p onClick={() => handleBrandContainer()}>
                Show Results
            </p>
        </div>
    );
}

export default ClearBrand;
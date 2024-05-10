import React, { useEffect, useState } from "react";


const ClearRating = (props) => {
    const {isRatingContainerActive, setRatingContainerActive, filters, setFilters, setRatingFilter} = props;
    
    const handleRatingContainer = () => {
        if (window.innerWidth <= 767) {
            if (isRatingContainerActive) {
                setRatingContainerActive(false);
            }
        }
    };
    //Clear Filter button visible or not for small screen in rating section
    const [isRatingFilterActive, setRatingFilterActive] = useState(false);
    useEffect(() => {
        if (filters.rating.length !== 0) {
            setRatingFilterActive(true);
        } else {
            setRatingFilterActive(false);
        }
    }, [filters]);
    const clearRatingFilter = () => {
        //clear rating filter for small screen
        setRatingFilter([]);
        setFilters((prevFilters) => {
            return {
                ...prevFilters,
                rating: [],
            };
        });
        //hide clear filter button
        setRatingFilterActive(false);
    };
    return (
        <div
            className={`filter-sm ${!isRatingFilterActive ? "filter-sm-row-reverse" : ""}`}>
            {isRatingFilterActive && (
                <p onClick={() => clearRatingFilter()}>
                    Clear Filtes
                </p>
            )}
            <p onClick={() => handleRatingContainer()}>
                Show Results
            </p>
        </div>
    );
}

export default ClearRating;
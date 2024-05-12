import React from "react";
import ClearRating from "./clearFiltes/smallScreen/ClearRating";

const RatingController = (props) => {
    const { ratingFilter, setRatingFilter, setCategoryContainerActive, setBrandContainerActive, 
        isRatingContainerActive, setRatingContainerActive, setPriceContainerActive, filters, setFilters 
    } = props;

    //for (all screen)---->
    const handleRatingFilters = (rating) => {
        setRatingFilter((prevFilters) => {
            if (prevFilters.includes(rating)) {
                //If the rating is already in filters, that's mean user click for removing the filters
                return prevFilters.filter((ratingValue) => ratingValue !== rating);
            } else {
                //If the rating is not in filters, that's mean user click for adding the filters
                return [...prevFilters, rating];
            }
        });
    };

    //for (small screen)---->
    const handleRating = () => {
        if (window.innerWidth <= 767) {
            setRatingContainerActive(!isRatingContainerActive);
            // Another filter deContaineractive
            setCategoryContainerActive(false);
            setBrandContainerActive(false);
            setPriceContainerActive(false);
        }
    };


    return (
        <div className="rating">
            <p
                onClick={() => handleRating()}
                className={`${filters.rating.length !== 0 ? "brand-sm-change" : ""}`}
            >
                RATING
            </p>
            {isRatingContainerActive && (
                <div className="inner-div">
                    <p>RATING</p>
                    <ul>
                        <li>
                            <span onClick={() => handleRatingFilters(4)}>
                                <input
                                    type="checkbox"
                                    checked={ratingFilter.includes(4)}
                                    onChange={() => { }}
                                />
                                <menu>4★ & above</menu>
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleRatingFilters(4.5)}>
                                <input
                                    type="checkbox"
                                    checked={ratingFilter.includes(4.5)}
                                    onChange={() => { }}
                                />
                                <menu>4.5★ & above</menu>
                            </span>
                        </li>
                    </ul>
                    <hr></hr>
                    <ClearRating 
                        isRatingContainerActive={isRatingContainerActive}
                        setRatingContainerActive={setRatingContainerActive}
                        filters={filters}
                        setFilters={setFilters}
                        setRatingFilter={setRatingFilter}
                    />
                    <hr></hr>
                </div>
            )}
        </div>
    );
};

export default RatingController;

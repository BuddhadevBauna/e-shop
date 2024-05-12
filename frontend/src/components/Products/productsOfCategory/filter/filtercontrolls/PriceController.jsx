import React from "react";
import ClearPrice from "./clearFiltes/smallScreen/ClearPrice";

const PriceController = (props) => {
    const { priceFilter, setPriceFilter, setCategoryContainerActive, setBrandContainerActive,
        setRatingContainerActive, isPriceContainerActive, setPriceContainerActive, filters, setFilters 
    } = props;

    //This for (all screen)---->
    const handlePriceFiltes = (price) => {
        setPriceFilter((prevFilters) => {
            if (prevFilters.includes(price)) {
                //If the price is already in filters, that's mean user click for removing the filters
                return prevFilters.filter((priceValue) => priceValue !== price);
            } else {
                //If the price is not in filters, that's mean user click for adding the filters
                return [...prevFilters, price];
            }
        });
    };

    //This for (small screen)---->
    const handlePrice = () => {
        if (window.innerWidth <= 767) {
            setPriceContainerActive(!isPriceContainerActive);
            // Another filter deContaineractive
            setCategoryContainerActive(false);
            setBrandContainerActive(false);
            setRatingContainerActive(false);
        }
    };


    return (
        <div className="price">
            <p
                onClick={() => handlePrice()}
                className={`${filters.price.length !== 0 ? "brand-sm-change" : ""}`}
            >
                PRICE
            </p>
            {isPriceContainerActive && (
                <div className="inner-div">
                    <p>PRICE</p>
                    <ul>
                        <li>
                            <span onClick={() => handlePriceFiltes(499)}>
                                <input
                                    type="checkbox"
                                    checked={priceFilter.includes(499)}
                                    onChange={() => { }}
                                />
                                <menu>0 - 500</menu>
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handlePriceFiltes(500)}>
                                <input
                                    type="checkbox"
                                    checked={priceFilter.includes(500)}
                                    onChange={() => { }}
                                />
                                <menu>500 & above</menu>
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handlePriceFiltes(1000)}>
                                <input
                                    type="checkbox"
                                    checked={priceFilter.includes(1000)}
                                    onChange={() => { }}
                                />
                                <menu>1000 & above</menu>
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handlePriceFiltes(1500)}>
                                <input
                                    type="checkbox"
                                    checked={priceFilter.includes(1500)}
                                    onChange={() => { }}
                                />
                                <menu>1500 & above</menu>
                            </span>
                        </li>
                    </ul>
                    <hr></hr>
                    <ClearPrice
                        isPriceContainerActive={isPriceContainerActive}
                        setPriceContainerActive={setPriceContainerActive}
                        filters={filters}
                        setFilters={setFilters}
                        setPriceFilter={setPriceFilter}
                    />
                    <hr></hr>
                </div>
            )}
        </div>
    );
};

export default PriceController;

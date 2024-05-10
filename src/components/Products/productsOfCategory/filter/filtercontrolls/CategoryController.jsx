import React from "react";
import { useParams } from "react-router-dom";

const CategoryController = (props) => {
    const { isCategoryContainerActive, setCategoryContainerActive, setBrandContainerActive,
        setRatingContainerActive, setPriceContainerActive 
    } = props;

    const { particularCategory } = useParams();
    // console.log(particularCategory);


    //for (small screen)---->
    const handleCategory = () => {
        if (window.innerWidth <= 767) {
            setCategoryContainerActive(!isCategoryContainerActive);
            // Another filter deContaineractive
            setBrandContainerActive(false);
            setRatingContainerActive(false);
            setPriceContainerActive(false);
        }
    };


    return (
        <div className="category">
            <p onClick={() => handleCategory()}>CATEGORY</p>
            {isCategoryContainerActive && (
                <div className="inner-div">
                    <p>CATEGORY</p>
                    <ul>
                        <li>{particularCategory}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoryController;

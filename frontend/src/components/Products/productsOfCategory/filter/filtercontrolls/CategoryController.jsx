import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const CategoryController = (props) => {
    const { isCategoryContainerActive, setCategoryContainerActive, setBrandContainerActive,
        setRatingContainerActive, setPriceContainerActive, searchCategories, setSelectedCategory
    } = props;

    //for search logic
    // console.log(searchCategories);
    const searchProducts = useSelector(state => state.categoryProducts.searchProducts);
    // console.log(searchProducts);

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


    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        // Update URL with the selected category
        window.history.pushState(null, "", `/products/category/${category}`);
    }


    return (
        <div className="category">
            <p onClick={() => handleCategory()}>CATEGORY</p>
            {isCategoryContainerActive && (
                <div className="inner-div">
                    <p>CATEGORY</p>
                    <ul>
                        {searchProducts ?
                            searchProducts.map(products => {
                                const category = products[0].category;
                                return (
                                    <li 
                                        className="seacrch-category" 
                                        key={category} 
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        <span>{ category }</span>
                                    </li>
                                )
                            })
                            :
                            (!searchCategories || searchCategories.length <= 1) ? (
                                <li>{particularCategory}</li>
                            ) : (
                                searchCategories.map((category) => {
                                    return (
                                        <li className="seacrch-category" key={category}>
                                            <Link to={`/products/category/${category}`}>
                                                {category}
                                            </Link>
                                        </li>
                                    );
                                })
                            )
                        }
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoryController;

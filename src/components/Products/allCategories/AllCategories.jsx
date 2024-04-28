import React, { useEffect } from "react";
import "./AllCategories.css"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCategories } from "../../../redux/reducers/categorySlice";
import axios from "axios";

const AllCategories = () => {
  const categories = useSelector((state) => state.allCategory);
  // console.log(categories);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProductsCategory = async () => {
        try {
            const response = await axios('https://dummyjson.com/products/categories');
            if (response.status === 200) {
                // console.log(response);
                // console.log(response.data);
                dispatch(setCategories(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchProductsCategory();
  }, [dispatch]);

  const renderCategories = categories.map((category, index) => {
    return (
      <div className="category-container" key={index}>
        <Link to={`category/${ category }`}>
          <menu>{ category }</menu>
        </Link>
      </div>
    );
  });

  return (
    <div className="flex-container">
      <Link to={'/products'}>All</Link>
      { renderCategories }
    </div>
  );
};
export default AllCategories;

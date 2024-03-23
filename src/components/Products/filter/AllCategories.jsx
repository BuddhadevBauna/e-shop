import React from "react";
import "./AllCategories.css"
import { useSelector } from "react-redux";

const AllCategories = () => {
  const categories = useSelector((state) => state.allCategory);
  // console.log(categories);

  const renderCategories = categories.map((category, index) => {
    return (
      <div className="category-container" key={index}>
        <menu>{category}</menu>
      </div>
    );
  });

  return <>{ renderCategories }</>;
};
export default AllCategories;

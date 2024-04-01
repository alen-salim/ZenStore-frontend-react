import React from "react";

import "./ProductsSidebar.css";
import config from "../../config.json";

import LinkWithIcon from "./../Navbar/LinkWithIcon";
import useData from "../../hooks/useData";
const ProductsSidebar = () => {
  const { data: categories, error } = useData("/category");

  return (
    <aside className="products-sidebar">
      <h2>Category</h2>

      <div className="category-links">
        {error && <em className="form-error">{error}</em>}
        {categories &&
          categories.map((category) => (
            <LinkWithIcon
              key={category._id}
              title={category.name}
              link={`/products?category=${category.name}`}
              emoji={`${config.backendURL}/category/${category.image}`}
              sidebar={true}
            />
          ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;

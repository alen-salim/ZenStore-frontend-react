import React from "react";

import "./FeaturedProducts.css";
import ProductCard from "../Products/ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const FeaturedProducts = () => {
  const { data, error, isLoading } = useData("/products/featured");
  const skeletons = [1, 2, 3];
  return (
    <section className="featured-products">
      <h2>Featured Products</h2>

      <div className="align-center featured-products-list">
        {error && <em className="form-error">{error}</em>}
        {data &&
          data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
      </div>
    </section>
  );
};

export default FeaturedProducts;

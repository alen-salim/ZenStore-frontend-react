import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./ProductCard.css";
import config from "../../config.json";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";

const ProductCard = ({ product }) => {
  const user = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`product/${product?._id}`}>
          <img
            src={`${config.backendURL}/products/${product?.images[0]}`}
            alt="product image"
          />
        </Link>
      </div>

      <div className="product-details">
        <h3 className="product-price">${product?.price}</h3>
        <p className="product-title">{product?.title}</p>

        <footer className="align-center product-info-footer">
          <div className="align-center">
            <p className="align-center product-rating">
              <img src={star} alt="star" />
              {product?.reviews.rate}
            </p>
            <p className="product-review-count">{product?.reviews.count}</p>
          </div>
          {product?.stock > 0 && user && (
            <button
              className="add-to-cart"
              onClick={() => addToCart(product, 1)}
            >
              <img src={basket} alt="nasket button" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;

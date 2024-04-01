import React, { useContext, useState } from "react";

import "./SingleProductPage.css";
import config from "../../config.json";

import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import Loader from "./../common/Loader";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  const { id } = useParams();
  const { data: product, error, isLoading } = useData(`/products/${id}`);
  return (
    <>
      <section className="align-center single-product">
        {error && <em className="form-error">{error}</em>}
        {isLoading && <Loader />}
        {product && (
          <>
            <div className="align-center">
              <div className="single-product-thumbnails">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.backendURL}/products/${image}`}
                    alt={product.title}
                    className={selectedImage === index ? "selected-image" : ""}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>

              <img
                src={`${config.backendURL}/products/${product.images[selectedImage]}`}
                alt={product.title}
                className="single-product-display"
              />
            </div>

            <div className="single-product-details">
              <h1 className="single-product-title">{product.title}</h1>
              <p className="single-product-description">
                {product.description}
              </p>
              <p className="single-product-price">${product.price}</p>

              {user && (
                <>
                  {" "}
                  <h2 className="quantity-title">Quantity:</h2>
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                  <button
                    className="search-button add-cart"
                    onClick={() => addToCart(product, quantity)}
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default SingleProductPage;

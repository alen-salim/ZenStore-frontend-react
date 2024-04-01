import React, { useContext, useEffect, useState } from "react";
import "./CartPage.css";
import remove from "../../assets/remove.png";
import Table from "../common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";

const CartPage = () => {
  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    setSubTotal(total);
  }, [cart]);

  const checkout = () => {
    const oldCart = [...cart];
    setCart([]);
    checkoutAPI()
      .then(() => {
        toast.success("order placed successfully");
      })
      .catch((error) => {
        toast.error("Something went wrong");
        setCart(oldCart);
      });
  };

  return (
    <section className="align-center cart-page">
      <div className="align-center user-info">
        <img
          src={`http://localhost:5000/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user-name">{user?.name}</p>
          <p className="user-email">{user?.email}</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align-center table-quantity-input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt="remove-icon"
                  className="cart-remove-icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="cart-bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>$5</td>
          </tr>
          <tr className="cart-bill-final">
            <td>Total</td>
            <td>${subTotal + 5}</td>
          </tr>
        </tbody>
      </table>
      <button className="search-button checkout-button" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

export default CartPage;

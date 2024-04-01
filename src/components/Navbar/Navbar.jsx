import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import LinkWithIcon from "./LinkWithIcon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { getSuggestionsAPI } from "../../services/productServices";

const Navbar = () => {
  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  const handleKeydown = (e) => {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((current) =>
          current === 0 ? suggestions.length - 1 : current - 1
        );
      } else if (e.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    } else {
      setSelectedItem(-1);
    }
  };

  useEffect(() => {
    const delaySuggestions = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsAPI(search)
          .then((res) => setSuggestions(res.data))
          .catch((err) => console.log(err));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delaySuggestions);
  }, [search]);

  return (
    <nav className="align-center navbar">
      <div className="align-center">
        <h1 className="navbar-heading">ZenStore</h1>
        <form className="align-center navbar-form" onSubmit={handlesubmit}>
          <input
            type="text"
            className="navbar-search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeydown}
          />
          <button type="submit" className="search-button">
            Search
          </button>
          {suggestions.length > 0 && (
            <ul className="search-result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search-suggestion-link active"
                      : "search-suggestion-link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="align-center navbar-links">
        <LinkWithIcon
          title="Home"
          link="/"
          // emoji={rocket}
        />
        <LinkWithIcon
          title="Products"
          link="/products"
          //  emoji={star}
        />
        {!user && (
          <>
            <LinkWithIcon
              title="Login"
              link="/login"
              // emoji={idButton}
            />
            <LinkWithIcon
              title="Signup"
              link="/signup"
              // emoji={memo}
            />
          </>
        )}
        {user && (
          <>
            <LinkWithIcon
              title="My Orders"
              link="/myorders"
              // emoji={order}
            />
            <LinkWithIcon
              title="Logout"
              link="/logout"
              // emoji={lock}
            />
            <NavLink to="/cart" className="align-center">
              Cart <p className="align-center cart-counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

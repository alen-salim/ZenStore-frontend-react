import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection = ({ title, subtitle, link, image }) => {
  return (
    <section className="hero-section">
      <div className="align-center">
        <h2 className="hero-title">{title}</h2>
        <p className="hero-subtitle">{subtitle}</p>
        <Link to={link} className="hero-link">
          Buy Now
        </Link>
      </div>

      <div className="align-center">
        <img src={image} alt="" className="hero-image" />
      </div>
    </section>
  );
};

export default HeroSection;

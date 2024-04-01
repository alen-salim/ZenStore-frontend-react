import React from "react";
import "./LinkWithIcon.css";
import { NavLink } from "react-router-dom";

const LinkWithIcon = ({ title, link, emoji, sidebar }) => {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align-center sidebar-link" : "align-center"}
    >
      {title} <img src={emoji} alt="" className="link-emoji" />
    </NavLink>
  );
};

export default LinkWithIcon;

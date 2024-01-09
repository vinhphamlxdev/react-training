import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const MenuItem = ({ title = "", to, icon, className = "" }) => {
  return (
    <StyledMenuItem>
      <NavLink
        className={`menu-item py-1 px-3 rounded-md text-base font-medium select-none cursor-pointer nav-bar-item text-textPrimary ${className}`}
        style={(nav) => ({ active: nav.isActive })}
        to={to}
      >
        {icon}
        <span className="menu-item__title select-none hide-on-mobile-tablet">
          {title}
        </span>
      </NavLink>
    </StyledMenuItem>
  );
};

export default MenuItem;
const StyledMenuItem = styled.div`
  .menu-item {
    border: 1px solid transparent;
  }
  .menu-item.active {
    color: white;
    border: 1px solid #8ecae6;
    color: #ffafcc;
  }
`;

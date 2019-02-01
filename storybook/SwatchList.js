import React from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import "./swatchList.css";

export const SwatchList = ({ children, ...rest }) => {
  return (
    <ul className="swatch-list" {...rest}>
      {children}
    </ul>
  );
};

SwatchList.propTypes = {
  children: PropTypes.node
};

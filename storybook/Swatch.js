import React from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";

export const Swatch = ({ colour, ...rest }) => {
  return (
    <li className="swatch" style={{ background: colour }} {...rest}>
      <span>{colour}</span>
    </li>
  );
};

Swatch.propTypes = {
  colour: PropTypes.string
};

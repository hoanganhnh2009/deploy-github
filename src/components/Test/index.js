import React from "react";
import PropTypes from "prop-types";

function SFC({ name }) {
  return <div>{name}</div>;
}

SFC.propTypes = {
  name: PropTypes.string.isRequired
};

SFC.defaultProps = {
  name: null
};

import React from "react";
import propTypes from "prop-types";
import cn from "classnames";

import style from "./style";

const Button = ({ name, className, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn({ [style.submit]: true, [className]: true })}
  >
    {name}
  </button>
);

Button.propTypes = {
  onClick: propTypes.func,
  name: propTypes.string,
  className: propTypes.string,
};

Button.defaultProps = {
  name: `defaultName`,
  onClick: () => {},
  className: ``,
};

export default Button;

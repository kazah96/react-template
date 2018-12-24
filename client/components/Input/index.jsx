import React, { PureComponent } from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import style from "./style";

class Input extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
  };

  static defaultProps = {
    placeholder: `text`,
    className: ``,
  };

  constructor() {
    super();
    this.state = {
      value: ``,
    };
  }

  onChange = event => {
    const {
      target: { value },
    } = event;

    const { onChange } = this.props;

    this.setState({ value }, () => onChange(value));
  };

  render() {
    const { className, placeholder } = this.props;
    const { value } = this.state;

    return (
      <input
        className={cn({ [style.input]: true, [className]: true })}
        value={value}
        onChange={event => this.onChange(event)}
        placeholder={placeholder}
      />
    );
  }
}

export default Input;

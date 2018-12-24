import style from "./style";
import React, { Component } from "react";

class Object extends Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props;
    return <div className={style.container} />;
  }
}

export default Object;

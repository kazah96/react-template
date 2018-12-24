import React from "react";
import propTypes from "prop-types";

import {} from "components";

import style from "./style";

class App extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  componentWillMount() {}

  render() {
    return <div className={style.app}>Ebaas</div>;
  }
}

export default App;

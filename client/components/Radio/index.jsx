import React from "react";

class Radio extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: undefined,
    };
  }

  

  render() {
    const props = this.props;
    return <div className={style.container} />;
  }
}

export default Radio;

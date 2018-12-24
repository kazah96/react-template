import React from "react";

const Selector = React.memo(({ children, name }) => (
  <div>
    {React.Children.map(children, child => child).find(
      w => w.props.name === name,
    )}
  </div>
));

export default Selector;

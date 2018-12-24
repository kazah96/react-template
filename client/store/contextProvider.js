import React from "react";

const Context = React.createContext();

const wrapContext = mapPropsToContext => Component => class ContextWrapper extends React.PureComponent {
      static contextType = Context;

      render() {
        const mappedProps = mapPropsToContext(this.context);

        return <Component {...this.props} {...mappedProps} />;
      }
    };

export { wrapContext };
export default Context;

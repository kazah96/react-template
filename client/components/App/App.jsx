import React from "react";
import { createGlobalStyle } from "styled-components";
import FiltrableList from "components/FiltrableList/FiltrableList";
import {
  StatusASC,
  Status,
} from "./filtableListStyles";

import { testItems, defaultItems } from "./defaultItems";

const GlobalStyle = createGlobalStyle`
  body{
    background: lightgray;
    font: 1em Fira Code;
  }
`;

const columnRender = ({ label, type, isActive, direction }) => {
  if (type === "asc")
    return (
      <StatusASC isActive={isActive} direction={direction}>
        {label}
      </StatusASC>
    );
  if (type === "bool")
    return <Status isActive={isActive}>{label}</Status>;
  if (type === "boolExact") {
    return <Status isActive={isActive}>{label}</Status>;
  }
  return null;
};

const Item = ({ name, value, ba }) => (
  <>
    <td>{name}</td>
    <td>{value}</td>
    <td>{ba}</td> 
    <td>ddqwd</td>
    <td>ASDDDDDDDDdddddd</td>
  </>
);

/* eslint-disable */
class App extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <GlobalStyle />
        <FiltrableList
          onFilterChanged={console.log}
          onSelectedItemChanged={console.log}
          itemRenderer={Item}
          columnRenderer={columnRender}
          items={defaultItems}
          columnDefinitions={testItems}
        />
      </div>
    );
  }
}

export default App;

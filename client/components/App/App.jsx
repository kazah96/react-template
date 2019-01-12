import React from "react";
import { func, string } from "prop-types";
import Filter from "components/FiltrableList/Filter";
import styled from "styled-components";
import List from "components/FiltrableList/List";

const ActiveDiv = styled.div`
  color: ${props => (props.isActive ? "black" : "gray")};
  background: ${props => props.fg && "red"};
  cursor: pointer;
  user-select: none;
`;

const columnRenderw = ({ name, label, onClick, isActive, direction, fg }) => (
  <div onClick={() => onClick(name)}>
    <ActiveDiv isActive={isActive} fg={fg}>
      {" "}
      Name: {name}
      <div>{label}</div>
    </ActiveDiv>
    <div>{direction}</div>
  </div>
);

const Status = styled.div`
  color: ${props => (props.isActive ? "cyan" : "black")};
  opacity: ${props => (props.isActive ? 1 : 0.5)};
  cursor: pointer;
  font-size: 10px;
`;

const StatusASC = styled(Status)`
  &:after {
    content: "";
    display: inline-block;
    vertical-align: top;

    border: 4px solid transparent;
    margin-left: 5px;

    margin-top: ${props => (props.direction === "DESC" ? "3px" : 0)};
    border-top: ${props =>
      props.direction === "DESC" ? "5px solid black" : 0};
    border-bottom: ${props =>
      props.direction === "ASC" ? "5px solid black" : 0};
  }
`;

const StatusBool = styled.div``;

const columnRender = ({ label, name, type, onClick, isActive, direction }) => {
  if (type === "asc")
    return (
      <StatusASC
        onClick={() => onClick(name)}
        isActive={isActive}
        direction={direction}
      >
        {direction}
      </StatusASC>
    );
  if (type === "bool") return <StatusBool isActive={isActive} />;
};

const testItems = [
  { name: "naa", type: "asc", label: "sfsdfsd" },
  { name: "naga", type: "asc", label: "sfsdfsd" },
  { name: "naah", type: "asc", label: "sfsdfsd" },
  { name: "Not", type: "bool", label: "Not Asc" },
  { name: "DAAAMN", type: "bool", label: "Not Asc" },
];

const Table = styled.table`
  width: 600px;
`;

const Tr = styled.tr`
  width: 500px;
  border: 1px solid black;
  background: ${props => (props.isSelected ? "red" : "gray")};
`;

const Item = ({ key, isSelected, name, value, onClick, ba }) => (
  <Tr key={key} isSelected={isSelected} onClick={onClick}>
    <td>{name}</td>
    <td>{value}</td>
    <td>{ba}</td>
    <td>
      <button>Open dispute</button>
    </td>
  </Tr>
);

const defaultItems = [
  { id: 123, name: "sfasf", value: 132, ba: "21" },
  { id: 125, value: 124, name: "qweqwe", ba: "ddd" },
  { id: 126, value: 124, name: "qweqwe", ba: "ddd" },
  { id: 127, value: 124, name: "qweqwe", ba: "ddd" },
  { id: 128, value: 124, name: "qweqwe", ba: "ddd" },
  { id: 129, value: 124, name: "qweqwe", ba: "ddd" },
];

class App extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  componentWillMount() {}

  render() {
    return (
      <Table>
        <thead>
          <Filter
            onFilterChanged={console.log}
            multifilter={false}
            columnRender={columnRender}
            columnDefinitions={testItems}
          />
        </thead>
        <tbody>
          <List
            onSelectedIdChanged={console.log}
            itemRenderer={Item}
            items={defaultItems}
          />
        </tbody>
      </Table>
    );
  }
}

export default App;

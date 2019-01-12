import { arrayOf, func, shape, string } from "prop-types";
import React from "react";
import styled from "styled-components";

const Table = styled.table`
  background: darkslateblue;
`;

const Row = styled.tr`
  border: 2px;

  .fee {
    background: red;
  }
`;

class FiltrableList extends React.PureComponent {
  static propTypes = {
    onFilterUpdated: func.isRequired,
    filterRender: func.isRequired,
    columnDefinitions: arrayOf(
      shape({
        name: string,
        label: string,
      }),
    ).isRequired,
    itemRender: func.isRequired,
    items: arrayOf(
      shape({
        id: string,
        name: string,
      }),
    ).isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  updateFilter = ({ name, type, dir }) => {
    const { onFilterUpdated } = this.props;

    const query = `${name}`;

    onFilterUpdated(query);
  };

  onSort = ({ name, type, dir }) => {
    return name;
  };

  render() {
    const { filterRender, itemRender, items, columnDefinitions } = this.props;

    return (
      <Table>
        <thead>
          <Row>{filterRender({ columnDefinitions, onSort: this.onSort })}</Row>
        </thead>
        <tbody>
          {items.map(item => (
            <Row>{itemRender()}</Row>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default FiltrableList;

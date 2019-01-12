import React from "react";
import { debounce } from "lodash";
import { func } from "prop-types";
import styled from "styled-components";

import Filter, { propTypes as filterPropTypes } from "components/Filter/Filter";
import List, {
  propTypes as listPropTypes,
} from "components/SelectableList/List";

import Column from "./Column";
import Item from "./Item";

const Table = styled.table`
  width: 1090px;
  border-spacing: 0px 10px;
  border-collapse: separate;
`;

const Row = styled.tr``;

const FILTER_DEBOUNCE_INTERVAL = 1000;
const SELECT_DEBOUNCE_INTERVAL = 1000;

class FiltrableList extends React.Component {
  static propTypes = {
    onFilterChanged: func.isRequired,
    onSelectedItemChanged: func.isRequired,
    columnRenderer: func.isRequired,
    itemRenderer: func.isRequired,
    columnDefinitions: filterPropTypes.columnDefinitions, // eslint-disable-line
    items: listPropTypes.items, // eslint-disable-line
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.onFilterChanged = debounce(
      props.onFilterChanged,
      FILTER_DEBOUNCE_INTERVAL,
    );
    this.onSelectedItemChanged = debounce(
      props.onSelectedItemChanged,
      SELECT_DEBOUNCE_INTERVAL,
    );
  }

  render() {
    const {
      columnRenderer,
      itemRenderer,
      columnDefinitions,
      items,
    } = this.props;

    return (
      <Table>
        <thead>
          <Row>
            <Filter
              onFilterChanged={this.onFilterChanged}
              columnRenderer={props =>
                Column({ render: columnRenderer, ...props })
              }
              columnDefinitions={columnDefinitions}
            />
          </Row>
        </thead>
        <tbody>
          <List
            onSelectedItemChanged={this.onSelectedItemChanged}
            itemRenderer={props => Item({ render: itemRenderer, ...props })}
            items={items}
          />
        </tbody>
      </Table>
    );
  }
}

export default FiltrableList;

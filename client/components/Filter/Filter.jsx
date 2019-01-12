import React from "react";
import { func, arrayOf, shape, string, oneOf, bool } from "prop-types";

import {
  getDefaultColumnsState,
  getColumnNextState,
  getColumnInitState,
  getQueryGenerator,
  isMultifilterByDefault,
  getAllFilterTypes,
} from "./columnStateMachines";

const propTypes = {
  columnRenderer: func.isRequired, // render-props pattern
  onFilterChanged: func.isRequired,
  multifilter: bool,
  columnDefinitions: arrayOf(
    shape({
      name: string,
      label: string,
      type: oneOf[getAllFilterTypes()],
    }),
  ).isRequired,
};

class Filter extends React.Component {
  static propTypes = propTypes;

  static defaultProps = { multifilter: false };

  constructor(props) {
    super(props);
    this.state = {
      columns: {},
    };
  }

  componentDidMount() {
    const { columnDefinitions } = this.props;
    const defaultColumnsState = getDefaultColumnsState(columnDefinitions);

    this.setState({ columns: defaultColumnsState });
  }

  onColumnsChanged = () => {
    const { onFilterChanged } = this.props;
    const { columns } = this.state;

    const query = Object.keys(columns)
      .filter(key => columns[key].isActive)
      .map(key =>
        getQueryGenerator(columns[key].type)({ name: key, ...columns[key] }),
      )
      .join("&");

    onFilterChanged(query);
  };

  onColumnClick = name => {
    const { columns } = this.state;
    const { multifilter } = this.props;

    const column = columns[name];

    if (!column) throw new Error(`Column ${name} not found in columns`);

    const newState = { ...column, ...getColumnNextState(column) };

    // Если запрещено одновременно использовать несколько фильтров, то сбрасываем все
    if (!multifilter && !isMultifilterByDefault(column.type)) {
      Object.keys(columns).forEach(key => {
        if (!isMultifilterByDefault(columns[key].type))
          columns[key] = {
            ...columns[key],
            ...getColumnInitState(columns[key].type),
          };
      });
    }

    this.setState(
      { columns: { ...columns, [name]: newState } },
      this.onColumnsChanged,
    );
  };

  getColumn = item => {
    const { columns } = this.state;
    const { columnRenderer } = this.props;
    const { name, type } = item;
    const onClick = this.onColumnClick;

    return columnRenderer({
      ...columns[name],
      type,
      name,
      onClick,
      ...item,
    });
  };

  render() {
    const { columnDefinitions } = this.props;

    return columnDefinitions.map(this.getColumn);
  }
}

export { propTypes };
export default Filter;

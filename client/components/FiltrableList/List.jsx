import React from "react";
import { arrayOf, shape, string, oneOfType, func, number } from "prop-types";

const DIRECTION_UP = 1;
const DIRECTION_DOWN = 2;

class List extends React.Component {
  static propTypes = {
    onSelectedIdChanged: func.isRequired,
    itemRenderer: func.isRequired,
    items: arrayOf(
      shape({
        id: oneOfType([string, number]),
      }),
    ).isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      selectedItemId: 0,
    };
  }

  componentDidMount() {
    this.registerKeyboardInput();
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props;

    if (prevProps.items !== items) {
      this.setState({ selectedItemId: 0 });
    }
  }

  componentWillUnmount() {
    this.unregisterKeyboardInput();
  }

  onUserItemClick = key => {
    this.setState({ selectedItemId: key });
  };

  handleKeyboardInput = event => {
    if (event.keyCode === 40) {
      this.moveSelection(DIRECTION_DOWN);
    } else if (event.keyCode === 38) {
      this.moveSelection(DIRECTION_UP);
    }
  };

  registerKeyboardInput = () => {
    document.addEventListener("keydown", this.handleKeyboardInput);
  };

  unregisterKeyboardInput = () => {
    document.removeEventListener("keydown", this.handleKeyboardInput);
  };

  moveSelection = direction => {
    const { selectedItemId } = this.state;
    const { items } = this.props;

    // вверх
    if (direction === DIRECTION_UP && selectedItemId > 0) {
      this.setState({ selectedItemId: selectedItemId - 1 });
    } else if (
      direction === DIRECTION_DOWN &&
      selectedItemId < items.length - 1
    ) {
      this.setState({ selectedItemId: selectedItemId + 1 });
    }
  };

  getItem = ({ key, arrId, isSelected, ...props }) => {
    const { itemRenderer } = this.props;
    const onClick = () => this.onUserItemClick(arrId);

    return itemRenderer({ isSelected, onClick, key, ...props });
  };

  render() {
    const { items } = this.props;
    const { selectedItemId } = this.state;

    return items.map((item, key) =>
      this.getItem({
        ...item,
        isSelected: key === selectedItemId,
        key: item.id,
        arrId: key,
      }),
    );
  }
}

export default List;

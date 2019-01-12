import { func, string, bool } from "prop-types";
import React from "react";
import styled from "styled-components";

const ColumnContainer = styled.td`
  width: ${props => props.columnWidth};
`;

const ColumnContent = styled.div`
  display: flex;
  color: ${({ isActive }) => (isActive ? "black" : "#919191")};
  font-size: 0.8em;
  opacity: ${({ isActive }) => isActive ? 1 : 0.5};
`;

const Column = ({ name, isActive, width, onClick, render, ...props }) => (
  <ColumnContainer columnWidth={width} key={name}>
    <ColumnContent isActive={isActive} onClick={() => onClick(name)}>
      {render(props)}
    </ColumnContent>
  </ColumnContainer>
);

Column.propTypes = {
  key: string.isRequired,
  isActive: bool,
  name: string.isRequired,
  onClick: func.isRequired,
  render: func.isRequired,
  width: string,
};

Column.defaultProps = {
  width: "auto",
  isActive: false,
};

export default Column;

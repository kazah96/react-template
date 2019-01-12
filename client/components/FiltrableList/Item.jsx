import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Tr = styled.tr`
  border: 1px solid black;
  font-size: 1.2em;
  font-weight: 400;
  color: #919191;
  box-shadow: 0px 0px 20px 0px rgba(94, 84, 207, 0.07);

  margin-bottom: 5px;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  border-left: 10px solid #ffffff;
  border-left-color: rgb(255, 255, 255);
  cursor: pointer;
  border-radius: 5px;

  td {
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #ffffff;

    &:first-child {
      padding-left: 20px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-left: 10px solid black;
      border-color: ${props => props.isSelected && "#5e54cf"};
    }
    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
`;

const Item = ({ key, isSelected, render, onClick, ...props }) => (
  <Tr key={key} isSelected={isSelected} onClick={onClick}>
    {render(props)}
  </Tr>
);

Item.propTypes = {
  key: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
};

Item.defaultProps = {
  isSelected: false,
};

export default Item;

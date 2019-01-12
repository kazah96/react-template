import styled from "styled-components";

export const Status = styled.div`

`;

export const StatusASC = styled(Status)`
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

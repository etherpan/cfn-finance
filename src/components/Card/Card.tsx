import React from 'react';
import styled from 'styled-components';

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background-color: rgba(255, 255, 255); //${(props) => props.theme.color.grey[800]};
  color: #0a3769 !important;
  border: 1px solid #23c1ff;
  border-radius: 10px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default Card;

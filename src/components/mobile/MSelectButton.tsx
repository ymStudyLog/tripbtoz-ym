import React from 'react';
import styled from 'styled-components';

type Props = {};

const SelectButton = (props: Props) => {
  return (
    <ButtonContainer>
      <ButtonWrapper>선택</ButtonWrapper>
    </ButtonContainer>
  );
};

export default SelectButton;

const ButtonContainer = styled.div`
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
`;

const ButtonWrapper = styled.div`
  width: 400px;
  height: 60px;
  background-color: var(--color-main);
  font-size: 23px;
  color: var(--color-white);
  font-weight: 450;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

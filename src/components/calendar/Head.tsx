import React from "react";
import styled from "styled-components";
type Props = {
  handleChangePrevButton: () => void;
  handleChangeNextButton: () => void;
};

const Head = (props: Props) => {
  const {handleChangePrevButton, handleChangeNextButton } = props;

  return (
    <HeadContainer>
      <ButtonContainer>
        <Button onClick={handleChangePrevButton}>&lt;</Button>
        <Button onClick={handleChangeNextButton}>&gt;</Button>
      </ButtonContainer>
    </HeadContainer>
  );
};

export default Head;

const HeadContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 75px;
  position: absolute;
  top: 42px;
  width: 100%;
  z-index: 10;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  &:active {
    transform: scale(1.2);
  }
`;

import React from "react";
import styled from "styled-components";
import { addMonthDate } from "../../utils/dateUtils";
type Props = {
  todayDate: Date;
  showMonthDate: Date;
  maxMonth: number;
  handleChangePrevButton: () => void;
  handleChangeNextButton: () => void;
};

const Head = ({
  todayDate,
  showMonthDate,
  maxMonth,
  handleChangePrevButton,
  handleChangeNextButton,
}: Props) => {
  const laterMonthDate = addMonthDate(todayDate, maxMonth);

  return (
    <HeadContainer>
      <ButtonContainer>
        {todayDate.getFullYear() >= showMonthDate.getFullYear() &&
        todayDate.getMonth() >= showMonthDate.getMonth() ? (
          <div></div>
        ) : (
          <Button onClick={handleChangePrevButton}>&lt;</Button>
        )}
        {laterMonthDate.getFullYear() <= showMonthDate.getFullYear() &&
        laterMonthDate.getMonth() <= showMonthDate.getMonth() ? (
          <div></div>
        ) : (
          <Button onClick={handleChangeNextButton}>&gt;</Button>
        )}
      </ButtonContainer>
    </HeadContainer>
  );
};

export default Head;

const HeadContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
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

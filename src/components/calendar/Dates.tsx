import React, { useEffect } from "react";
import styled from "styled-components";
import { convertDateToString } from "../../utils/dateUtils";

type Props = {
  date: number;
  today: Date;
  month: number;
  year: number;
  handleClickDate: (date: Date) => void;
  checkInDate?: Date;
  checkOutDate?: Date;
  isOtherDay: boolean;
};

const Dates = ({
  date,
  handleClickDate,
  today,
  month,
  year,
  checkInDate,
  checkOutDate,
  isOtherDay,
}: Props) => {
  let isHighlighting = false;
  let isMiddleHighlighting = false;
  const thisDate = convertDateToString(new Date(`${year}-${month}-${date}`));
  const thisCheckInDate = checkInDate
    ? convertDateToString(checkInDate)
    : undefined;
  const thisCheckOutDate = checkOutDate
    ? convertDateToString(checkOutDate)
    : undefined;

  if (
    !isOtherDay &&
    (thisCheckInDate === thisDate || thisCheckOutDate === thisDate)
  ) {
    isHighlighting = true;
  }
  // thisCheckInDate <thisDate < thisCheckOutDate -> isMiddleHighlighting=true

  if (
    !isOtherDay &&
    thisCheckInDate &&
    thisCheckOutDate &&
    thisCheckInDate < thisDate &&
    thisDate < thisCheckOutDate
  ) {
    isMiddleHighlighting = true;
  }
  return (
    <DatesContainer
      onClick={() => {
        handleClickDate(new Date(`${year}-${month}-${date}`));
      }}
    >
      {isHighlighting ? <Highlighting /> : ""}
      {isMiddleHighlighting ? <MiddleHighlighting /> : ""}
      <DateNum
        isOtherDay={isOtherDay}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        isHighlighting={isHighlighting}
      >
        {date}
      </DateNum>
    </DatesContainer>
  );
};

export default Dates;

const DatesContainer = styled.li`
  display: flex;
  position: relative;
  width: calc(100% / 7);
  padding: 3rem 0;
  /* height: 9vw; */
  text-align: center;
  list-style: none;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;

const DateNum = styled.div<{
  checkInDate?: Date;
  checkOutDate?: Date;
  isHighlighting?: boolean;
  isOtherDay: boolean;
}>`
  display: ${(props) => (props.isOtherDay ? "none" : "block")};
  color: ${(props) => (props.isHighlighting ? "#fff" : "black")};
  &:hover {
    ::after {
      content: "";
      display: block;
      border: 3px solid var(--color-main);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  cursor: pointer;
  z-index: 10;
`;

const Highlighting = styled.div`
  border: 3px solid var(--color-main);
  background-color: var(--color-main);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const MiddleHighlighting = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: pink;
`;

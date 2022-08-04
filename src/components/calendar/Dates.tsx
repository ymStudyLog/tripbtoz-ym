import React, { useEffect } from "react";
import styled from "styled-components";
import { convertDateToString } from "../../utils/dateUtils";

type Props = {
  index: number;
  currentMonthFirstDate: number;
  nextMonthFirstDate: number;
  date: number;
  today: Date;
  month: number;
  year: number;
  handleClickDate: (date: Date) => void;
  checkInDate?: Date;
  checkOutDate?: Date;
};

const Dates = ({
  index,
  currentMonthFirstDate,
  nextMonthFirstDate,
  date,
  handleClickDate,
  today,
  month,
  year,
  checkInDate,
  checkOutDate,
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

  if (thisCheckInDate === thisDate || thisCheckOutDate === thisDate) {
    isHighlighting = true;
  }
  // thisCheckInDate <thisDate < thisCheckOutDate -> isMiddleHighlighting=true

  if (
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
        index={index}
        currentMonthFirstDate={currentMonthFirstDate}
        nextMonthFirstDate={nextMonthFirstDate}
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
  index: number;
  currentMonthFirstDate: number;
  nextMonthFirstDate: number;
  checkInDate?: Date;
  checkOutDate?: Date;
  isHighlighting?: boolean;
}>`
  /* padding: 1vw 0.9vw 0 0; */
  ${(props) => props.index < props.currentMonthFirstDate && `display:none`}

  ${(props) =>
    props.nextMonthFirstDate > 0 &&
    props.index > props.nextMonthFirstDate - 1 &&
    `
    display:none
  `};

  ${(props) => props.isHighlighting && `color: "red"`}
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
`;

const Highlighting = styled.div`
  width: 10px;
  height: 10px;
  background-color: red;
`;
const MiddleHighlighting = styled.div`
  width: 10px;
  height: 10px;
  background-color: pink;
`;

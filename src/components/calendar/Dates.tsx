import React, { useEffect } from "react";
import styled from "styled-components";
import { dateToStringYYYYMMDD } from "../../utils/dateUtils";

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
  const thisDate = dateToStringYYYYMMDD(new Date(`${year}-${month}-${date}`));
  const todayDate = dateToStringYYYYMMDD(new Date(today));
  const thisCheckInDate = checkInDate
    ? dateToStringYYYYMMDD(checkInDate)
    : undefined;
  const thisCheckOutDate = checkOutDate
    ? dateToStringYYYYMMDD(checkOutDate)
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
      {thisDate === todayDate ? (
        <TodayDot isHighlighting={isHighlighting} />
      ) : (
        ""
      )}

      <DateNum
        isBeforeToday={thisDate < todayDate}
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
  padding: 1rem 0;
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
  isBeforeToday: boolean;
}>`
  display: ${(props) => (props.isOtherDay ? "none" : "block")};
  /* color: ${(props) => (props.isHighlighting ? "#fff" : "black")};
  color: ${(props) => (props.isBeforeToday ? "#D3D3D3" : "black")}; */

  color: ${(props)=> (props.isBeforeToday? "#D3D3D3" : (props.isHighlighting?"#fff" : "black" ))};

  &:hover {
    ::after {
      content: "";
      display: block;
      border: ${(props) =>
        props.isBeforeToday ? "#fff" : "3px solid var(--color-main)"};
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
  border-radius: 50%;
  background-color: pink;
`;

const TodayDot = styled.div<{ isHighlighting: boolean }>`
  background-color: ${(props) =>
    props.isHighlighting ? "#fff" : "var(--color-main)"};

  border-radius: 50%;
  width: 5px;
  height: 5px;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

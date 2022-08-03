import React from "react";
import styled from "styled-components";

type Props = {
  index: number;
  currentMonthFirstDate: number;
  nextMonthFirstDate: number;
  date: number;
  findToday: boolean;
  month: number;
  year: number;
  handleClickDate: (date: Date) => void;
};

const Dates = ({
  index,
  currentMonthFirstDate,
  nextMonthFirstDate,
  date,
  handleClickDate,
  findToday,
  month,
  year,
}: Props) => {
  const DAY = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <DatesContainer
      onClick={() => handleClickDate(new Date(`${year}-${month}-${date}`))}
    >
      <DateNum
        index={index}
        currentMonthFirstDate={currentMonthFirstDate}
        nextMonthFirstDate={nextMonthFirstDate}
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
  padding: 0 0.6vw;
  height: 9vw;
  text-align: right;
  border-bottom: 1px solid #e4e3e6;
  border-left: 1px solid #e4e3e6;
  list-style: none;
  box-sizing: border-box;
`;

const DateNum = styled.div<{
  index: number;
  currentMonthFirstDate: number;
  nextMonthFirstDate: number;
}>`
  padding: 1vw 0.9vw 0 0;
  ${(props) => props.index < props.currentMonthFirstDate && `display:none`};

  ${(props) =>
    props.nextMonthFirstDate > 0 &&
    props.index > props.nextMonthFirstDate - 1 &&
    `
    display:none
  `};
`;

const Days = styled.div`
  display: flex;
  color: #969696;
`;

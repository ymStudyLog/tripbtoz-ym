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
}>`
  /* padding: 1vw 0.9vw 0 0; */
  ${(props) => props.index < props.currentMonthFirstDate && `display:none`}

  ${(props) =>
    props.nextMonthFirstDate > 0 &&
    props.index > props.nextMonthFirstDate - 1 &&
    `
    display:none
  `};

  &:hover {
    ::after {
      content: "";
      display: block;
      border: 3px solid #ff375c;
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

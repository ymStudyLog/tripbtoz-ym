import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { convertDateToString } from "../../utils/dateUtils";
import Body from "./Body";
import Head from "./Head";

type Props = {
  today: Date;
  handleChangeCheckInOut?: (checkIn?: Date, checkOut?: Date) => void;
};

type CheckInOutType = {
  checkIn?: Date;
  checkOut?: Date;
};

const addDate = (date: Date, day: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + day);
  return newDate;
};

const Calendar = ({ today, handleChangeCheckInOut }: Props) => {
  let DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;

  const [month, setMonth] = React.useState(MONTH);
  const [year, setYear] = React.useState(YEAR);

  const [checkInOut, setCheckInOut] = React.useState<CheckInOutType>({
    checkIn: addDate(today, 7),
    checkOut: addDate(today, 8),
  });

  const handleChangePrevButton = () => {
    const currentDate = new Date(`${year}-${month}`);
    currentDate.setMonth(currentDate.getMonth() - 1);
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
  };
  const handleChangeNextButton = () => {
    const currentDate = new Date(`${year}-${month}`);
    currentDate.setMonth(currentDate.getMonth() + 1);
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
  };

  const handleClickDate = (date: Date) => {
    const todayString = convertDateToString(today);
    const dateString = convertDateToString(date);

    if (todayString > dateString) {
      return;
    }
    if (!checkInOut.checkIn || (checkInOut.checkIn && checkInOut.checkOut)) {
      setCheckInOut({
        checkIn: new Date(date),
        checkOut: undefined,
      });
    } else if (date > checkInOut.checkIn) {
      setCheckInOut({
        ...checkInOut,
        checkOut: new Date(date),
      });
    } else if (date < checkInOut.checkIn) {
      setCheckInOut({
        checkIn: new Date(date),
        checkOut: undefined,
      });
    }
  };

  useEffect(() => {
    if (handleChangeCheckInOut) {
      handleChangeCheckInOut(checkInOut.checkIn, checkInOut.checkOut);
    }
  }, [checkInOut]);

  //상태가 바뀔때마다 함수를 호출해서 알려주는 함수

  return (
    <>
      <Head
        year={year}
        month={month}
        handleChangePrevButton={handleChangePrevButton}
        handleChangeNextButton={handleChangeNextButton}
      />
      <BodyContainer>
        <Body
          handleClickDate={handleClickDate}
          checkInDate={checkInOut.checkIn}
          checkOutDate={checkInOut.checkOut}
          today={today}
          month={month}
          year={year}
        />
        <Body
          handleClickDate={handleClickDate}
          today={today}
          month={month + 1}
          year={year}
        />
      </BodyContainer>
    </>
  );
};

export default Calendar;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

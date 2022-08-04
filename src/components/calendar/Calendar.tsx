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
    //오늘날짜보다 클릭한 날짜가 작으면 아무일도 일어나지않게 return
    if (todayString > dateString) {
      return;
    }
    //체크인값이 없는경우 ||checkIn값과 checkOut값이 있는경우 체크인 값을 오늘날짜로 해주기
    if (!checkInOut.checkIn || (checkInOut.checkIn && checkInOut.checkOut)) {
      setCheckInOut({
        checkIn: new Date(date),
        checkOut: undefined,
      });
      //클릭한 날의 값이 체크인의 값보다 큰경우 즉 오늘날짜 4일 클릭날짜 10일 -> 오늘일이 기본적으로 체크인에 되어있을테니 체크아웃 값설정
    } else if (date > checkInOut.checkIn) {
      setCheckInOut({
        ...checkInOut,
        checkOut: new Date(date),
      });
      // 클릭한 날이 체크인 값 보다 작을경우, 즉 오늘날짜로 기본 셋팅되었을텐데 그거보다 이전 날짜를 클릭하면 체크인을 오늘날짜로 설정해줘야지 그러며 초기화!
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
          checkInDate={checkInOut.checkIn}
          checkOutDate={checkInOut.checkOut}
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

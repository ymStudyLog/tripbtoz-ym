import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  addMonthDate,
  convertDateToString,
  addDate,
} from "../../utils/dateUtils";
import Body from "./Body";
import Head from "./Head";

type Props = {
  today: Date;
  initialCheckIn: Date | undefined;
  initialCheckOut: Date | undefined;
  initialMonthDate: Date;
  maxMonth: number;
  handleChangeCheckInOut?: (checkIn?: Date, checkOut?: Date) => void;
  handleChangeMonthDate?: (date: Date) => void;
};

type CheckInOutType = {
  checkIn?: Date;
  checkOut?: Date;
};

const Calendar = ({
  today,
  initialCheckIn,
  initialCheckOut,
  initialMonthDate,
  maxMonth,
  handleChangeCheckInOut,
  handleChangeMonthDate,
}: Props) => {
  const [todayDate, setTodayDate] = React.useState(today); //TODO today=new Date() = todayDate
  const [showMonthDate, setShowMonthDate] = React.useState(initialMonthDate);
  const [checkInOut, setCheckInOut] = React.useState<CheckInOutType>({
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
  });

  const handleChangePrevButton = () => {
    const currentDate = addMonthDate(new Date(showMonthDate), -1);
    setShowMonthDate(currentDate);
  };
  const handleChangeNextButton = () => {
    const currentDate = addMonthDate(new Date(showMonthDate), +1);
    setShowMonthDate(currentDate);
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

  useEffect(() => {
    if (handleChangeMonthDate) {
      handleChangeMonthDate(showMonthDate);
    }
  }, [showMonthDate]);

  return (
    <>
      <Head
        maxMonth={maxMonth}
        todayDate={todayDate}
        showMonthDate={showMonthDate}
        handleChangePrevButton={handleChangePrevButton}
        handleChangeNextButton={handleChangeNextButton}
      />
      <BodyContainer>
        <Body
          handleClickDate={handleClickDate}
          checkInDate={checkInOut.checkIn}
          checkOutDate={checkInOut.checkOut}
          today={today}
          month={showMonthDate.getMonth() + 1}
          year={showMonthDate.getFullYear()}
        />
        <Body
          handleClickDate={handleClickDate}
          checkInDate={checkInOut.checkIn}
          checkOutDate={checkInOut.checkOut}
          today={today}
          month={addMonthDate(showMonthDate, 1).getMonth() + 1}
          year={addMonthDate(showMonthDate, 1).getFullYear()}
        />
      </BodyContainer>
    </>
  );
};

export default Calendar;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 400px;
  margin-bottom: 20px;
`;

import React from "react";
import styled from "styled-components";
import Calendar from "../calendar/Calendar";

type Props = {
  today: Date;
  initialCheckIn: Date | undefined;
  initialCheckOut: Date | undefined;
  initialMonthDate: Date;
  handleChangeCheckInOut?: (checkIn?: Date, checkOut?: Date) => void;
  handleChangeMonthDate?: (date: Date) => void;
};

const CalendarModal = ({
  today,
  initialCheckIn,
  initialCheckOut,
  initialMonthDate,
  handleChangeCheckInOut,
  handleChangeMonthDate,
}: Props) => {
  return (
    <CalendarModalContainer onClick={(e) => e.stopPropagation()}>
      <Calendar
        maxMonth={11}
        today={today}
        initialCheckIn={initialCheckIn}
        initialCheckOut={initialCheckOut}
        initialMonthDate={initialMonthDate}
        handleChangeCheckInOut={handleChangeCheckInOut}
        handleChangeMonthDate={handleChangeMonthDate}
      />
    </CalendarModalContainer>
  );
};

export default CalendarModal;

const CalendarModalContainer = styled.div`
  position: absolute;
  top: 63px;
  left: -65px;
  width: 50rem;
  min-height: 22rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
`;

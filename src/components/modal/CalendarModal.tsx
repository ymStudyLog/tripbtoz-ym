import React from "react";
import styled from "styled-components";
import Calendar from "../calendar/Calendar";

type Props = {
  today: Date;
  handleChangeCheckInOut?: (checkIn?: Date, checkOut?: Date) => void;
};

const CalendarModal = ({ today, handleChangeCheckInOut }: Props) => {
  return (
    <CalendarModalContainer onClick={(e) => e.stopPropagation()}>
      <Calendar today={today} handleChangeCheckInOut={handleChangeCheckInOut} />
    </CalendarModalContainer>
  );
};

export default CalendarModal;

const CalendarModalContainer = styled.div`
  width: 800px;
  min-height: 400px;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
`;

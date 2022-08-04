import React from 'react';
import styled from 'styled-components';

const CalendarModal = ({ setShowCalendarModal }: any) => {
  return <CalendarModalContainer onClick={(event) => event.stopPropagation()}>캘린더 들어올 자리</CalendarModalContainer>;
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

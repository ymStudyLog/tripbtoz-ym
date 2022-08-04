import React from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';
import { ModalProps } from '../../types/modalType';

const CalendarModalPosition = ({ children }: ModalProps) => {
  return (
    <ModalPortal>
      <Position>{children}</Position>
    </ModalPortal>
  );
};

export default CalendarModalPosition;

const Position = styled.div`
  transform: translateY(-127%);
  display: flex;
  justify-content: center;
`;

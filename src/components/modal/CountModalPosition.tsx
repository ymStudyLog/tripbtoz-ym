import React from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';
import { ModalProps } from '../../types/modalType';

const CountModalPosition = ({ children }: ModalProps) => {
  return (
    <ModalPortal>
      <Position>{children}</Position>
    </ModalPortal>
  );
};

export default CountModalPosition;

const Position = styled.div`
  transform: translateY(-280%);
  display: flex;
  justify-content: flex-end;
  margin-right: 20rem;
`;

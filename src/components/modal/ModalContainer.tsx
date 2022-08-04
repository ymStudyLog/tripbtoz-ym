import React from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';
import { ModalProps } from '../../types/modalType';

const ModalContainer = ({ children }: ModalProps) => {
  return (
    <ModalPortal>
      <ModalPosition>{children}</ModalPosition>
    </ModalPortal>
  );
};

export default ModalContainer;

const ModalPosition = styled.div`
  transform: translateY(-127%);
  display: flex;
  justify-content: center;
  background-color: transparent;
`;

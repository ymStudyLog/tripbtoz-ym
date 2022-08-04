import React from 'react';
import styled from 'styled-components';

const CountModal = ({ setShowCountModal }: any) => {
  return <CountModalContainer>객실 / 인원 정보</CountModalContainer>;
};

export default CountModal;

const CountModalContainer = styled.div`
  width: 22rem;
  min-height: 17rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
`;

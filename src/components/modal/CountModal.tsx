import React from 'react';
import styled from 'styled-components';
import { FiMinusSquare } from 'react-icons/fi';
import { FiPlusSquare } from 'react-icons/fi';

const CountModal = ({ setShowCountModal }: any) => {
  const [numberOfPeople, setNumberOfPeople] = React.useState({
    adult: 2,
    child: 0,
  });

  const isLessThan = (number: number, lessThan: number) => number < lessThan;
  const isMoreThan = (number: number, moreThan: number) => number > moreThan;

  const MAXIMUM = {
    adult: 8,
    child: 8,
  };

  const MINIMUM = {
    adult: 1,
    child: 0,
  };

  const decreaseAdult = () => {
    if (isLessThan(numberOfPeople.adult - 1, MINIMUM.adult)) return;
    setNumberOfPeople((prevState) => ({ ...prevState, adult: prevState.adult - 1 }));
  };

  const increaseAdult = () => {
    if (isMoreThan(numberOfPeople.adult + 1, MAXIMUM.adult)) return;
    setNumberOfPeople((prevState) => ({ ...prevState, adult: prevState.adult + 1 }));
  };

  const decreaseChild = () => {
    if (isLessThan(numberOfPeople.child - 1, MINIMUM.child)) return;
    setNumberOfPeople((prevState) => ({ ...prevState, child: prevState.child - 1 }));
  };

  const increaseChild = () => {
    if (isMoreThan(numberOfPeople.child + 1, MAXIMUM.child)) return;
    setNumberOfPeople((prevState) => ({ ...prevState, child: prevState.child + 1 }));
  };

  return (
    <CountModalContainer onClick={(event) => event.stopPropagation()}>
      <CountGuestWrapper>
        <GuestTitle>성인</GuestTitle>
        <GuestNumberContainer>
          <IconWrapper onClick={() => decreaseAdult()}>
            <FiMinusSquare />
          </IconWrapper>
          <GuestNumber>{numberOfPeople.adult}</GuestNumber>
          <IconWrapper onClick={() => increaseAdult()}>
            <FiPlusSquare />
          </IconWrapper>
        </GuestNumberContainer>
      </CountGuestWrapper>
      <CountGuestWrapper>
        <GuestTitle>아이</GuestTitle>
        <GuestNumberContainer>
          <IconWrapper onClick={() => decreaseChild()}>
            <FiMinusSquare />
          </IconWrapper>
          <GuestNumber>{numberOfPeople.child}</GuestNumber>
          <IconWrapper onClick={() => increaseChild()}>
            <FiPlusSquare />
          </IconWrapper>
        </GuestNumberContainer>
      </CountGuestWrapper>
    </CountModalContainer>
  );
};

export default CountModal;

const CountModalContainer = styled.div`
  position: absolute;
  top: 63px;
  left: -65px;
  width: 335px;
  min-height: 100px;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
`;

const CountGuestWrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-around;
`;

const GuestTitle = styled.div`
  width: 48px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GuestNumberContainer = styled.div`
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 32px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const GuestNumber = styled.div`
  width: 32px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

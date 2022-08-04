import React from "react";
import styled from "styled-components";
import { FiMinusSquare } from "react-icons/fi";
import { FiPlusSquare } from "react-icons/fi";

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

  const increaseAdult = () => {
    if (isMoreThan(numberOfPeople.adult + 1, MAXIMUM.adult)) return;
    setNumberOfPeople((prevState) => ({
      ...prevState,
      adult: prevState.adult + 1,
    }));
  };

  const increaseChild = () => {
    if (isMoreThan(numberOfPeople.child + 1, MAXIMUM.child)) return;
    setNumberOfPeople((prevState) => ({
      ...prevState,
      child: prevState.child + 1,
    }));
  };

  const decreaseAdult = () => {
    if (isLessThan(numberOfPeople.adult - 1, MINIMUM.adult)) return;
    setNumberOfPeople((prevState) => ({
      ...prevState,
      adult: prevState.adult - 1,
    }));
  };

  const decreaseChild = () => {
    if (isLessThan(numberOfPeople.child - 1, MINIMUM.child)) return;
    setNumberOfPeople((prevState) => ({
      ...prevState,
      child: prevState.child - 1,
    }));
  };

  return (
    <CountModalContainer onClick={(e) => e.stopPropagation()}>
      <CountGuestWrapper>
        <GuestTitle>성인</GuestTitle>
        <GuestNumberContainer>
          <IconWrapper>
            <FiMinusSquare />
          </IconWrapper>
          <GuestNumber>2</GuestNumber>
          <IconWrapper>
            <FiPlusSquare />
          </IconWrapper>
        </GuestNumberContainer>
      </CountGuestWrapper>
      <CountGuestWrapper>
        <GuestTitle>아이</GuestTitle>
        <GuestNumberContainer>
          <IconWrapper>
            <FiMinusSquare />
          </IconWrapper>
          <GuestNumber>0</GuestNumber>
          <IconWrapper>
            <FiPlusSquare />
          </IconWrapper>
        </GuestNumberContainer>
      </CountGuestWrapper>
    </CountModalContainer>
  );
};

export default CountModal;

const CountModalContainer = styled.div`
  width: 22rem;
  min-height: 10rem;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
`;

const CountGuestWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-around;
`;

const GuestTitle = styled.div`
  width: 3rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GuestNumberContainer = styled.div`
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 2rem;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const GuestNumber = styled.div`
  width: 2rem;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

import React from 'react';
import styled from 'styled-components';
import { VscCalendar } from 'react-icons/vsc';
import { IoPersonOutline } from 'react-icons/io5';
import { IoSearch } from 'react-icons/io5';
import CalendarModal from '../modal/CalendarModal';
import CountModal from '../modal/CountModal';

const SearchBar = () => {
  const [showCalendarModal, setShowCalendarModal] = React.useState<boolean>(false);

  const [showCountModal, setShowCountModal] = React.useState<boolean>(false);

  return (
    <SearchBarContainer>
      <IconWrapper>
        <VscCalendar />
      </IconWrapper>
      <CheckInOutContainer
        onClick={() => {
          setShowCalendarModal(!showCalendarModal);
          setShowCountModal(false);
        }}
      >
        {showCalendarModal && <CalendarModal setShowCalendarModal={setShowCalendarModal} />}
        <CheckInWrapper>
          <SubMenuTitle>체크인</SubMenuTitle>
          <SubMenuContents>8월 13일</SubMenuContents>
        </CheckInWrapper>
        <StayPeriodText>2박</StayPeriodText>
        <CheckOutWrapper>
          <SubMenuTitle>체크아웃</SubMenuTitle>
          <SubMenuContents>8월 15일</SubMenuContents>
        </CheckOutWrapper>
      </CheckInOutContainer>
      <IconWrapper>
        <IoPersonOutline />
      </IconWrapper>
      <GuestInfoContainer
        onClick={() => {
          setShowCountModal(!showCountModal);
          setShowCalendarModal(false);
        }}
      >
        {showCountModal && <CountModal setShowCountModal={setShowCountModal} />}
        <GuestInfoWrapper>
          <SubMenuTitle>객실 / 인원</SubMenuTitle>
          <SubMenuContents>객실 1, 인원 3</SubMenuContents>
        </GuestInfoWrapper>
      </GuestInfoContainer>
      <SearchIconWrapper>
        <IoSearch />
      </SearchIconWrapper>
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  border: 1.5px solid var(--color-border);
  cursor: pointer;
`;

const CheckInOutContainer = styled.div`
  display: flex;
  width: 20rem;
  margin-left: 0 1.5rem;
  border-right: 1.5px solid var(--color-border);
  position: relative;

  &:hover {
    background-color: var(--color-hover);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  font-size: 1.8rem;
`;

const CheckInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 9rem;
  padding-left: 1rem;
`;

const SubMenuTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-subTitle);
`;

const SubMenuContents = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 0.5rem;
`;

const StayPeriodText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  color: var(--color-subTitle);
`;

const CheckOutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 9rem;
  padding-right: 1rem;
`;

const GuestInfoContainer = styled.div`
  display: flex;
  width: 17rem;
  margin-left: 0 1.5rem;
  position: relative;

  &:hover {
    background-color: var(--color-hover);
  }
`;

const GuestInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 20rem;
  padding-left: 1rem;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  font-size: 2.2rem;
  background-color: var(--color-main);
  color: var(--color-white);
`;

import React from 'react';
import styled from 'styled-components';
import { VscCalendar } from 'react-icons/vsc';
import { IoPersonOutline } from 'react-icons/io5';
import { IoSearch } from 'react-icons/io5';

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <CheckInOutContainer>
        <IconWrapper>
          <VscCalendar />
        </IconWrapper>
        <CheckInGuestInfoWrapper>
          <SubMenuTitle>체크인</SubMenuTitle>
          <SubMenuContents>8월 13일</SubMenuContents>
        </CheckInGuestInfoWrapper>
        <StayPeriodText>2박</StayPeriodText>
        <CheckOutWrapper>
          <SubMenuTitle>체크아웃</SubMenuTitle>
          <SubMenuContents>8월 15일</SubMenuContents>
        </CheckOutWrapper>
      </CheckInOutContainer>
      <GuestInfoContainer>
        <IconWrapper>
          <IoPersonOutline />
        </IconWrapper>
        <CheckInGuestInfoWrapper>
          <SubMenuTitle>객실 / 인원</SubMenuTitle>
          <SubMenuContents>객실 1, 인원 3</SubMenuContents>
        </CheckInGuestInfoWrapper>
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
  width: 50%;
  margin-left: 0 1.5rem;

  &:hover {
    background-color: var(--color-hover);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  font-size: 1.8rem;
`;

const CheckInGuestInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 40%;
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
  width: 3rem;
  color: var(--color-subTitle);
`;

const CheckOutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 40%;
  padding-right: 1rem;
  border-right: 1.5px solid var(--color-border);
`;

const GuestInfoContainer = styled.div`
  display: flex;
  width: 50%;
  margin-left: 0 1.5rem;

  &:hover {
    background-color: var(--color-hover);
  }
`;

const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-size: 2rem;
  border-left: 1.5px solid var(--color-border);
  background-color: var(--color-main);
  color: var(--color-white);
`;

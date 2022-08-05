import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { VscCalendar } from 'react-icons/vsc';
import { IoPersonOutline } from 'react-icons/io5';
import { IoSearch } from 'react-icons/io5';
import CalendarModal from '../modal/CalendarModal';
import CountModal from '../modal/CountModal';
import { addDate, convertDateToString, getDateDiff } from '../../utils/dateUtils';

const SearchBar = () => {
  const today = new Date(convertDateToString(new Date()));
  const [initialMonthDate, setInitialMonthDate] = React.useState(new Date(convertDateToString(new Date())));
  const [checkIn, setCheckIn] = React.useState<Date | undefined>(addDate(today, 7));
  const [checkOut, setCheckOut] = React.useState<Date | undefined>(addDate(today, 8));
  const [showCalendarModal, setShowCalendarModal] = React.useState<boolean>(false);
  const [showCountModal, setShowCountModal] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const handleToHotel = () => {
    navigate('/hotel');
  };

  return (
    <SearchBarWrapper>
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
          {showCalendarModal && (
            <CalendarModal
              initialCheckIn={checkIn}
              initialCheckOut={checkOut}
              today={new Date(convertDateToString(new Date()))}
              initialMonthDate={initialMonthDate}
              handleChangeMonthDate={(date: Date) => {
                setInitialMonthDate(date);
              }}
              handleChangeCheckInOut={(srcCheckIn?: Date, srcCheckOut?: Date) => {
                let changed = false;
                if (srcCheckIn !== checkIn || srcCheckOut !== checkOut) {
                  changed = true;
                }
                setCheckIn(srcCheckIn);
                setCheckOut(srcCheckOut);
                if (changed && srcCheckIn && srcCheckOut) {
                  setShowCalendarModal(false);
                }
              }}
            />
          )}
          <CheckInWrapper>
            <SubMenuTitle>체크인</SubMenuTitle>
            <SubMenuContents>{checkIn ? `${checkIn.getMonth() + 1}월 ${checkIn.getDate()}일` : '날짜추가'}</SubMenuContents>
          </CheckInWrapper>
          <StayPeriodText>{checkIn && checkOut ? `${getDateDiff(checkOut, checkIn)}박` : ''}</StayPeriodText>
          <CheckOutWrapper>
            <SubMenuTitle>체크아웃</SubMenuTitle>
            <SubMenuContents>{checkOut ? `${checkOut.getMonth() + 1}월 ${checkOut.getDate()}일` : '날짜추가'}</SubMenuContents>
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
            <SubMenuTitle>인원</SubMenuTitle>
            <SubMenuContents>성인 2 / 아이 0</SubMenuContents>
          </GuestInfoWrapper>
        </GuestInfoContainer>
        <SearchIconWrapper onClick={handleToHotel}>
          <IoSearch />
        </SearchIconWrapper>
      </SearchBarContainer>
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  height: 60px;
  width: 800px;
  margin-top: 20px;
`;

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
  width: 320px;
  margin-left: 0 24px;
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
  width: 64px;
  font-size: 28px;
`;

const CheckInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 144px;
  padding-left: 16px;
`;

const SubMenuTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-subTitle);
`;

const SubMenuContents = styled.div`
  font-size: 17.6px;
  font-weight: 700;
  margin-top: 8px;
`;

const StayPeriodText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  color: var(--color-subTitle);
`;

const CheckOutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 144px;
  padding-right: 16px;
`;

const GuestInfoContainer = styled.div`
  display: flex;
  width: 272px;
  margin-left: 0 24px;
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
  width: 320px;
  padding-left: 16px;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  font-size: 35px;
  background-color: var(--color-main);
  color: var(--color-white);
`;

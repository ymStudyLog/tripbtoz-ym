import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getDateDiff } from "../utils/dateUtils";
import useLocalStorage from "../hooks/useLocalStorage";
import useHeadCount from "../hooks/useHeadCount";
import useStayPeriod from "../hooks/useStayPeriod";
import { IoSearch } from "react-icons/io5";
import * as S from "../styles/SearchBar.style";
import { Main } from "./Main";

const SearchBar = () => {
  const location = useLocation().pathname;
  const today = new Date();
  const navigate = useNavigate();
  const {
    prevStayPeriod,
    prevHeadCount,
    parseLocalStorage,
    setStayPeriodInStorage,
    setHeadCountInStorage,
  } = useLocalStorage();

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showCalendarModal,
    setShowCalendarModal,
    isCalenderModalClicked,
  } = useStayPeriod({ today });

  const {
    count,
    setCount,
    showCountModal,
    setShowCountModal,
    countValueString,
    isCountModalClicked,
  } = useHeadCount();

  //TODO 여기에서 로컬스토리지 값 확인해야됨 -> React.useState로 state에 저장하고 Outlet에도 전달함
  React.useEffect(() => {
    const storageStayPeriod: string | null = localStorage.getItem("stayPeriod");
    const storageHeadCount: string | null = localStorage.getItem("headCount");
    parseLocalStorage(storageStayPeriod, storageHeadCount);
  }, [parseLocalStorage]);

  React.useEffect(() => {
    if (prevStayPeriod.checkIn !== null && prevStayPeriod.checkOut !== null) {
      setStartDate(prevStayPeriod.checkIn);
      setEndDate(prevStayPeriod.checkOut);
    }
  }, [prevStayPeriod]);

  React.useEffect(() => {
    if (prevHeadCount.adult !== null && prevHeadCount.child !== null) {
      setCount({
        adult: prevHeadCount.adult,
        child: prevHeadCount.child,
      });
    }
  }, [prevHeadCount]);

  const searchHotelData = () => {
    //모달 닫기
    setShowCalendarModal(false);
    setShowCountModal(false);

    //startDate와 count를 로컬스토리지 저장하면서 각각 setPreviousPeriod, setPreviousHead 
    if (startDate !== undefined && endDate !== undefined) {
      setStayPeriodInStorage(startDate, endDate);
    }
    setHeadCountInStorage(count);
    navigate("/hotel");
  };

  return (
    <Main>
      <SearchBarPositioner>
        {location === "/reservation" ? null : (
          <S.SearchBarContainer endpoint={location}>
            <S.CalenderIcon />
            <S.CheckInOutContainer
              onClick={() => {
                setShowCalendarModal(!showCalendarModal);
                setShowCountModal(false);
              }}
            >
              {isCalenderModalClicked()}
              <S.CheckIn>
                <S.ValueTitle>체크인</S.ValueTitle>
                <S.Value>
                  {startDate === undefined
                    ? `날짜추가`
                    : `${startDate.getMonth() + 1}월 ${startDate.getDate()}일`}
                </S.Value>
              </S.CheckIn>
              <S.StayPeriodText>
                {startDate === undefined || endDate === undefined
                  ? ""
                  : `${getDateDiff(endDate, startDate)}박`}
              </S.StayPeriodText>
              <S.CheckOut>
                <S.ValueTitle>체크아웃</S.ValueTitle>
                <S.Value>
                  {endDate === undefined
                    ? `날짜추가`
                    : `${endDate.getMonth() + 1}월 ${endDate.getDate()}일`}
                </S.Value>
              </S.CheckOut>
            </S.CheckInOutContainer>
            <S.PersonIcon />
            <S.GuestInfoContainer
              onClick={() => {
                setShowCountModal(!showCountModal);
                setShowCalendarModal(false);
              }}
            >
              {isCountModalClicked()}
              <S.GuestInfo>
                <S.ValueTitle>인원</S.ValueTitle>
                <S.Value>{countValueString}</S.Value>
              </S.GuestInfo>
            </S.GuestInfoContainer>
            <S.SearchIconContainer onClick={searchHotelData}>
              <IoSearch />
            </S.SearchIconContainer>
          </S.SearchBarContainer>
        )}
      </SearchBarPositioner>

      <Outlet />
    </Main>
  );
};

export default SearchBar;

const SearchBarPositioner = styled.div`
  width: 0;
  height: 0;
  position: relative;
`;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDateDiff } from "../../utils/dateUtils";
import useLocalStorage from "../../hooks/useLocalStorage";
import useHeadCount from "../../hooks/useHeadCount";
import useStayPeriod from "../../hooks/useStayPeriod";
import { IoSearch } from "react-icons/io5"; //TODO 이것도 다른 것 처럼 아이콘째로 export하게 바꾸기
import * as S from "../../styles/SearchBar.style";
import { LocalStorageType } from "../../types";
import { dateToStringYYYYMMDD } from "../../utils/dateUtils";

type Props = {
  currentChoice: LocalStorageType;
  setCurrentChoice: React.Dispatch<React.SetStateAction<LocalStorageType>>;
};

const SearchBar = (props: Props) => {
  const { currentChoice, setCurrentChoice } = props;
  const location = useLocation().pathname;
  const today = new Date();
  const navigate = useNavigate();
  const { savePeriodInStorage, saveCountInStorage } = useLocalStorage();

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
    isCountModalClicked,
  } = useHeadCount();

  React.useEffect(() => {
    if (currentChoice.stayPeriod.checkIn.length > 0)
      setStartDate(new Date(currentChoice.stayPeriod.checkIn));
    if (currentChoice.stayPeriod.checkOut.length > 0)
      setEndDate(new Date(currentChoice.stayPeriod.checkOut));
    setCount(currentChoice.headCount);
  }, [currentChoice, setCount, setEndDate, setStartDate]);

  const searchHotelData = () => {
    setShowCalendarModal(false);
    setShowCountModal(false);
    saveCountInStorage(count);
    if (startDate !== undefined && endDate !== undefined) {
      savePeriodInStorage(startDate, endDate);
      setCurrentChoice({
        ...currentChoice,
        stayPeriod: {
          ...currentChoice.stayPeriod,
          checkIn: dateToStringYYYYMMDD(startDate),
          checkOut: dateToStringYYYYMMDD(endDate),
        },
        headCount: {
          ...currentChoice.headCount,
          adult: count.adult,
          child: count.child,
        },
      });
    }
    navigate("/hotel");
  };

  return (
    <>
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
              <S.Value>{`성인 ${count.adult} / 아이 ${count.child}`}</S.Value>
            </S.GuestInfo>
          </S.GuestInfoContainer>
          <S.SearchIconContainer onClick={searchHotelData}>
            <IoSearch />
          </S.SearchIconContainer>
        </S.SearchBarContainer>
      )}
    </>
  );
};

export default SearchBar;

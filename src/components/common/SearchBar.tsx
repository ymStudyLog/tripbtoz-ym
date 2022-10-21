import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { VscCalendar } from "react-icons/vsc";
import { IoPersonOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import CalendarModal from "../modal/CalendarModal";
import CountModal from "../modal/CountModal";
import {
  addDate,
  convertDateToString,
  getDateDiff,
} from "../../utils/dateUtils";
import useLocalStorage from "../../hooks/useLocalStorage";

type Props = {
  endpoint: string;
};

const SearchBar = (props: Props) => {
  const { endpoint } = props; 
  const navigate = useNavigate();

  //TODO 캘린더 관련 -> 커스텀 hook으로
  const today = new Date(convertDateToString(new Date())); //오늘 날짜 -> 구지 이렇게 하는 이유가,,,?
  const [initialMonthDate, setInitialMonthDate] = React.useState(
    new Date(convertDateToString(new Date()))
  );
  const [checkIn, setCheckIn] = React.useState<Date | undefined>(
    addDate(today, 7)
  );
  const [checkOut, setCheckOut] = React.useState<Date | undefined>(
    addDate(today, 8)
  );
  const [showCalendarModal, setShowCalendarModal] =
    React.useState<boolean>(false);

  //TODO 인원수 관련 -> 커스텀 hook으로
  const [showCountModal, setShowCountModal] = React.useState<boolean>(false);
  const [adult, setAdult] = React.useState<number>(2);
  const [child, setChild] = React.useState<number>(0);

  const { setStayPeriodInStorage, setHeadCountInStorage } = useLocalStorage();

  const searchHotelData = () => {
    setShowCalendarModal(false);
    setShowCountModal(false);
    checkIn !== undefined &&
      checkOut !== undefined &&
      setStayPeriodInStorage(
        `${checkIn?.getFullYear()}. ${
          checkIn?.getMonth() + 1
        }. ${checkIn?.getDate()}.`,
        `${checkOut?.getFullYear()}. ${
          checkOut?.getMonth() + 1
        }. ${checkOut?.getDate()}.`
      );
    setHeadCountInStorage(adult, child);
    navigate("/hotel");
  };

  return (
    <SearchBarContainer endpoint={endpoint}>
      <IconContainer>
        <VscCalendar />
      </IconContainer>
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
        <CheckIn>
          <ItemTitle>체크인</ItemTitle>
          <Item>
            {checkIn
              ? `${checkIn.getMonth() + 1}월 ${checkIn.getDate()}일`
              : "날짜추가"}
          </Item>
        </CheckIn>

        <StayPeriodText>
          {checkIn && checkOut ? `${getDateDiff(checkOut, checkIn)}박` : ""}
        </StayPeriodText>

        <CheckOut>
          <ItemTitle>체크아웃</ItemTitle>
          <Item>
            {checkOut
              ? `${checkOut.getMonth() + 1}월 ${checkOut.getDate()}일`
              : "날짜추가"}
          </Item>
        </CheckOut>
      </CheckInOutContainer>

      <IconContainer>
        <IoPersonOutline />
      </IconContainer>

      <GuestInfoContainer
        onClick={() => {
          setShowCountModal(!showCountModal);
          setShowCalendarModal(false);
        }}
      >
        {showCountModal && (
          <CountModal
            initialChild={child}
            initialAdult={adult}
            setShowCountModal={setShowCountModal}
            handleChangeNumberOfPeople={(
              srcAdult: number,
              srcChild: number
            ) => {
              setAdult(srcAdult);
              setChild(srcChild);
            }}
          />
        )}
        <GuestInfo>
          <ItemTitle>인원</ItemTitle>
          <Item>{`성인 ${adult} / 아이 ${child}`}</Item>
        </GuestInfo>
      </GuestInfoContainer>
      <SearchIconContainer onClick={searchHotelData}>
        <IoSearch />
      </SearchIconContainer>
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div<{ endpoint: string }>`
  position: absolute;
  top: ${(props) => (props.endpoint === "/" ? "200px" : 0)};
  width: 800px;
  height: 60px;
  background-color: var(--color-white);
  border: 1.5px solid var(--color-border);
  display: flex;

  @media screen and (max-width: 480px) {
    width: 480px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 100%;
  font-size: 28px;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const CheckInOutContainer = styled.div`
  display: flex;
  width: 320px;
  margin-left: 0 24px;
  border-right: 1.5px solid var(--color-border);
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: var(--color-hover);
  }

  @media screen and (max-width: 480px) {
    width: 240px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

//TODO 너비 조정
const CheckInOut = styled(StyledDiv)`
  width: 144px;
`;

const CheckIn = styled(CheckInOut)`
  align-items: flex-start;
  padding-left: 16px;
`;

const CheckOut = styled(CheckInOut)`
  align-items: flex-end;
  padding-right: 16px;
`;

//TODO 너비 조정
const GuestInfo = styled(StyledDiv)`
  align-items: flex-start;
  width: 320px;
  padding-left: 16px;

  @media screen and (max-width: 480px) {
    width: 180px;
  }
`;

const ItemTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-subTitle);
`;

const Item = styled.div`
  font-size: 17.6px;
  font-weight: 700;
  margin-top: 8px;
`;

//TODO span으로 바꿔서 반응형시 옮기기?
const StayPeriodText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  color: var(--color-subTitle);
`;

const GuestInfoContainer = styled.div`
  display: flex;
  width: 272px;
  margin-left: 0 24px;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: var(--color-hover);
  }

  @media screen and (max-width: 480px) {
    width: 240px;
  }
`;

const SearchIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  font-size: 35px;
  background-color: var(--color-main);
  color: var(--color-white);
  cursor: pointer;

  @media screen and (max-width: 480px) {
    width: 80px;
    font-size: 30px;
  }
`;

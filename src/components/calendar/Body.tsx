import React, { useEffect } from "react";
import styled from "styled-components";
import Dates from "./Dates";

type Props = {
  today: Date;
  month: number;
  year: number;
  handleClickDate: (date: Date) => void;
  checkInDate?: Date;
  checkOutDate?: Date;
};

const Body = ({
  today,
  month,
  year,
  handleClickDate,
  checkInDate,
  checkOutDate,
}: Props) => {
  const [totalDate, setTotalDate] = React.useState<number[]>([]);
  const currentMonthFirstDate = totalDate.indexOf(1);

  const nextMonthFirstDate = totalDate.indexOf(1, 7);
  const findToday = totalDate.indexOf(today.getDate());
  const currentMonth = new Date().getMonth() + 1;

  const changeDate = (month: number): number[] => {
    // 이전날짜
    let PreviousLastDate = new Date(year, month - 1, 0).getDate();
    let PreviousLastDay = new Date(year, month - 1, 0).getDay();
    //다음 날짜
    const NextDate = new Date(year, month, 0).getDate();
    const NextDay = new Date(year, month, 0).getDay();

    //이전날짜 생성
    let PVLD = [];
    //6==토요일 즉, 토요일이 아니면,
    //이전달의 마지막 요일
    // console.log(PreviousLastDay + 1);
    if (PreviousLastDay !== 6) {
      for (let i = 0; i < PreviousLastDay + 1; i++) {
        //unshift() 메서드는 새로운 요소를 배열의 맨 앞쪽에 추가하고, 새로운 길이를 반환합니다.
        PVLD.unshift(PreviousLastDate - i);
      }
    }
    //다음 요일 생성
    let TLD = [];
    for (let i = 1; i < 7 - NextDay; i++) {
      if (i === 0) {
        return TLD;
      }
      TLD.push(i);
    }
    //현재 날짜
    let TD = Array.from(Array.from(Array(NextDate + 1)).keys()).slice(1);
    // console.log(PVLD.concat(TD, TLD));
    //PVLD = 이전달의 남은날짜 + 이번달의 날짜 + 다음달의 올 날짜
    return PVLD.concat(TD, TLD);
  };

  useEffect(() => {
    setTotalDate(changeDate(month));
  }, [month]);
  const DAY = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <Container>
      <BodyContentContainer>
        <HeadTextContainer>
          <HeadText>
            {year}년 {month}월
          </HeadText>
        </HeadTextContainer>

        <Days>
          {DAY.map((elm, idx) => {
            return <div key={idx}>{elm}</div>;
          })}
        </Days>
        <DatesContainer>
          {totalDate.map((date, index) => (
            <Dates
              key={index}
              index={index}
              currentMonthFirstDate={currentMonthFirstDate}
              nextMonthFirstDate={nextMonthFirstDate}
              findToday={findToday === index && month === currentMonth}
              year={year}
              month={month}
              date={date}
              handleClickDate={handleClickDate}
            ></Dates>
          ))}
        </DatesContainer>
      </BodyContentContainer>
    </Container>
  );
};

export default Body;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const HeadTextContainer = styled.div`
  display: flex;
  width: 100%;
  height: 5vh;
  margin: 1rem 0;
  position: relative;
`;

const HeadText = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const BodyContentContainer = styled.div`

  margin: 30px;
  height: 100vh;
`;

const Days = styled.div`
  display: flex;
  color: #969696;
  width: 100%;
  height: 2rem;
  justify-content: space-around;
  align-items: center;
`;

const DatesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  /* row-gap: 100px; */
  width: 100%;
  /* box-sizing: border-box; */
`;

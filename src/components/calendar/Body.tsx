import React, { useEffect } from "react";
import styled from "styled-components";
import { addMonthDate } from "../../utils/dateUtils";
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
  const [totalDate, setTotalDate] = React.useState<Date[]>([]);
  const currentMonthFirstDate = totalDate.indexOf(
    new Date(`${year}-${month}-1`)
  );

  const nextMonthDate = addMonthDate(new Date(`${year}-${month}`), 1);
  const nextMonthFirstDate = totalDate.indexOf(nextMonthDate);

  const changeDate = (month: number): Date[] => {
    // 이전날짜
    let PreviousLastDate = new Date(year, month - 1, 0).getDate();
    let PreviousLastDay = new Date(year, month - 1, 0).getDay();
    //다음 날짜
    const NextDate = new Date(year, month, 0).getDate();
    const NextDay = new Date(year, month, 0).getDay();

    //이전날짜 생성
    let PVLD: Date[] = [];
    //6==토요일 즉, 토요일이 아니면,
    //이전달의 마지막 요일
    // console.log(PreviousLastDay + 1);
    const prevMonthDate = addMonthDate(new Date(`${year}-${month}`), -1);
    if (PreviousLastDay !== 6) {
      for (let i = 0; i < PreviousLastDay + 1; i++) {
        //unshift() 메서드는 새로운 요소를 배열의 맨 앞쪽에 추가하고, 새로운 길이를 반환합니다.
        PVLD.unshift(
          new Date(
            `${prevMonthDate.getFullYear()}-${prevMonthDate.getMonth()}-${
              PreviousLastDate - i
            }`
          )
        );
      }
    }
    //다음 요일 생성
    let TLD: Date[] = [];
    const nextMonthDate = addMonthDate(new Date(`${year}-${month}`), 1);
    for (let i = 1; i < 7 - NextDay; i++) {
      TLD.push(
        new Date(
          `${nextMonthDate.getFullYear()}-${nextMonthDate.getMonth()+1}-${i}`
        )
      );
    }
    //현재 날짜
    let TD: Date[] = Array.from(Array.from(Array(NextDate + 1)).keys())
      .slice(1)
      .map((date) => new Date(`${year}-${month}-${date}`));
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
              year={date.getFullYear()}
              month={date.getMonth() + 1}
              date={date.getDate()}
              handleClickDate={handleClickDate}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              today={today}
            ></Dates>
            //checkIn checkOut인 경우에 하이라이팅 해보기
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

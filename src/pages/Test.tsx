import React from "react";
import styled from "styled-components";
import { getHotelInformation, patchReservationDetail } from "../api/api";
import { BasicHotelDataType, GetDataResultType } from "../types/hotelDataType";
import useLocalStorage from "../hooks/useLocalStorage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { areIntervalsOverlapping } from "date-fns";
import Loading from "../components/Loading";

type Props = {};
const HOTELDATA_PER_PAGE = 10;

const Test = (props: Props) => {
  const { stayPeriod, headCount, setReservationInStorage } = useLocalStorage();

  //무한스크롤 직접 구현 예정
  const [wholeData, setWholeData] = React.useState<GetDataResultType>([]);
  const [pageStack, setPageStack] = React.useState<BasicHotelDataType[]>([]);

  const { data, isLoading, isError } = useQuery<GetDataResultType>(
    ["getWholeHotelData"],
    () => getHotelInformation<BasicHotelDataType[]>(""),
  );

  React.useEffect(()=>{
    if(data !== undefined){
      //1차 인원수로 필터링
      const headFilter = data.filter(
        (hotel) =>
          hotel.occupancy.base <= headCount &&
          hotel.occupancy.max >= headCount
      );
      //2차 기간으로 필터링 -> overlapp = true가 겹치는거라 걸러져야됨. false인 것들만 모아서 보여주기
      const periodFilter = headFilter.filter((hotel) =>
        hotel.reservationDetail
          ? !areIntervalsOverlapping(
              {
                start: new Date(stayPeriod.checkIn),
                end: new Date(stayPeriod.checkOut),
              },
              {
                start: new Date(hotel.reservationDetail.checkIn),
                end: new Date(hotel.reservationDetail.checkOut),
              }
            )
            ? hotel
            : null
          : hotel
      );
      setWholeData(periodFilter);
      setPageStack(periodFilter.slice(0,HOTELDATA_PER_PAGE));
    }
  },[data, headCount, stayPeriod]);

  if(isLoading){
    return <Loading />;
  }

  if(isError) {
    return <p>에러 발생</p>;
  }

  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem("reservedHotels");
        }}
      >
        로컬스토리지 초기화
      </button>
      <div>
        {pageStack.map((eachHotelData: BasicHotelDataType, index: number) => {
          return (
            <TempContainer key={index}>
              <TempHotelItem>
                <p>id: {eachHotelData.id}</p>
                <p>호텔명 : {eachHotelData.hotel_name}</p>
                <p>
                  투숙인원 : {eachHotelData.occupancy.base}~
                  {eachHotelData.occupancy.max}명
                </p>
              </TempHotelItem>
              <TempButton
                type="button"
                onClick={() => {
                  setReservationInStorage(
                    eachHotelData.id,
                    eachHotelData.hotel_name
                  );
                  patchReservationDetail(eachHotelData.id, stayPeriod);
                }}
              >
                예약
              </TempButton>
            </TempContainer>
          );
        })}
      </div>
    </>
  );
};

export default Test;

//전부 삭제 예정
const TempContainer = styled.div`
  width: 400px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
`;

const TempHotelItem = styled.div`
  width: 300px;
  height: 80px;
  border: 1px solid blue;
`;

const TempButton = styled.button`
  width: 50px;
  height: 30px;
`;

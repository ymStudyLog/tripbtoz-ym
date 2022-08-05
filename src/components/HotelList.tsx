import React from 'react';
import styled from 'styled-components';
import { addReservationData } from '../api/api';
import useLocalStorage from '../hooks/useLocalStorage';
import { BasicHotelDataType, GetDataResultType } from '../types/hotelDataType';
import Loading from './common/Loading';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

type EachInfinitePageType = {
  result: GetDataResultType;
  nextPage: number | undefined;
  isLast: boolean;
};

const HotelList = () => {
  const { stayPeriod, headCount, setReservationInStorage } = useLocalStorage();
  const { isLoading, hasNextPage, data, isFetchingNextPage, ObservationBox } = useInfiniteScroll();

  //if (isLoading) return <Loading />; //TODO isLoading일때랑 아닐때 랑 구분해서 return하기 지금 전혀 구분 안되는중

  return (
    <>
      {data?.pages.map((page: EachInfinitePageType, index: number) => (
        <TempHotelItemContainer key={index}>
          {page?.result?.map((eachHotelData: BasicHotelDataType, index: number) => {
            return (
              <TempHotelItem key={index}>
                <TempHotelDetail>
                  <p>id: {eachHotelData.id}</p>
                  <p>호텔명 : {eachHotelData.hotel_name}</p>
                  <p>
                    투숙인원 : {eachHotelData.occupancy.base}~{eachHotelData.occupancy.max}명
                  </p>
                </TempHotelDetail>
                <TempMakeReservationButton
                  type='button'
                  onClick={() => {
                    setReservationInStorage(eachHotelData.id, eachHotelData.hotel_name);
                    addReservationData({
                      hotel_id: eachHotelData.id,
                      hotel_name: eachHotelData.hotel_name,
                      headCount: headCount,
                      reservationDetail: stayPeriod,
                    });
                  }}
                >
                  예약
                </TempMakeReservationButton>
              </TempHotelItem>
            );
          })}
        </TempHotelItemContainer>
      ))}
      {hasNextPage ? <Loading /> : null}
      {!isFetchingNextPage && <ObservationBox />}
    </>
  );
};

export default HotelList;

const TempHotelItemContainer = styled.div`
  margin-top: 40px;
  width: 800px;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TempHotelItem = styled.div`
  width: 400px;
  height: 200px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
`;

const TempHotelDetail = styled.div`
  width: 300px;
  height: 80px;
  border: 1px solid blue;
`;

const TempMakeReservationButton = styled.button`
  width: 50px;
  height: 30px;
`;

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

  // "image" : src에 이미지 전달하기
  return (
    <>
      {data?.pages.map((page: EachInfinitePageType, index: number) => (
        <HotelItemContainer key={index}>
          {page?.result?.map((eachHotelData: BasicHotelDataType, index: number) => {
            return (
              <HotelItem key={index}>
                <HotelDetail>
                  <div>
                    <p>호텔명 : {eachHotelData.hotel_name}</p>
                    <p>id: {eachHotelData.id}</p>
                    <p>
                      투숙인원 : {eachHotelData.occupancy.base}~{eachHotelData.occupancy.max}명
                    </p>
                    <p>{eachHotelData.star.toFixed(1)}성급</p>
                    <p>{eachHotelData.address}</p>
                    <p>{eachHotelData.price.toLocaleString('ko-KR')}원</p>
                    <p>총 {eachHotelData.review.toLocaleString('ko-KR')}건의 리뷰</p>
                    <p>grade : {eachHotelData.grade} 나중에 시간되면 rating 구현하기</p>
                  </div>
                </HotelDetail>
                <MakeReservationButton
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
                </MakeReservationButton>
              </HotelItem>
            );
          })}
        </HotelItemContainer>
      ))}
      {hasNextPage ? <Loading /> : null}
      {!isFetchingNextPage && <ObservationBox />}
    </>
  );
};

export default HotelList;

const HotelItemContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HotelItem = styled.div`
  width: 500px;
  height: 280px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
`;

const HotelDetail = styled.div`
  width: 300px;
  height: 150px;
  border: 1px solid blue;
`;

const MakeReservationButton = styled.button`
  width: 50px;
  height: 30px;
`;

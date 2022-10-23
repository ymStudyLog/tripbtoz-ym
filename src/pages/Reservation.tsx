import React from "react";
import styled from "styled-components";
import useReactQuery from "../hooks/useReactQuery";
import { ReservationDataType } from "../types";
import { HotelItemContainer } from "../styles/HotelItem.style";
import { v4 as uuidv4 } from "uuid";

const Reservation = () => {
  const { reservations } = useReactQuery();

  return (
    <ReservationContainer>
      <Title>예약 내역</Title>
      {reservations?.map((reservation: ReservationDataType) => {
        return (
          <ReservationItemContainer key={uuidv4()}>
            <Content>호텔명 : {reservation.hotel_name}</Content>
            <Content>
              투숙인원 성인 : {reservation.headCount.adult}, 아이 :{" "}
              {reservation.headCount.child}
            </Content>
            <Content>
              투숙일자 : {reservation.reservationDetail.checkIn} ~
              {reservation.reservationDetail.checkOut}
            </Content>
          </ReservationItemContainer>
        );
      })}
    </ReservationContainer>
  );
};

export default Reservation;

const ReservationContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
`;

const ReservationItemContainer = styled(HotelItemContainer)`
  height: auto;
  padding: 15px 8px;
  font-size: 18px;
  flex-direction: column;
`;

const Title = styled.h1`
  border: none;
  height: auto;
  margin: 1rem 0;
  font-size: 30px;
  font-weight: bold;
  background-color: transparent;
`;

const Content = styled.p`
  margin: 5px 0;
`;

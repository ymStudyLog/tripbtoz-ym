import React from "react";
import styled from "styled-components";
import useDatabase from "../hooks/useDatabase";
import { ReservationDataType } from "../types/hotelDataType";
import { ReservationContainer } from "../styles/Hotel.style";
import { HotelItemContainer } from "../styles/HotelItem.style";
import { v4 as uuidv4 } from "uuid";

const Reservation = () => {
  const { reservations } = useDatabase();

  return (
    <ReservationPageContainer>
      <Title>
      <h1>예약 내역</h1>
      </Title>
      {reservations?.map((reservation: ReservationDataType) => {
        return (
          <ReservationItemContainer key={uuidv4()}>
            <Content>호텔명 : {reservation.hotel_name}</Content>
            <Content>투숙인원 : {reservation.headCount}</Content>
            <Content>
              투숙일자 : {reservation.reservationDetail.checkIn} ~
              {reservation.reservationDetail.checkOut}
            </Content>
          </ReservationItemContainer>
        );
      })}
    </ReservationPageContainer>
  );
};

export default Reservation;

const ReservationPageContainer = styled(ReservationContainer)`
`;

const ReservationItemContainer = styled(HotelItemContainer)`
  height: auto;
  padding: 15px 4px;
  flex-direction: column;
`;

const Title = styled(HotelItemContainer)`
  border: none;
  height: auto;
  flex-direction: column;
  font-size: 30px;
`;

const Content = styled.p`
  margin: 5px 0;
`;
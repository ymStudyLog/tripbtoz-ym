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
      {reservations?.map((reservation: ReservationDataType) => {
        return (
          <ReservationItemContainer key={uuidv4()}>
            <p>호텔명 : {reservation.hotel_name}</p>
            <p>투숙인원 : {reservation.headCount}</p>
            <p>
              투숙일자 : {reservation.reservationDetail.checkIn} ~
              {reservation.reservationDetail.checkOut}
            </p>
          </ReservationItemContainer>
        );
      })}
    </ReservationPageContainer>
  );
};

export default Reservation;

const ReservationPageContainer = styled(ReservationContainer)``;

const ReservationItemContainer = styled(HotelItemContainer)`
  flex-direction: column;
`;

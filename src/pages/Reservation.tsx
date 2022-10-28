import styled from "styled-components";
import useReactQuery from "../hooks/useReactQuery";
import { ReservationType } from "../types";
import {
  HotelItemContainer,
  MakeReservationButton,
} from "../styles/HotelItem.style";
import { deleteReservation } from "../api/api";
import { v4 as uuidv4 } from "uuid";

const Reservation = () => {
  const { reservations } = useReactQuery();

  return (
    <ReservationContainer>
      <Title>예약 내역</Title>
      {reservations?.map((reservation: ReservationType) => {
        return (
          <ReservationItemContainer key={uuidv4()}>
            <ReservationItem>
              <Content>호텔명 : {reservation.hotel_name}</Content>
              <Content>
                투숙인원 성인 : {reservation.headCount.adult}, 아이 :{" "}
                {reservation.headCount.child}
              </Content>
              <Content>
                투숙일자 : {reservation.reservationDetail.checkIn} ~
                {reservation.reservationDetail.checkOut}
              </Content>
            </ReservationItem>
            <div>
              <CancelReservationButton
                onClick={() => {
                  reservation.id !== undefined && deleteReservation(reservation.id);
                }}
              >
                <span>예약취소</span>
              </CancelReservationButton>
            </div>
          </ReservationItemContainer>
        );
      })}
    </ReservationContainer>
  );
};

export default Reservation;

const ReservationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 2rem;
`;

const Title = styled.h1`
  border: none;
  height: auto;
  margin: 1rem 0;
  font-size: 30px;
  font-weight: bold;
  background-color: transparent;
`;

const ReservationItemContainer = styled(HotelItemContainer)`
  height: auto;
  padding: 15px 8px;
  font-size: 18px;
  justify-content: space-between;
`;

const ReservationItem = styled.div`
  width: 80%;
`;

const Content = styled.p`
  margin: 5px;
  padding: 0 5px;
`;

const CancelReservationButton = styled(MakeReservationButton)`
  margin: 0;
  display: flex;
  justify-content: center;
`;

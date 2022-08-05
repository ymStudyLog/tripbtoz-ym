import React from "react";
import styled from "styled-components";
import SearchBar from "../components/common/SearchBar";
import HotelList from "../components/hotelList/HotelList";
import useLocalStorage from '../hooks/useLocalStorage';
import useFilter from '../hooks/useFilter';
import useDatabase from '../hooks/useDatabase';

const Reservation = () => {
  const { reservations } = useDatabase();
  const { stayPeriod, headCount, getStorage } = useLocalStorage();
  const { filterByHeadCount, filterByStayPeriod } = useFilter();

  const periodData = localStorage.getItem("stayPeriod");
  const headData = localStorage.getItem("headCount");

  React.useEffect(() => {
    if (periodData !== null && headData !== null) {
      getStorage(periodData, headData);
    }
  }, [periodData, headData, getStorage]);

  React.useEffect(() => {
    filterByHeadCount(headCount);
    filterByStayPeriod(reservations, stayPeriod);
  }, [
    headCount,
    reservations,
    stayPeriod,
    filterByHeadCount,
    filterByStayPeriod,
  ]);

  return (
    <>
      <ReservationContainer>
        <SearchBar />
        <HotelList />
      </ReservationContainer>
    </>
  );
};

export default Reservation;

const ReservationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

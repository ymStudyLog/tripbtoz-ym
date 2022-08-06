import React from "react";
import SearchBar from "../components/common/SearchBar";
import HotelList from "../components/hotelList/HotelList";
import { ReservationContainer } from "../styles/Hotel.style";
import { saveLocalStorageData } from "../api/api";
import useFilter from "../hooks/useFilter";
import useDatabase from "../hooks/useDatabase";
import { StayPeriodType, NumberOfPeopleType } from "../types/localStorageType";
import { QueryType } from "../types/queryType";

type LocalStorageType = string | null;

const Hotel = () => {
  React.useEffect(() => {
    const periodData: LocalStorageType = localStorage.getItem("stayPeriod");
    const numberOfPeopleData: LocalStorageType =
      localStorage.getItem("headCount");

    if (periodData !== null && numberOfPeopleData !== null) {
      saveLocalStorageData({
        stayPeriod: JSON.parse(periodData),
        headCount: JSON.parse(numberOfPeopleData),
      });
    }
  }, []);

  const { localStorageData } = useDatabase();
  const { filterByHeadCount, filterByStayPeriod } = useFilter();

  React.useEffect(() => {
    if (localStorageData !== undefined) {
      filterByStayPeriod(
        localStorageData.stayPeriod,
        localStorageData.headCount,
        filterByHeadCount
      );
    }
  }, [filterByStayPeriod, filterByHeadCount, localStorageData]);

  return (
    <>
      <ReservationContainer>
        <SearchBar />
        <HotelList />
      </ReservationContainer>
    </>
  );
};

export default Hotel;

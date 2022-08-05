import React from "react";
import SearchBar from "../components/common/SearchBar";
import HotelList from "../components/hotelList/HotelList";
import useLocalStorage from "../hooks/useLocalStorage";
import useFilter from "../hooks/useFilter";
import useDatabase from "../hooks/useDatabase";
import { ReservationContainer } from "../styles/Hotel.style";
import { NumberOfPeopleType, StayPeriodType } from "../types/localStorageType";

const Hotel = () => {
  const { reservations } = useDatabase();
  const { stayPeriod, numberOfPeople, getStorage } = useLocalStorage();
  const { filterByHeadCount, filterByStayPeriod } = useFilter();

  const periodData = localStorage.getItem("stayPeriod");
  const numberOfPeopleData = localStorage.getItem("numberOfPeople");

  const parsedStayPeriod: StayPeriodType = periodData
    ? JSON.parse(periodData)
    : { checkIn: "", checkOut: "" };
  const parsedNumberOfPeopleData: NumberOfPeopleType = numberOfPeopleData
    ? JSON.parse(numberOfPeopleData)
    : { adult: 2, child: 0 };

  React.useEffect(() => {
    if (periodData !== null && numberOfPeopleData !== null) {
      getStorage(periodData, numberOfPeopleData);
    }
  }, [periodData, numberOfPeopleData, getStorage]);

  React.useEffect(() => {
    filterByHeadCount(numberOfPeople.adult + numberOfPeople.child);
    filterByStayPeriod(reservations, stayPeriod);
  }, [
    reservations,
    stayPeriod,
    filterByHeadCount,
    filterByStayPeriod,
    numberOfPeople.adult,
    numberOfPeople.child,
  ]);
  return (
    <>
      <ReservationContainer>
        <SearchBar
          initialAdult={parsedNumberOfPeopleData.adult}
          initialChild={parsedNumberOfPeopleData.child}
          initialCheckIn={new Date(parsedStayPeriod.checkIn)}
          initialCheckOut={new Date(parsedStayPeriod.checkOut)}
        />
        <HotelList />
      </ReservationContainer>
    </>
  );
};

export default Hotel;

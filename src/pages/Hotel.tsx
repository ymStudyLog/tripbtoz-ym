import React from "react";
import SearchBar from "../components/common/SearchBar";
import HotelList from "../components/hotelList/HotelList";
import MSearchBar from "../components/mobile/MSearchBar";
import { ReservationContainer } from "../styles/Hotel.style";
import { useMediaQuery } from "react-responsive";
import { saveLocalStorageData } from "../api/api";
import useFilter from "../hooks/useFilter";
import useDatabase from "../hooks/useDatabase";

type LocalStorageType = string | null;

const Hotel = () => {
  const isMobile = useMediaQuery({ maxWidth: 480 });

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

  React.useEffect(()=>{
    if (localStorageData !== undefined) {
      filterByStayPeriod(
        localStorageData.stayPeriod,
        localStorageData.headCount,
        filterByHeadCount
      );
    }
  },[filterByStayPeriod,filterByHeadCount,localStorageData]);

  return (
    <>
      {isMobile ? (
        <div>
          <MSearchBar />
          <HotelList />
        </div>
      ) : (
        <ReservationContainer>
          <SearchBar />
          <HotelList />
        </ReservationContainer>
      )}
    </>
  );
};

export default Hotel;

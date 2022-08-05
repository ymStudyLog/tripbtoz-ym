import React from "react";
import SearchBar from "../components/common/SearchBar";
import HotelList from "../components/hotelList/HotelList";
import useFilter from "../hooks/useFilter";
import { ReservationContainer } from "../styles/Hotel.style";
import { HeadCountType, StayPeriodType } from "../types/localStorageType";

type LocalStorageType = string|null;

const Hotel = () => {
  const stayPeriodRef = React.useRef<StayPeriodType>({
    checkIn: "",
    checkOut: "",
  });
  const headCountRef = React.useRef<HeadCountType>(0);
  const { filterByStayPeriod, filterByHeadCount } = useFilter();
  
  React.useEffect(() => {
    const tempStay : LocalStorageType = localStorage.getItem("stayPeriod");
    const tempHead : LocalStorageType = localStorage.getItem("headCount");
    if (tempStay !== null && tempHead !== null) {
      stayPeriodRef.current = JSON.parse(tempStay);
      headCountRef.current = parseInt(tempHead);
      filterByStayPeriod(stayPeriodRef.current)
      filterByHeadCount(headCountRef.current)
    }
  }, [filterByStayPeriod , filterByHeadCount]);
  
  return (
    <>
      <ReservationContainer>
        <SearchBar />
        <HotelList stayPeriod={stayPeriodRef.current} headCount={headCountRef.current}/>
      </ReservationContainer>
    </>
  );
};

export default Hotel;

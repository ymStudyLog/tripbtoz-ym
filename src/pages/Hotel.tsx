import React from "react";
import SearchBar from "../components/common/SearchBar";
import HotelList from "../components/hotelList/HotelList";
import useFilter from "../hooks/useFilter";
import MSearchBar from '../components/mobile/MSearchBar';
import { ReservationContainer } from "../styles/Hotel.style";
import { StayPeriodType, NumberOfPeopleType } from "../types/localStorageType";
import { QueryType } from "../types/queryType";
import { useMediaQuery } from 'react-responsive';

type LocalStorageType = string | null;

const Hotel = () => {
const isMobile = useMediaQuery({ maxWidth: 480 });
  const { filterByStayPeriod, filterByHeadCount, createFilteredQuery } =
    useFilter();
  const stayPeriodRef = React.useRef<StayPeriodType>({ 
    checkIn: "",
    checkOut: "",
  });
  const headCountRef = React.useRef<NumberOfPeopleType>({ 
    adult: 2,
    child: 0,
  });
  const queryRef = React.useRef<QueryType>("");


  React.useEffect(() => {
    const periodData : LocalStorageType = localStorage.getItem("stayPeriod");
    const numberOfPeopleData : LocalStorageType = localStorage.getItem("headCount");
    
    if (periodData !== null && numberOfPeopleData !== null) {
      stayPeriodRef.current = JSON.parse(periodData);
      headCountRef.current = JSON.parse(numberOfPeopleData);
      queryRef.current = createFilteredQuery(
        filterByStayPeriod(stayPeriodRef.current),
        filterByHeadCount(headCountRef.current)
      );
      console.log("hotel", queryRef.current); //TODO useInfiniteScroll에 전달해야됨
    }
  }, [filterByStayPeriod, filterByHeadCount, createFilteredQuery]);


  
  return (
    <>
      {isMobile ? (
        <div>
          <MSearchBar />
          <HotelList
          stayPeriod={stayPeriodRef.current}
          headCount={headCountRef.current}
        />
        </div>
      ) : (
        <ReservationContainer>
          <SearchBar />
          <HotelList
          stayPeriod={stayPeriodRef.current}
          headCount={headCountRef.current}
        />
        </ReservationContainer>
      )}

    </>
  );
};

export default Hotel;

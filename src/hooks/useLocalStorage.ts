import React from "react";
import {
  StayPeriodType,
  HeadCountType,
  ReservedHotelsType,
} from "../types/localStorageType";

const useLocalStorage = () => {
  const [stayPeriod, setStayPeriod] = React.useState<StayPeriodType>({
    checkIn: "",
    checkOut: "",
  });
  const [headCount, setHeadCount] = React.useState<HeadCountType>(0);

  React.useEffect(() => {
    const periodData = localStorage.getItem("stayPeriod");
    const headData = localStorage.getItem("headCount");
    if (periodData !== null && headData !== null) {
      const parsedPeriodData = JSON.parse(periodData);
      const parsedHeadData = parseInt(headData);
      setStayPeriod((prevState: StayPeriodType) => {
        return {
          ...prevState,
          checkIn: parsedPeriodData.checkIn,
          checkOut: parsedPeriodData.checkOut,
        };
      });
      setHeadCount(parsedHeadData);
    }
  }, []);

  const setReservationInStorage = (id: number, hotelName: string) => {
    const prevStorageState = localStorage.getItem("reservedHotels");
    const newStorageState = [
      {
        _id: id,
        hotel_name: hotelName,
        headCount: headCount,
        reservationDetail: {
          checkIn: stayPeriod.checkIn,
          checkOut: stayPeriod.checkOut,
        },
      },
    ];
    if (prevStorageState !== null) {
      const parsedPrevState: ReservedHotelsType[] =
        JSON.parse(prevStorageState);
      localStorage.setItem(
        "reservedHotels",
        JSON.stringify(parsedPrevState.concat(newStorageState))
      );
    } else {
      localStorage.setItem("reservedHotels", JSON.stringify(newStorageState));
    }
  };

  return {
    stayPeriod,
    headCount,
    setReservationInStorage,
  };
};

export default useLocalStorage;

import React from "react";
import { StayPeriodType, HeadCountType } from "../types/localStorageType";
import { ReservationDataType } from "../types/hotelDataType";

const useLocalStorage = () => {
  const [stayPeriod, setStayPeriod] = React.useState<StayPeriodType>({
    checkIn: "",
    checkOut: "",
  });
  const [headCount, setHeadCount] = React.useState<HeadCountType>(0);

  //TODO 일반 함수로 바꾸고 다른 곳에서 import 해서 useEffect로 감싸기
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

  const setStayPeriodInStorage = (startDate: string, endDate: string) => {
    localStorage.setItem(
      'stayPeriod',
      JSON.stringify({
        checkIn: startDate,
        checkOut: endDate,
      })
    );
  };

  const setHeadCountInStorage = (count: number) => {
    localStorage.setItem('headCount', count.toString());
  }

  const setReservationInStorage = (id: number, hotelName: string) => {
    const prevStorageState = localStorage.getItem("reservationData");
    const newStorageState = [
      {
        hotel_id: id,
        hotel_name: hotelName,
        headCount: headCount,
        reservationDetail: {
          checkIn: stayPeriod.checkIn,
          checkOut: stayPeriod.checkOut,
        },
      },
    ];
    if (prevStorageState !== null) {
      const parsedPrevState: ReservationDataType[] =
        JSON.parse(prevStorageState);
      localStorage.setItem(
        "reservationData",
        JSON.stringify(parsedPrevState.concat(newStorageState))
      );
    } else {
      localStorage.setItem("reservationData", JSON.stringify(newStorageState));
    }
  };

  return {
    stayPeriod,
    headCount,
    setStayPeriodInStorage,
    setHeadCountInStorage,
    setReservationInStorage,
  };
};

export default useLocalStorage;

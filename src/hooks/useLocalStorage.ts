import React from "react";
import { StayPeriodType, NumberOfPeopleType } from "../types/localStorageType";
import { ReservationDataType } from "../types/hotelDataType";

const useLocalStorage = () => {
  const [stayPeriod, setStayPeriod] = React.useState<StayPeriodType>({
    checkIn: "",
    checkOut: "",
  });
  const [numberOfPeople, setNumberOfPeople] =
    React.useState<NumberOfPeopleType>({
      adult: 0,
      child: 0,
    });

  const getStorage = React.useCallback(
    (periodData: string, numberOfPeopleData: string) => {
      const parsedPeriodData = JSON.parse(periodData);
      const parsedNumberOfPeopleData = JSON.parse(numberOfPeopleData);
      setStayPeriod((prevState: StayPeriodType) => {
        return {
          ...prevState,
          checkIn: parsedPeriodData.checkIn,
          checkOut: parsedPeriodData.checkOut,
        };
      });
      setNumberOfPeople((numberOfPeople: NumberOfPeopleType) => {
        return {
          ...numberOfPeople,
          adult: parsedNumberOfPeopleData.adult,
          child: parsedNumberOfPeopleData.child,
        };
      });
    },
    []
  );

  const setStayPeriodInStorage = (startDate: string, endDate: string) => {
    localStorage.setItem(
      "stayPeriod",
      JSON.stringify({
        checkIn: startDate,
        checkOut: endDate,
      })
    );
  };
  const setNumberOfPeopleInStorage = (adult: number, child: number) => {
    localStorage.setItem(
      "numberOfPeople",
      JSON.stringify({
        adult: adult,
        child: child,
      })
    );
  };

 
  const setReservationInStorage = (id: number, hotelName: string) => {
    const prevStorageState = localStorage.getItem("reservationData");
    const newStorageState = [
      {
        hotel_id: id,
        hotel_name: hotelName,
        headCount: numberOfPeople.adult + numberOfPeople.child,
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
    numberOfPeople,
    getStorage,
    setStayPeriodInStorage,
    setNumberOfPeopleInStorage,
    setReservationInStorage,
  };
};

export default useLocalStorage;

import React from "react";
import { saveLocalStorageData } from "../api/api";
import { convertDateToString } from "../utils/dateUtils";
import { ReservationDataType, StayPeriodType, HeadCountType } from "../types";

const useLocalStorage = () => {
  //TODO type 설정하기
  const [previousPeriod, setPreviousPeriod] = React.useState<any>({
    checkIn: null,
    checkOut: null,
  });
  const [previousHead, setPreviousHead] = React.useState<any>({
    adult: null,
    child: null,
  });

  const parseLocalStorage = React.useCallback(
    (periodObj: string, headObj: string) => {
      const parserPeriod = JSON.parse(periodObj);
      const convertToDateObj = {
        checkIn: new Date(parserPeriod.checkIn),
        checkOut: new Date(parserPeriod.checkOut),
      };
      setPreviousPeriod(convertToDateObj);
      setPreviousHead(JSON.parse(headObj));
    },
    []
  );

  const setStayPeriodInStorage = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    const formattedPeriod: StayPeriodType = {
      checkIn: startDate === null ? "" : convertDateToString(startDate),
      checkOut: endDate === null ? "" : convertDateToString(endDate),
    };
    localStorage.setItem("stayPeriod", JSON.stringify(formattedPeriod));
    saveLocalStorageData("stayPeriod", { stayPeriod: formattedPeriod });
  };

  const setHeadCountInStorage = (headCountData: HeadCountType) => {
    localStorage.setItem("headCount", JSON.stringify(headCountData));
    saveLocalStorageData("headCount", { headCount: headCountData });
  };

  //TODO 이거는 어케 합쳐 말어?? => 예약을 취소하는 버튼도 구현해서 이거랑 합치기
  const setReservationInStorage = (
    id: number,
    hotelName: string,
    stayPeriod: StayPeriodType,
    headCount: HeadCountType
  ) => {
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
    prevStayPeriod: previousPeriod,
    prevHeadCount: previousHead,
    parseLocalStorage,
    setStayPeriodInStorage,
    setHeadCountInStorage,
    setReservationInStorage,
  };
};

export default useLocalStorage;

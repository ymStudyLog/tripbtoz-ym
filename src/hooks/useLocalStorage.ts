import React from "react";
import { convertDateToString } from "../utils/dateUtils";
import { StayPeriodType, HeadCountType } from "../types";

const useLocalStorage = () => {
  //TODO 이름 변경하기 currentPeriod 이런식으로 -> 각각의 set 함수도 반환하기(Searchbar에서 써야됨)
  const [previousPeriod, setPreviousPeriod] = React.useState<StayPeriodType<Date|null>>({
    checkIn: null,
    checkOut: null,
  });
  const [previousHead, setPreviousHead] = React.useState<HeadCountType<number|null>>({
    adult: null,
    child: null,
  });

  const parseLocalStorage = React.useCallback(
    (periodObj: string | null, headObj: string | null) => {
      if (typeof periodObj === "string" && typeof headObj === "string") {
        const parserPeriod = JSON.parse(periodObj);
        const convertToDateObj = {
          checkIn: new Date(parserPeriod.checkIn),
          checkOut: new Date(parserPeriod.checkOut),
        };
        setPreviousPeriod(convertToDateObj);
        setPreviousHead(JSON.parse(headObj));
      }
    },
    []
  );
  
  const setStayPeriodInStorage = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    const formattedPeriod: StayPeriodType<string> = {
      checkIn: startDate === null ? "" : convertDateToString(startDate),
      checkOut: endDate === null ? "" : convertDateToString(endDate),
    };
    localStorage.setItem("stayPeriod", JSON.stringify(formattedPeriod));
  };

  const setHeadCountInStorage = (headCountData: HeadCountType<number>) => {
    localStorage.setItem("headCount", JSON.stringify(headCountData));
  };

  return {
    prevStayPeriod: previousPeriod,
    prevHeadCount: previousHead,
    parseLocalStorage,
    setStayPeriodInStorage,
    setHeadCountInStorage,
  };
};

export default useLocalStorage;

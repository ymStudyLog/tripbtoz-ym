import React from "react";
import { dateToStringYYYYMMDD } from "../utils/dateUtils";
import { StayPeriodType, HeadCountType } from "../types";

const useLocalStorage = () => {
  const [stringOrNull, setStringOrNull] = React.useState<
    StayPeriodType<string | null>
  >({
    checkIn: null,
    checkOut: null,
  });
  const [numberOrNull, setNumberOrNull] = React.useState<
    HeadCountType<number | null>
  >({
    adult: null,
    child: null,
  });
  const checkLocalStorage = React.useCallback(
    (periodInStorage: string | null, countInStorage: string | null) => {
      if (periodInStorage !== null && countInStorage !== null) {
        const parsedPeriod: StayPeriodType<string> =
          JSON.parse(periodInStorage);
        const parsedCount: HeadCountType<number> = JSON.parse(countInStorage);

        setStringOrNull((prevState: StayPeriodType<string | null>) => {
          return {
            ...prevState,
            checkIn: parsedPeriod.checkIn,
            checkOut: parsedPeriod.checkOut,
          };
        });
        setNumberOrNull((prevState: HeadCountType<number | null>) => {
          return {
            ...prevState,
            adult: parsedCount.adult,
            child: parsedCount.child,
          };
        });
      }
    },
    []
  );

  const savePeriodInStorage = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    const formattedPeriod: StayPeriodType<string> = {
      checkIn: startDate === null ? "" : dateToStringYYYYMMDD(startDate),
      checkOut: endDate === null ? "" : dateToStringYYYYMMDD(endDate),
    };
    localStorage.setItem("stayPeriod", JSON.stringify(formattedPeriod));
  };

  const saveCountInStorage = (headCountData: HeadCountType<number>) => {
    localStorage.setItem("headCount", JSON.stringify(headCountData));
  };

  return {
    stayPeriodOrNull: stringOrNull,
    headCountOrNull: numberOrNull,
    checkLocalStorage,
    savePeriodInStorage,
    saveCountInStorage,
  };
};

export default useLocalStorage;

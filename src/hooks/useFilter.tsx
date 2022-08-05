import React from "react";
import { areIntervalsOverlapping } from "date-fns";
import { ReservationDataType } from "../types/hotelDataType";
import { HeadCountType, StayPeriodType } from "../types/localStorageType";
import { QueryType } from "../types/queryType";
import useDatabase from "../hooks/useDatabase";

const useFilter = () => {
  const { reservations } = useDatabase();
  const [headQuery, setHeadQuery] = React.useState<QueryType>("");
  const [stayPeriodQuery, setStayPeriodQuery] = React.useState<QueryType>("");

  const filterByHeadCount = React.useCallback(
    (headCount : HeadCountType): void =>
    {
      console.log("필터훅",headCount);
      setHeadQuery(
        `occupancy.base_lte=${headCount}&occupancy.max_gte=${headCount}`
      );
    },
    []
  );

  const filterByStayPeriod = React.useCallback((stayPeriod : StayPeriodType): void => {
    console.log("필터훅", stayPeriod);
    if (reservations !== undefined) {
      const query = reservations
        .filter((reservation: ReservationDataType) =>
          areIntervalsOverlapping(
            {
              start: new Date(stayPeriod.checkIn),
              end: new Date(stayPeriod.checkOut),
            },
            {
              start: new Date(reservation.reservationDetail.checkIn),
              end: new Date(reservation.reservationDetail.checkOut),
            }
          )
            ? reservation
            : null
        )
        .map(
          (currentState: ReservationDataType) =>
            `id_ne=${currentState.hotel_id}`
        )
        .join("&");
      setStayPeriodQuery(query);
    } else {
      setStayPeriodQuery("");
    }
  }, [reservations]);

  const filteredQueryString: QueryType = "?"
    .concat(headQuery)
    .concat("&")
    .concat(stayPeriodQuery);

  return {
    filterByHeadCount,
    filterByStayPeriod,
    filteredQueryString,
  };
};

export default useFilter;

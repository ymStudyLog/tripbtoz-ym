import React from "react";
import { areIntervalsOverlapping } from "date-fns";
import { ReservationDataType } from "../types/hotelDataType";
import { HeadCountType, StayPeriodType } from "../types/localStorageType";
import { QueryType } from "../types/queryType";

const useFilter = () => {
  const [headQuery, setHeadQuery] = React.useState<QueryType>("");
  const [stayPeriodQuery, setStayPeriodQuery] = React.useState<QueryType>("");

  const filterByHeadCount = React.useCallback(
    (count: HeadCountType): void =>
      setHeadQuery(`occupancy.base_lte=${count}&occupancy.max_gte=${count}`),
    []
  );

  const filterByStayPeriod = React.useCallback(
    (
      reservations: ReservationDataType[] | undefined,
      period: StayPeriodType
    ): void => {
      if (reservations !== undefined) {
        const query = reservations
          .filter((reservation: ReservationDataType) => {
            return areIntervalsOverlapping(
              {
                start: new Date(period.checkIn),
                end: new Date(period.checkOut),
              },
              {
                start: new Date(reservation.reservationDetail.checkIn),
                end: new Date(reservation.reservationDetail.checkOut),
              }
            )
              ? reservation
              : null;
          })
          .map(
            (currentState: ReservationDataType) =>
              `id_ne=${currentState.hotel_id}`
          )
          .join("&");
        setStayPeriodQuery(query);
      } else {
        setStayPeriodQuery("");
      }
    },
    []
  );

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

import React from "react";
import { areIntervalsOverlapping } from "date-fns";
import { ReservationDataType } from "../types/hotelDataType";
import { HeadCountType, StayPeriodType } from "../types/localStorageType";
import { QueryType } from "../types/queryType";
import useLocalStorage from "../hooks/useLocalStorage";
import useDatabase from "../hooks/useDatabase";

const useFilter = () => {
  const { reservations } = useDatabase();
  const { headCount, stayPeriod } = useLocalStorage();

  const filterByHeadCount = (count: HeadCountType): QueryType =>
    `occupancy.base_lte=${count}&occupancy.max_gte=${count}`;

  const filterByStayPeriod = (
    reservations: ReservationDataType[] | undefined,
    period: StayPeriodType
  ): QueryType => {
    if (reservations !== undefined) {
      return reservations
        .filter((reservation: ReservationDataType) =>
          areIntervalsOverlapping(
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
            : null
        )
        .map(
          (currentState: ReservationDataType) =>
            `id_ne=${currentState.hotel_id}`
        )
        .join("&");
    } else {
      return "";
    }
  };

  React.useEffect(() => {
    filterByHeadCount(headCount);
    filterByStayPeriod(reservations, stayPeriod);
  }, [headCount, reservations, stayPeriod]);

  const filteredQueryString: QueryType = "?"
    .concat(filterByHeadCount(headCount))
    .concat("&")
    .concat(filterByStayPeriod(reservations, stayPeriod));

  return {
    filteredQueryString
  };
};

export default useFilter;

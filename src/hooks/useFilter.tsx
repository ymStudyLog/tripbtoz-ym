import React from "react";
import { areIntervalsOverlapping } from "date-fns";
import { ReservationDataType } from "../types";
import { HeadCountType, StayPeriodType, QueryType } from "../types";
import useReactQuery from "../hooks/useReactQuery";

//TODO 지금 메이저 에러 여기서 발생 중!
const useFilter = () => {
  const { reservations } = useReactQuery();

  const filterByHeadCount = (
    headCount: HeadCountType,
    query: QueryType
  ): void => {
    const totalCount = headCount.adult + headCount.child;
    if (query.length === 0) {
      localStorage.setItem("query", `?occupancy.base_lte=${totalCount}&occupancy.max_gte=${totalCount}`)
    } else {
      const temp = `?occupancy.base_lte=${totalCount}&occupancy.max_gte=${totalCount}&`.concat(
        query
      );
      localStorage.setItem("query", temp);
    }
  };

  const filterByStayPeriod = React.useCallback(
    (
      stayPeriod: StayPeriodType,
      headCount: HeadCountType,
      callback: any
    ): void => {
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
        callback(headCount, query);
      } else {
        callback("");
      }
    },
    [reservations]
  );

  return {
    filterByHeadCount,
    filterByStayPeriod,
  };
};

export default useFilter;

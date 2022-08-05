import React from "react";
import { areIntervalsOverlapping } from "date-fns";
import { ReservationDataType } from "../types/hotelDataType";
import { NumberOfPeopleType, StayPeriodType } from "../types/localStorageType";
import { QueryType } from "../types/queryType";
import useDatabase from "../hooks/useDatabase";

// type QueriesType = {
//   firstQuery : QueryType;
//   secondQuery : QueryType;
// }

const useFilter = () => {
  const { reservations } = useDatabase();

  const filterByHeadCount = React.useCallback(
    (headCount: NumberOfPeopleType): QueryType => {
      return `occupancy.base_lte=${headCount.adult + headCount.child}&occupancy.max_gte=${headCount.adult + headCount.child}`;
    },
    []
  );

  // const filterByStayPeriod = React.useCallback(
  //   (headCount : NumberOfPeopleType, stayPeriod: StayPeriodType): QueriesType => {
  //     if (reservations !== undefined) {
  //       const query = reservations
  //         .filter((reservation: ReservationDataType) =>
  //           areIntervalsOverlapping(
  //             {
  //               start: new Date(stayPeriod.checkIn),
  //               end: new Date(stayPeriod.checkOut),
  //             },
  //             {
  //               start: new Date(reservation.reservationDetail.checkIn),
  //               end: new Date(reservation.reservationDetail.checkOut),
  //             }
  //           )
  //             ? reservation
  //             : null
  //         )
  //         .map(
  //           (currentState: ReservationDataType) =>
  //             `id_ne=${currentState.hotel_id}`
  //         )
  //         .join("&");
  //       return {
  //         firstQuery : `occupancy.base_lte=${headCount}&occupancy.max_gte=${headCount}`,
  //         secondQuery : query,
  //       }
  //     } else {
  //       return {
  //         firstQuery : `occupancy.base_lte=${headCount}&occupancy.max_gte=${headCount}`,
  //         secondQuery : "",
  //       }
  //     }
  //   },
  //   [reservations]
  // );
  const filterByStayPeriod = React.useCallback(
    (stayPeriod: StayPeriodType ): QueryType => {
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
        return query;
      } else {
        return "";
      }
    },
    [reservations]
  );

  const createFilteredQuery = React.useCallback((
    firstQueryFilter : string,
    secondQueryFilter : string
  ): QueryType => {
    return "?".concat(firstQueryFilter).concat("&").concat(secondQueryFilter);
  },[]);

  return {
    filterByHeadCount,
    filterByStayPeriod,
    createFilteredQuery,
  };
};

export default useFilter;

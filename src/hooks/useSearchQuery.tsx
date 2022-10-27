import React from "react";
import { areIntervalsOverlapping } from "date-fns";
import { HeadCountType, StayPeriodType, ReservationType } from "../types";

type Props = {
  stayPeriod: StayPeriodType<string>;
  headCount: HeadCountType<number>;
  reservations: ReservationType[];
};

const useSearchQuery = () => {
  const [query, setQuery] = React.useState<string>("");

  const createQueryByHeadCount = (headCount: HeadCountType<number>): string => {
    const totalCount = headCount.adult + headCount.child;
    return `occupancy.base_lte=${totalCount}&occupancy.max_gte=${totalCount}`;
  };

  const createQueryById = (idArray: number[]): string => {
    return idArray.length === 0
      ? ""
      : "&".concat(idArray.map((id: number) => `id_ne=${id}`).join("&"));
  };

  const createTotalQuery = React.useCallback((props: Props) => {
    const { stayPeriod, headCount, reservations } = props;

    const idCollection: number[] = reservations
      ?.filter((reservation: ReservationType) =>
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
      ?.map((currentState: ReservationType) => currentState.hotel_id);

    const firstQuery = createQueryByHeadCount(headCount);
    const secondQuery = createQueryById(idCollection);

    setQuery(`?${firstQuery}${secondQuery}`);
  }, []);

  return {
    query,
    createTotalQuery,
  };
};

export default useSearchQuery;

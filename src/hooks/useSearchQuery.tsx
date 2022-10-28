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
    const idCollection: number[] = [];
    
    //TODO 여기에서 stayPeriod 초기값은 빈문자열이니까 빈문자열일 경우 overlap 체크 안하게 필수임 => 리프레시하면 에러남
    if (stayPeriod.checkIn.length > 0 && stayPeriod.checkOut.length > 0) {
      idCollection.splice(0, idCollection.length - 1).concat(
        reservations
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
          ?.map((currentState: ReservationType) => currentState.hotel_id)
      );
    } else {
      idCollection.splice(0, idCollection.length - 1)
    }

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

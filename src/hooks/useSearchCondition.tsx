import React from "react";
import { areIntervalsOverlapping } from "date-fns";
import { ReservationDataType } from "../types";
import { HeadCountType, StayPeriodType } from "../types";
import useReactQuery from "./useReactQuery";

//TODO 지금 메이저 에러 여기서 발생 중!
//1) useSearchCondition는 stayPeriod와 headCount를 props로 받는다
//2) 가장 처음으로 stayPeriod를 통해 만든 *쿼리를 통해* db에서 일치하는 reservations 정보만 가져온다. - overlap이 필요한가?
//3) 그 다음 2)에서 나온 id 값으로 1차 쿼리를 만든다(stayPeriod가 겹치는거 필터링)
//4) 그 다음 headCount로 3)과 합쳐서 최종 쿼리를 만들어서 반환한다. => 이걸 어디다 저장할 필요는 없다!!!
const createQueryByHeadCount = (headCount: HeadCountType): string => {
  const totalCount = headCount.adult + headCount.child; //최소값이 1임
  return `occupancy.base_lte=${totalCount}&occupancy.max_gte=${totalCount}`;
};

const createQueryById = (idArray: number[]): string => {
  return idArray.length === 0
    ? ""
    : "&".concat(idArray.map((id: number) => `id_ne=${id}`).join("&")); //TODO id_ne=1,2,3이런식으로도 되나?
};

type Props = {
  stayPeriod: StayPeriodType;
  headCount: HeadCountType;
};

const useSearchCondition = (props: Props) => {
  const { stayPeriod, headCount } = props; //db에 저장된 로컬스토리지 값 전달된것. 로컬스토리지 변경 => 자동 db 변경
  const { reservations } = useReactQuery(); //db에 저장된 예약정보
  const [query, setQuery] = React.useState<string>("");
  const [overlappedId, setOverlappedId] = React.useState<number[]>([]);

  React.useEffect(() => {
    const idCollection: number[] = reservations
      ?.filter((reservation: ReservationDataType) =>
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
      ?.map((currentState: ReservationDataType) => currentState.hotel_id);
    setOverlappedId(idCollection);
  }, [reservations, stayPeriod]);

  const createTotalQuery = React.useCallback(() => {
    const firstQuery = createQueryByHeadCount(headCount);
    const secondQuery = createQueryById(overlappedId);

    setQuery(`?${firstQuery}${secondQuery}`);
  }, [headCount, overlappedId]);

  return {
    query,
    createTotalQuery, //export할 필요가 잇는가
  };
};

export default useSearchCondition;

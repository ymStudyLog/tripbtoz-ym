import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getHotelInformation } from "../api/api";
import { GetDataResultType, BasicHotelDataType } from "../types/hotelDataType";

//TODO 필요하면 사용하고 안쓰면 삭제
const useFilter = () => {
  const { data } = useQuery<GetDataResultType>(["getWholeHotelData"], () =>
    getHotelInformation<BasicHotelDataType[]>("")
  );

  //   //1차 인원수로 필터링
  //   const headFilter = data?.filter(
  //     (hotel) =>
  //       hotel.occupancy.base <= headCount && hotel.occupancy.max >= headCount
  //   );
  //   //   console.log("1차", headFilter);
  //   //2차 기간으로 필터링 -> overlapp = true가 겹치는거라 걸러져야됨. false인 것들만 모아서 보여주기
  //   const periodFilter = headFilter?.filter((hotel) =>
  //     hotel.reservationDetail
  //       ? !areIntervalsOverlapping(
  //           {
  //             start: new Date(stayPeriod.checkIn),
  //             end: new Date(stayPeriod.checkOut),
  //           },
  //           {
  //             start: new Date(hotel.reservationDetail.checkIn),
  //             end: new Date(hotel.reservationDetail.checkOut),
  //           }
  //         )
  //         ? hotel
  //         : null
  //       : hotel
  //   );
  //   //   console.log("2차", periodFilter);
  return {
    data,
  };
};

export default useFilter;

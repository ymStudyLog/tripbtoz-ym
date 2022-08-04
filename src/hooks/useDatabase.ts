import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getReservationData } from "../api/api";
import { ReservationDataType } from "../types/hotelDataType";

const useDatabase = () => {
  const { data } = useQuery(
    ["getReservation"],
    () => getReservationData<ReservationDataType[]>("")
  );
  
  return {
    reservations : data,
  };
};

export default useDatabase;

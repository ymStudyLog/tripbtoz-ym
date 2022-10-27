import { useQuery } from "@tanstack/react-query";
import { getReservationData } from "../api/api";
import { ReservationType } from "../types";

const useReactQuery = () => {
  const reservations = useQuery(["getReservation"], () =>
    getReservationData<ReservationType[]>("")
  );

  return {
    reservations: reservations.data === undefined ? [] : reservations.data,
  };
};

export default useReactQuery;

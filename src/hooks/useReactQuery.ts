import { useQuery } from "@tanstack/react-query";
import { parseLocalStorageData, getReservationData } from "../api/api";
import { ReservationDataType, LocalStorageType } from "../types";

const useReactQuery = () => {
  const reservations = useQuery(
    ["getReservation"],
    () => getReservationData<ReservationDataType[]>("")
  );

  const localStorageData = useQuery(
    ["parseLocalStorageData"],
    ()=> parseLocalStorageData<LocalStorageType>()
  )

  return {
    reservations : reservations.data,
    localStorageData : localStorageData.data,
  };
};

export default useReactQuery;

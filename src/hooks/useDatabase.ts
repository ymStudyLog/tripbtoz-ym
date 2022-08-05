import { useQuery } from "@tanstack/react-query";
import { getLocalStorageData, getReservationData } from "../api/api";
import { ReservationDataType, DatabaseLocalStorageType } from "../types/databaseType";

const useDatabase = () => {
  const reservations = useQuery(
    ["getReservation"],
    () => getReservationData<ReservationDataType[]>("")
  );

  const localStorageData = useQuery(
    ["getLocalStorageData"],
    ()=> getLocalStorageData<DatabaseLocalStorageType>()
  )

  return {
    reservations : reservations.data,
    localStorageData : localStorageData.data,
  };
};

export default useDatabase;

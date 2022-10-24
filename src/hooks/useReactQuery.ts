import { useQuery } from "@tanstack/react-query";
import { parseLocalStorageData, getReservationData } from "../api/api";
import { ReservationDataType, LocalStorageType } from "../types";

const emptyData = {
  stayPeriod: {
    checkIn: "",
    checkOut: "",
  },
  headCount: {
    adult: 2,
    child: 0,
  },
};

const useReactQuery = () => {
  const reservations = useQuery(["getReservation"], () =>
    getReservationData<ReservationDataType[]>("")
  );

  const localStorageData = useQuery(["parseLocalStorageData"], () =>
    parseLocalStorageData<LocalStorageType>()
  );

  return {
    reservations: reservations.data === undefined ? [] : reservations.data,
    localStorageData:
      localStorageData.data === undefined ? emptyData : localStorageData.data,
  };
};

export default useReactQuery;

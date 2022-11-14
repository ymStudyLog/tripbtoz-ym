import { useQuery } from "@tanstack/react-query";
import { getReservationData } from "../api/api";
import { ReservationType } from "../types";

const useReactQuery = () => {
  const reservations = useQuery(["getReservation"], () =>
    getReservationData<ReservationType[]>("")
  );

  /*
   queryClient -> index.tsx에서 하지 않고 App단위에서 다시 해보고 -> App 컴포넌트 단위에서 queryClient를 생성하면 이때 이미 fetching을 시도하게 되니
   option을 windowFocus : false로만 설정하기 
   //TODO index.tsx에 있는 queryClient app으로 가져오고 useReactQuery를 삭제하기 => hotel 페이지에서는 key로 언제든 불러와서 refetching 하면됨
  */
  return {
    reservations: reservations.data === undefined ? [] : reservations.data,
  };
};

export default useReactQuery;

import { useQuery } from "@tanstack/react-query";
import { getReservationData } from "../api/api";
import { ReservationType } from "../types";

/*useReactQuery가 하는 일 => reservations 데이터만 다루기 때문에 useReservations로 바꿔야될듯
*1. db의 reservations 데이터를 가져온다.
*2. 가져온 reservations 데이터를 Context API로 전역 상태에 저장한다. => Hotel 페이지에서 이 전역 상태를 가져다가 searchQuery를 만들어서 HotelList에 props로 주면 infiniteScroll에서 이것을 가지고  fetching함 
*3. 예약 버튼을 누르면 reservations 데이터를 refetching 할 수 있도록 react-query를 적용한다.
*/
const useReactQuery = () => {
  const reservations = useQuery(["getReservation"], () =>
    getReservationData<ReservationType[]>("")
  );
  
  return {
    reservations: reservations.data === undefined ? [] : reservations.data,
  };
};

export default useReactQuery;

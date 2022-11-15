import React from "react";
import { createContext } from "react;
import { useQuery } from "@tanstack/react-query";
import { getReservationData } from "../api/api";
import { ReservationType } from "../types";

type ContextChildren = {
  children : JSX.Element;
}

//TODO reservations 데이터만 다루기 때문에 useReservations로 바꿔야될듯
/*useReactQuery가 하는 일 
*1. db의 reservations 데이터를 가져온다.
*2. 가져온 reservations 데이터를 Context API로 전역 상태에 저장한다. => Hotel 페이지에서 이 전역 상태를 가져다가 searchQuery를 만들어서 HotelList에 props로 주면 infiniteScroll에서 이것을 가지고  fetching함 
*3. 예약 버튼을 누르면 reservations 데이터를 refetching 할 수 있도록 react-query를 적용한다.
*/
const useReactQuery = () => {
  //1번 기능
  const [reservations, setReservations] = React.useState<ReservationType[]>([]); // Layout 페이지에서 useEffect(()=>{ getReservationData ~~},[])로 가져온 데이터를 set하기
  
  //2번 기능 => Context API를 만들어서 Provider 컴포넌트를 반환
  const ReservationContext = createContext();
  const UseReservationContext = ({children} : ContextChildren) => {
  return <ReservationContext.Provider value={reservations}> //reservatios는 Context API로 전역상태관리 될 것임
    {children}
    </<ReservationContext.Provider>
    };
    
  //3번 기능
  //const updateReservations = useQuery(["getReservation"], () =>
  //  getReservationData<ReservationType[]>("")
  //); -> HotelItem onClick시 불러와서 setReservations로 다시 상태 저장 -> 근데 이렇게 하면 react-query를 안쓰고 그냥 다시 불러오는 거랑 다를게 없음...아예 react-query를 걷어내고 문제 없이 돌아가는지 확인해보기 
  
  //return {
    //reservations: reservations.data === undefined ? [] : reservations.data,
  //};
  return{
    setReservations,
    UseReservationContext,
    updateReservations,
  };
};

export default useReactQuery;

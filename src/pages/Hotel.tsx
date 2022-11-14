import React from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import HotelList from "../components/hotel/HotelList";
import useSearchQuery from "../hooks/useSearchQuery";
import useReactQuery from "../hooks/useReactQuery";
import { LocalStorageType } from "../types";

type OutletPropsType = {
  currentChoice: LocalStorageType;
};

//TODO 지멋대로 전체 호텔 데이터 불러왔다가 *포커스 아웃*되면 쿼리대로 불러옴
//호텔페이지 마운트시 refetching 이전의 호텔 데이터가 이미 fetching으로 존재(보일때고 있고, 안보일때도 있음 -> 확실한지 이것부터 체크하기) 
//refetching 이후 데이터는 사실상 서버 내부에 업데이트는 없기 때문에 이전 데이터와 동일해서 변경이 없음 = 그래서 안보이게 되는 것 아닐까? => 포커스 아웃 옵션을 안걸어서 포커스 아웃되어야 바뀌는 것 처럼 보이는 듯 
/* 
headCount, stayPeriod 값으로 데이터를 fetching 하는 작업 자체는 react-query가 필요하지 않음
fetch api endpoint 만들때 서버의 reservation 데이터가 필요하기 때문에 위의 작업이 이루어지기도 전에 맨 처음 일어나도 되는 작업 => layout page에서 이것을 먼저 가져온 다음 Context API로 전역상태 저장
SearchBar 컴포넌트에서 검색 버튼을 누르면 -> 전역 상태로 존재하는 reservation 데이터와 함께 로직을 거처 endpoint를 만든 후 props로 hotel 페이지에 전달하기 => hotel 페이지에서는 데이터 요청, 렌더링만하면 됨 
예약 버튼을 클릭할 경우 -> 이때가 react query가 필요한 바로 그때!! reservation db 추가와 동시에 reservation 데이터를 refetching 해서 전역 데이터를 자동으로 업데이트 하게 만들기 
=> useReactQuery()를 아예 위의 모든 단계가 이루어지는 hooks로 리팩토링하기
*/
const Hotel = () => {
  const { currentChoice } = useOutletContext<OutletPropsType>();
  const { reservations } = useReactQuery(); //TODO 여기에서 예약정보를 불러와서 오류?
  const { query, createTotalQuery } = useSearchQuery();

  React.useEffect(() => {
    createTotalQuery({
      stayPeriod: currentChoice.stayPeriod,
      headCount: currentChoice.headCount,
      reservations,
    });
  }, [reservations, createTotalQuery, currentChoice]);

  return (
    <HotelContainer>
      <HotelList query={query} currentChoice={currentChoice}/>
    </HotelContainer>
  );
};

export default Hotel;

const HotelContainer = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
`;

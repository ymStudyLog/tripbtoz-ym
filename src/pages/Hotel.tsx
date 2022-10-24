import React from "react";
import styled from "styled-components";
import HotelList from "../components/hotel/HotelList";
import useSearchCondition from "../hooks/useSearchCondition";
import useReactQuery from "../hooks/useReactQuery";

const Hotel = () => {
 //Searchbar 컴포넌트가 이제는 모든 페이지의 형제 컴포넌트라는 것을 잊지 말기 -> 로컬스토리지랑 db에 값을 저장하는 단계
  const { localStorageData } = useReactQuery();
  const { query, createTotalQuery } = useSearchCondition({
    stayPeriod: localStorageData.stayPeriod,
    headCount: localStorageData.headCount,
  });
  console.log(query);

  React.useEffect(() => {
    createTotalQuery();
  }, [localStorageData, createTotalQuery]);

  return (
    <HotelContainer>
      <HotelList query={query} />
    </HotelContainer>
  );
};

export default Hotel;

const HotelContainer = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
`;

import React from "react";
import styled from "styled-components";
import HotelList from "../components/hotel/HotelList";
import useFilter from "../hooks/useFilter";
import useReactQuery from "../hooks/useReactQuery";

const Hotel = () => {
  const { localStorageData } = useReactQuery();
  //TODO useFilter에서 쿼리 생성 과정 다시 수정하기 -> 쿼리를 로컬스토리지에 저장하는 단계는 불필요
  const { filterByHeadCount, filterByStayPeriod } = useFilter();

  React.useEffect(() => {
    if (localStorageData !== undefined) {
      filterByStayPeriod(
        localStorageData.stayPeriod,
        localStorageData.headCount,
        filterByHeadCount
      );
    }
  }, [filterByStayPeriod, filterByHeadCount, localStorageData]);

  return (
    <HotelContainer>
      <HotelList />
    </HotelContainer>
  );
};

export default Hotel;

const HotelContainer = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
`;

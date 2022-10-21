import React from "react";
import styled from "styled-components";
import HotelList from "../components/hotel/HotelList";
import useFilter from "../hooks/useFilter";
import useDatabase from "../hooks/useDatabase";

// type LocalStorageType = string | null;

const Hotel = () => {
  //TODO 페이지 로드시 무조건 쿼리 생성해서 데이터 패칭해야되는데 안되는 중 => useLocalStorage에서 로컬스토리지 저장과 동시에 db 업데이트 하게 로직 변경하니까 되긴 하는데 검색 클릭이 씹히거나, 서버가 과부하 되서 종료되버림
  const { localStorageData } = useDatabase();
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

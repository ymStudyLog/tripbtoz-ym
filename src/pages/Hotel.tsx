import React from "react";
import styled from "styled-components";
import HotelList from "../components/hotel/HotelList";
import useSearchQuery from "../hooks/useSearchQuery";
import useReactQuery from "../hooks/useReactQuery";
import useLocalStorage from "../hooks/useLocalStorage";

const Hotel = () => {
  const { reservations } = useReactQuery();
  const { query, createTotalQuery } = useSearchQuery();

  const { prevStayPeriod, prevHeadCount } = useLocalStorage();

  React.useEffect(() => {
    createTotalQuery({
      //하드코딩 임시 데이터 -> prevStayPeriod랑 prevHeadCount 넣어줄 예정
      stayPeriod: {
        checkIn: "2022-10-10",
        checkOut: "2022-10-12",
      },
      headCount: {
        adult: 2,
        child: 0,
      },
      reservations,
    });
  }, [reservations, createTotalQuery]);
  // }, [reservations, createTotalQuery, prevStayPeriod, prevHeadCount]);

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

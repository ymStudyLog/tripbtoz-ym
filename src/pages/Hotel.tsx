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

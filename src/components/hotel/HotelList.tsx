import React from "react";
import Loading from "../../layout/Loading";
import HotelItem from "./HotelItem";
import PageContainer from "../../layout/PageContainer";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import {
  HotelDataType,
  GetDataResultType,
} from "../../types";
import { v4 as uuidv4 } from "uuid";

type EachInfinitePageType = {
  result: GetDataResultType;
  nextPage: number | undefined;
  isLast: boolean;
};

const HotelList = () => {
  const queryString = localStorage.getItem("query");
  const storageQuery = queryString !== null ? queryString : "";

  const { isLoading, hasNextPage, data, isFetchingNextPage, ObservationBox } =
    useInfiniteScroll({storageQuery});

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {data?.pages.map((page: EachInfinitePageType, index: number) => (
            <PageContainer key={uuidv4()}>
              {page?.result?.map(
                (eachHotelData: HotelDataType, index: number) => {
                  return <HotelItem key={uuidv4()} hotelData={eachHotelData} />;
                }
              )}
            </PageContainer>
          ))}
        </div>
      )}
      {!isFetchingNextPage && hasNextPage ? (
        <>
          <ObservationBox />
          <Loading />
        </>
      ) : null}
    </>
  );
};

export default HotelList;

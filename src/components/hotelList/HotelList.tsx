import React from "react";
import {
  BasicHotelDataType,
  GetDataResultType,
} from "../../types/hotelDataType";
import Loading from "../common/Loading";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import HotelItem from "./HotelItem";
import { PageContainer } from "../../styles/HotelList.style";

type EachInfinitePageType = {
  result: GetDataResultType;
  nextPage: number | undefined;
  isLast: boolean;
};

const HotelList = () => {
  const { isLoading, hasNextPage, data, isFetchingNextPage, ObservationBox } =
    useInfiniteScroll();

  // if (isLoading) return <Loading />; //TODO 

  return (
    <>
    {isLoading ? <Loading /> : 
      <div>
      {data?.pages.map((page: EachInfinitePageType, index: number) => (
        <PageContainer key={index}>
          {page?.result?.map(
            (eachHotelData: BasicHotelDataType, index: number) => {
              return <HotelItem key={index} hotelData={eachHotelData} />;
            }
          )}
        </PageContainer>
      ))}
      </div>
    }
    {/* TODO 깜빡이는 현상 생김 */}
      {!isFetchingNextPage && hasNextPage ? <ObservationBox /> : null} 
    </>
  );
};

export default HotelList;
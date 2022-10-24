import React from "react";
import Loading from "../../layout/Loading";
import HotelItem from "./HotelItem";
import PageContainer from "../../layout/PageContainer";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { HotelDataType, GetDataResultType } from "../../types";
import { v4 as uuidv4 } from "uuid";

type Props = {
  query: string;
};

type EachInfinitePageType = {
  result: GetDataResultType;
  nextPage: number | undefined;
  isLast: boolean;
};

const HotelList = (props: Props) => {
  const { query } = props;
//useInfiniteScroll에는 ""혹은 쿼리 스트링이 들어가야함
  const { isLoading, hasNextPage, data, isFetchingNextPage, ObservationBox } =
    useInfiniteScroll({ query });

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

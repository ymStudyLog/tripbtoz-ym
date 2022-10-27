import React from "react";
import Loading from "../../layout/Loading";
import HotelItem from "./HotelItem";
import PageContainer from "../../layout/PageContainer";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { HotelDataType } from "../../types";
import { v4 as uuidv4 } from "uuid";

type Props = {
  query: string;
};

type EachPageType = {
  result: HotelDataType[] | undefined;
  nextPage: number | undefined;
  isLast: boolean;
};

const HotelList = (props: Props) => {
  const { query } = props;
  const { isLoading, hasNextPage, data, isFetchingNextPage, ObservationBox } =
    useInfiniteScroll({ query });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {data?.pages.map((page: EachPageType) => (
            <PageContainer key={uuidv4()}>
              {page?.result?.map((eachHotelData: HotelDataType) => {
                return <HotelItem key={uuidv4()} hotelData={eachHotelData} />;
              })}
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

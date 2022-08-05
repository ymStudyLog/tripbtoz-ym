import React from "react";
import {
  BasicHotelDataType,
  GetDataResultType,
} from "../../types/hotelDataType";
import Loading from "../common/Loading";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import HotelItem from "./HotelItem";
import { PageContainer } from "../../styles/HotelList.style";
import { v4 as uuidv4 } from "uuid";
import { NumberOfPeopleType, StayPeriodType } from "../../types/localStorageType";
import { QueryType } from "../../types/queryType";

type Props = {
  stayPeriod: StayPeriodType;
  headCount: NumberOfPeopleType;
};

type EachInfinitePageType = {
  result: GetDataResultType;
  nextPage: number | undefined;
  isLast: boolean;
};

const HotelList = (props: Props) => {
  const { stayPeriod, headCount } = props;
  // console.log("hotelList",stayPeriod, headCount);
  const { isLoading, hasNextPage, data, isFetchingNextPage, ObservationBox } =
    useInfiniteScroll();

  // const [queryState, setQueryState] = React.useState<QueryType>("");
  // useFilterThis({
  //   headCount: headCount,
  //   stayPeriod: stayPeriod,
  //   setQueryState: setQueryState,
  // });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {data?.pages.map((page: EachInfinitePageType, index: number) => (
            <PageContainer key={uuidv4()}>
              {page?.result?.map(
                (eachHotelData: BasicHotelDataType, index: number) => {
                  return (
                    <HotelItem
                      key={uuidv4()}
                      hotelData={eachHotelData}
                      stayPeriod={stayPeriod}
                      headCount={headCount}
                    />
                  );
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

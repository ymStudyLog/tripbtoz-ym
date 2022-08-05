import {
  BasicHotelDataType,
  GetDataResultType,
} from "../../types/hotelDataType";
import Loading from "../common/Loading";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import HotelItem from "./HotelItem";
import { PageContainer } from "../../styles/HotelList.style";
import { v4 as uuidv4 } from "uuid";
import { HeadCountType, StayPeriodType } from "../../types/localStorageType";

type Props = {
  stayPeriod: StayPeriodType;
  headCount: HeadCountType;
};

type EachInfinitePageType = {
  result: GetDataResultType;
  nextPage: number | undefined;
  isLast: boolean;
};

const HotelList = (props: Props) => {
  const { stayPeriod, headCount } = props;
  const { isLoading, hasNextPage, data, isFetchingNextPage, ObservationBox } =
    useInfiniteScroll();

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

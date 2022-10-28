import React from "react";
import { getHotelInformation } from "../api/api";
import { HotelDataType } from "../types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

type Props = {
  query: string;
};

export const HOTELDATA_PER_PAGE = 10;

const useInfiniteScroll = (props: Props) => {
  const { query } = props;

  //TODO 호텔페이지 마운트시에 지멋대로 전체 호텔 데이터 불러왔다가 *포커스 아웃*되면 쿼리대로 불러옴
  const getPage = async (pageParam: number) => {
    const finalQuery =
      query.length === 0
        ? `?_page=${pageParam}&_limit=${HOTELDATA_PER_PAGE}`
        : query.concat(`&_page=${pageParam}&_limit=${HOTELDATA_PER_PAGE}`);
    const hotelDatas: HotelDataType[] | undefined = await getHotelInformation<
      HotelDataType[]
    >(finalQuery);
    const nextPage =
      hotelDatas !== undefined && hotelDatas.length >= HOTELDATA_PER_PAGE
        ? pageParam + 1
        : undefined;
    return {
      result: hotelDatas,
      nextPage,
      isLast: !nextPage,
    };
  };

  const { fetchNextPage, isLoading, isFetchingNextPage, hasNextPage, data } =
    useInfiniteQuery(
      [`getTenHotelData`],
      ({ pageParam = 1 }) => getPage(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const ObservationBox = (): JSX.Element => {
    const [ref, inView] = useInView();

    React.useEffect(() => {
      if (!data) return;
      const lastPageIndex = data?.pages.length - 1;
      const isLastPage = data?.pages[lastPageIndex].isLast;

      if (!isLastPage && inView) setTimeout(fetchNextPage, 500);
    }, [inView]);

    return <div ref={ref}></div>;
  };

  return {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    ObservationBox,
  };
};

export default useInfiniteScroll;

import React from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getHotelInformation } from "../api/api";
import useLocalStorage from "../hooks/useLocalStorage";
import { BasicHotelDataType, GetDataResultType } from "../types/hotelDataType";
import { StayPeriodType } from "../types/localStorageType";
import { HOTELDATA_PER_PAGE } from "../utils/infiniteScroll";
import Loading from "./Loading";

type EachInfinitePageType = {
  result: GetDataResultType;
  nextPage: number | undefined;
  isLast: boolean;
};

const HotelList = () => {
  const [ref, inView] = useInView();
  const { stayPeriod, headCount, setReservationInStorage } = useLocalStorage();

  //TODO 예약된 호텔 데이터는 어디에 저장? 로컬로 끝? 필터링은 어떻게? database를 따로 파서 저장?
  //TODO 맨 처음 마운트시 1페이지만 렌더링 되어야하는데 2페이지까지 한번에 렌더링됨
  //TODO hook으로 빼기
  const urlEndpoint = (pageNumber: number) =>
    `?occupancy.base_lte=${headCount}&occupancy.max_gte=${headCount}&_page=${pageNumber}&_limit=${HOTELDATA_PER_PAGE}`;

  const getPage = async (pageParam: number) => {
    const hotelDatas: GetDataResultType = await getHotelInformation<
      BasicHotelDataType[]
    >(urlEndpoint(pageParam));
    const nextPage =
      hotelDatas !== undefined && hotelDatas.length >= HOTELDATA_PER_PAGE
        ? pageParam + 1
        : undefined; //data가 10개보다 작아지면 마지막 페이지
    return {
      result: hotelDatas,
      nextPage,
      isLast: !nextPage, //마지막 페이지면 true, 아니면 false
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

  React.useEffect(() => {
    if (!data) return;
    const lastPageIndex = data?.pages.length - 1;
    const isLastPage = data?.pages[lastPageIndex].isLast;

    if (!isLastPage && inView) setTimeout(fetchNextPage, 500);
  }, [inView, fetchNextPage, data]);

  // const myQueryClient = useQueryClient();
  // const addReservationDetail = useMutation((id : number, period: StayPeriodType)=>patchReservationDetail(id, period), {
  //   onSuccess: () => {
  //     myQueryClient.invalidateQueries(`getTenHotelData`);
  //   },
  // });
  if (isLoading) return <Loading />;
  return (
    <>
      {data?.pages.map((page: EachInfinitePageType, index: number) => (
        <TempHotelItemContainer key={index}>
          {page?.result?.map(
            (eachHotelData: BasicHotelDataType, index: number) => {
              return (
                <TempHotelItem key={index}>
                  <TempHotelDetail>
                    <p>id: {eachHotelData.id}</p>
                    <p>호텔명 : {eachHotelData.hotel_name}</p>
                    <p>
                      투숙인원 : {eachHotelData.occupancy.base}~
                      {eachHotelData.occupancy.max}명
                    </p>
                  </TempHotelDetail>
                  <TempMakeReservationButton
                    type="button"
                    onClick={() => {
                      setReservationInStorage(
                        eachHotelData.id,
                        eachHotelData.hotel_name
                      );
                      //patchReservationDetail(eachHotelData.id, stayPeriod); //TODO 어떻게 예약데이터를 저장할건지
                    }}
                  >
                    예약
                  </TempMakeReservationButton>
                </TempHotelItem>
              );
            }
          )}
        </TempHotelItemContainer>
      ))}
      {hasNextPage ? <Loading /> : null}
      {!isFetchingNextPage && <div ref={ref}></div>}
    </>
  );
};

export default HotelList;

//TODO 구조 변경
const TempHotelItemContainer = styled.div`
  border: 1px solid red;
`;

const TempHotelItem = styled.div`
  width: 400px;
  height: 200px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
`;

const TempHotelDetail = styled.div`
  width: 300px;
  height: 80px;
  border: 1px solid blue;
`;

const TempMakeReservationButton = styled.button`
  width: 50px;
  height: 30px;
`;

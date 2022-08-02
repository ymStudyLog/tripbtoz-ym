import React from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { getHotelInformation, patchReservationDetail } from "../api/api";
import useLocalStorage from "../hooks/useLocalStorage";
import { BasicHotelDataType, GetDataResultType } from "../types/hotelDataType";
import { StayPeriodType } from "../types/localStorageType";
import { HOTELDATA_PER_PAGE } from "../utils/infiniteScroll";
import Loading from "../components/Loading";

type EachInfinitePageType = {
  result: GetDataResultType;
  nextPage: number | undefined;
  isLast: boolean;
};

const Reservation = () => {
  const [ref, inView] = useInView();
  const { stayPeriod, headCount, setReservationInStorage } = useLocalStorage();

  //TODO 맨 처음 마운트시 1페이지만 렌더링 되어야하는데 2페이지까지 한번에 렌더링됨
  //TODO hook으로 빼기
  const getPage = async (pageParam: number) => {
    console.log("페이지", pageParam);
    const hotelDatas = await getHotelInformation<GetDataResultType>(
      `?_page=${pageParam}&_limit=${HOTELDATA_PER_PAGE}`
    );
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

  const { fetchNextPage, isFetchingNextPage, hasNextPage, data } =
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

  /* 참고한 블로그에서는 아예 status까지 받아와서 그에 따라 다른 return을 보여줌
   *  if (status === "loading") return <Loading />;
   *  if (status === "error") return <ErrorPage />;
   */
  // const myQueryClient = useQueryClient();
  // const addReservationDetail = useMutation((id : number, period: StayPeriodType)=>patchReservationDetail(id, period), {
  //   onSuccess: () => {
  //     myQueryClient.invalidateQueries(`getTenHotelData`);
  //   },
  // });

  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem("reservedHotels");
        }}
      >
        로컬스토리지 초기화
      </button>

      <div>
        {data?.pages.map((page: EachInfinitePageType, index: number) => (
          <div key={index} style={{ border: "1px solid red" }}>
            {page?.result?.map(
              (eachHotelData: BasicHotelDataType, index: number) => {
                return (
                  <TempContainer key={index}>
                    <TempHotelItem>
                      <p>id: {eachHotelData.id}</p>
                      <p>호텔명 : {eachHotelData.hotel_name}</p>
                      <p>
                        투숙인원 : {eachHotelData.occupancy.base}~
                        {eachHotelData.occupancy.max}명
                      </p>
                    </TempHotelItem>
                    <TempButton
                      type="button"
                      onClick={() => {
                        setReservationInStorage(
                          eachHotelData.id,
                          eachHotelData.hotel_name
                        );
                        patchReservationDetail(eachHotelData.id, stayPeriod); //TODO react-query 적용 useMutation
                      }}
                    >
                      예약
                    </TempButton>
                  </TempContainer>
                );
              }
            )}
          </div>
        ))}
      </div>
      {hasNextPage ? <Loading /> : null}
      {!isFetchingNextPage && <div ref={ref}></div>}
    </>
  );
};

export default Reservation;

//전부 삭제 예정
const TempContainer = styled.div`
  width: 400px;
  height: 200px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
`;

const TempHotelItem = styled.div`
  width: 300px;
  height: 80px;
  border: 1px solid blue;
`;

const TempButton = styled.button`
  width: 50px;
  height: 30px;
`;

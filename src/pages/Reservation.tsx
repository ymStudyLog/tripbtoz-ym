import React from "react";
import styled from "styled-components";
import { getHotelInformation, patchReservationDetail } from "../api/api";
import {
  StayPeriodType,
  HeadCountType,
  ReservedHotelsType,
} from "../types/localStorageType";
import { HotelDatabaseType } from "../types/hotelDatabaseType";
import { hotelService } from "../api/api";

type Props = {};

const Reservation = (props: Props) => {
  const [hotelData, setHotelData] = React.useState<HotelDatabaseType[]>([]);

  //TODO 로컬스토리지 관련 코드 hooks로 리팩토링
  const [stayPeriod, setStayPeriod] = React.useState<StayPeriodType>({
    checkIn: "",
    checkOut: "",
  });
  const [headCount, setHeadCount] = React.useState<HeadCountType>(0);

  React.useEffect(() => {
    const periodData = localStorage.getItem("stayPeriod");
    const headData = localStorage.getItem("headCount");
    if (periodData !== null) {
      const parsedPeriodData = JSON.parse(periodData);
      setStayPeriod((prevState: StayPeriodType) => {
        return {
          ...prevState,
          checkIn: parsedPeriodData.checkIn,
          checkOut: parsedPeriodData.checkOut,
        };
      });
    }
    if (headData !== null) {
      const parsedHeadData = parseInt(headData);
      setHeadCount(parsedHeadData);
    }
  }, []);

  React.useEffect(() => {
    getHotelInformation<HotelDatabaseType[]>().then((data) => {
      if (data !== undefined) {
        setHotelData(data);
      }
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          onClick={() => {
            localStorage.removeItem("reservedHotels");
          }}
        >
          로컬스토리지 초기화
        </button>
        <button
          onClick={async () => {
            await hotelService.patch("/1", { "reservationDetail" : {
              checkIn : stayPeriod.checkIn,
              checkOut : stayPeriod.checkOut
            } }); //TODO react-query로 해보고 똑같으면 모든 db에 id 추가
          }}
        >
          에코랜드 호텔에 reservationDetail 추가하는 버튼
        </button>
      </div>
      {hotelData.map((eachHotelData, index) => {
        return (
          <TempContainer key={index}>
            <TempHotelItem>
              <p>호텔명 : {eachHotelData.hotel_name}</p>
              <p>
                투숙인원 : {eachHotelData.occupancy.base}~
                {eachHotelData.occupancy.max}명
              </p>
            </TempHotelItem>
            <TempButton
              type="button"
              onClick={() => {
                const prevState = localStorage.getItem("reservedHotels");
                const newState = [
                  {
                    _id: index,
                    hotel_name: eachHotelData.hotel_name,
                    headCount: headCount,
                    reservationDetail: {
                      checkIn: stayPeriod.checkIn,
                      checkOut: stayPeriod.checkOut,
                    },
                  },
                ];
                if (prevState !== null) {
                  const parsedPrevState: ReservedHotelsType[] =
                    JSON.parse(prevState);
                  localStorage.setItem(
                    "reservedHotels",
                    JSON.stringify(parsedPrevState.concat(newState))
                  );
                } else {
                  localStorage.setItem(
                    "reservedHotels",
                    JSON.stringify(newState)
                  );
                }
                //patch 함수 완성되면 넣기
              }}
            >
              예약
            </TempButton>
          </TempContainer>
        );
      })}
    </>
  );
};

export default Reservation;

//전부 삭제 예정
const TempContainer = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
`;

const TempHotelItem = styled.div`
  width: 300px;
  height: 50px;
  border: 1px solid blue;
`;

const TempButton = styled.button`
  width: 50px;
  height: 30px;
`;

import axios, { AxiosResponse } from "axios";
import { ReservationDataType } from "../types";
import { LocalStorageType, HeadCountType, StayPeriodType } from "../types";

const BASE_URL = "http://localhost:8000";

const hotelService = axios.create({ baseURL: `${BASE_URL}` });

export const getHotelInformation = async <T>(
  query: string = ""
): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await hotelService.get(
      `/hotels`.concat(query)
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}; //TODO try-catch 구조로 undefined 반환할 것인지?

export const saveReservationData = async (
  reservationDetail: ReservationDataType
) => {
  try {
    await hotelService.post(`/reservations`, reservationDetail);
  } catch (error) {
    console.log(error);
  }
};

export const getReservationData = async <T>(
  query: string = ""
): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await hotelService.get(
      `/reservations${query}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//TODO 로컬스토리지에 있는 데이터를 왜 db에도 저장했었는지 기억해내기 => 필요없으면 삭제하기
export const saveLocalStorageData = async (
  children: "stayPeriod" | "headCount",
  data: { stayPeriod: StayPeriodType } | { headCount: HeadCountType }
) => {
  try {
    await hotelService.patch(`/localStorage?_expand=${children}`, data);
  } catch (error) {
    console.log(error);
  }
};

export const emptyLocalStorageData = async () => {
  try {
    saveLocalStorageData("stayPeriod", {
      stayPeriod: {
        checkIn: "",
        checkOut: "",
      },
    });
    saveLocalStorageData("headCount", {
      headCount: {
        adult: 2,
        child: 0,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const parseLocalStorageData = async <T>(): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await hotelService.get("/localStorage?q=stayPeriod&q=headCount");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

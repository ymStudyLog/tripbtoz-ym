import axios, { AxiosResponse } from "axios";
import { ReservationDataType } from "../types";
import { HeadCountType, StayPeriodType } from "../types";

const BASE_URL = "http://localhost:8000";

const hotelService = axios.create({ baseURL: `${BASE_URL}` });

export const getHotelInformation = async <T>(
  query: string = ""
): Promise<T> => {
  const response: AxiosResponse<T> = await hotelService.get(
    `/hotels`.concat(query)
  );
  return response.data;
};

export const saveReservationData = async (
  reservationDetail: ReservationDataType
) => {
  await hotelService.post(`/reservations`, reservationDetail);
};

export const getReservationData = async <T>(
  query: string = ""
): Promise<T | undefined> => {
  const response: AxiosResponse<T> = await hotelService.get(
    `/reservations${query}`
  );
  return response.data;
};

export const saveLocalStorageData = async (
  children: "stayPeriod" | "headCount",
  data: { stayPeriod: StayPeriodType } | { headCount: HeadCountType }
) => {
  await hotelService.patch(`/localStorage?_expand=${children}`, data);
};

export const emptyLocalStorageData = async () => {
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
};

export const parseLocalStorageData = async <T>(): Promise<T | undefined> => {
  const response: AxiosResponse<T> = await hotelService.get(
    "/localStorage?q=stayPeriod&q=headCount"
  );
  return response.data;
};

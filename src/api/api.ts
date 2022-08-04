import axios, { AxiosResponse } from "axios";
import { ReservationDataType } from "../types/hotelDataType";

const BASE_URL = "http://localhost:8000";

export const hotelService = axios.create({ baseURL: `${BASE_URL}` });

export const getHotelInformation = async <T>(
  endpoint: string = ""
): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await hotelService.get(
      `/hotels`.concat(endpoint)
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addReservationData = async (
  reservationDetail: ReservationDataType
) => {
  try {
    await hotelService.post(`/reservations`, reservationDetail);
  } catch (error) {
    console.log(error);
  }
};

export const getReservationData = async <T>(
  endpoint: string = ""
): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await hotelService.get(
      `/reservations`.concat(endpoint)
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

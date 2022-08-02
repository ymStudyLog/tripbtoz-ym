import axios, { AxiosResponse } from "axios";
import { StayPeriodType } from "../types/localStorageType";

const BASE_URL = "http://localhost:8000/hotels";

export const hotelService = axios.create({ baseURL: `${BASE_URL}` });

export const getHotelInformation = async <T>(): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await hotelService.get("");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const patchReservationDetail = async <T>(
  _id: number,
  _stayPeriod: StayPeriodType
): Promise<T | undefined> => {
  try {
    const response = await hotelService.patch(`/${_id}`, {
      reservationDetail: _stayPeriod },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

import axios, { AxiosResponse } from "axios";
import { StayPeriodType } from "../types/localStorageType";

const BASE_URL = "http://localhost:8000/hotels";

export const hotelService = axios.create({ baseURL: `${BASE_URL}` });

export const getHotelInformation = async <T>(url : string = ""): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await hotelService.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const patchReservationDetail = async (
  _id: number,
  _stayPeriod: StayPeriodType
): Promise<number | undefined> => {
  try {
    const response = await hotelService.patch(`/${_id}`, {
      reservationDetail: _stayPeriod },
    );
    return response.status; //성공 = 2xx 상태 코드
  } catch (error) {
    console.log(error);
  }
};

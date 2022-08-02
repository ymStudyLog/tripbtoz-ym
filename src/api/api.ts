import axios, { AxiosResponse } from "axios";
import { StayPeriodType } from "../types/localStorageType";

const BASE_URL = "http://localhost:8000/hotels";

export const hotelService = axios.create({ baseURL: `${BASE_URL}` });

export const getHotelInformation = async <T>(): Promise<T|undefined> => {
  try {
    const response: AxiosResponse<T> = await hotelService.get(""); //TODO get<T>인지 알아보기 -> 넣어도 오류x 안넣어도 오류 x
    return response.data;
  } catch(error) {
    console.log(error);
  }
};

export const patchReservationDetail = async <T>(
  hotelName: string,
  newData: StayPeriodType
): Promise<T|undefined> => {
  try{
    console.log(hotelName);
    console.log(newData);
    const response = await hotelService
    .put(`?hotel_name=${hotelName}`, {
      "reservationDetail": `${JSON.stringify(newData)}`
    });
    return response.data;
  } catch(error) {
    console.log(error);
  }
};

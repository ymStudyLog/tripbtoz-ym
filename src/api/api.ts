import axios, { AxiosResponse } from "axios";
import { StayPeriodType } from "../types/localStorageType";

const BASE_URL = "http://localhost:8000/hotels";

export const hotelService = axios.create({ baseURL: `${BASE_URL}` });

export const getHotelInformation = async <T>(
  endpoint: string = ""
): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await hotelService.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// TODO 안쓰면 삭제하기
// export const patchReservationDetail = async (
//   _id: number,
//   _stayPeriod: StayPeriodType
// ): Promise<number | undefined> => {
//   try {
//     const response = await hotelService.patch(`/${_id}`, {
//       reservationDetail: _stayPeriod,
//     });
//     return response.status; //성공 = 2xx 상태 코드
//   } catch (error) {
//     console.log(error);
//   }
// };

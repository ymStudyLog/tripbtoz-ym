import axios, { AxiosResponse } from "axios";
import { ReservationType } from "../types";

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
};

export const saveReservation = async (
  reservationDetail: ReservationType
) => {
  try {
    await hotelService.post(`/reservations`, reservationDetail);
  } catch (error) {
    console.log(error);
  }
};

export const deleteReservation = async(id: number) => {
  try{
    await hotelService.delete(`/reservations/${id}`);
  } catch(error) {
    console.log(error);
  }
}

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
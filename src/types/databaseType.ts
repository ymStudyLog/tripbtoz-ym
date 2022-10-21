import { HeadCountType, StayPeriodType } from "./localStorageType";

export type BasicHotelDataType = {
  id: number;
  hotel_name: string;
  occupancy: {
    base: number;
    max: number;
  };
  star : number;
  address : string;
  price : number;
  review : number;
  grade : number;
  image : string;
};

export type GetDataResultType = BasicHotelDataType[] | undefined;

export type ReservationDataType = {
  hotel_id: number;
  hotel_name: string;
  headCount: HeadCountType;
  reservationDetail: StayPeriodType;
};

export type DatabaseLocalStorageType = {
  stayPeriod: StayPeriodType;
  headCount: HeadCountType;
};
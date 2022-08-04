import { HeadCountType, StayPeriodType } from "./localStorageType";

export type BasicHotelDataType = {
  id: number;
  hotel_name: string;
  occupancy: {
    base: number;
    max: number;
  };
};

export type GetDataResultType = BasicHotelDataType[] | undefined;

export type ReservationDataType = {
  hotel_id: number;
  hotel_name: string;
  headCount: HeadCountType;
  reservationDetail: StayPeriodType;
};

export type HotelDataType = {
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

export type StayPeriodType = {
  checkIn: string;
  checkOut: string;
};

export type HeadCountType = {
  adult: number;
  child: number;
};

export type GetDataResultType = HotelDataType[] | undefined;

export type ReservationDataType = {
  hotel_id: number;
  hotel_name: string;
  headCount: HeadCountType;
  reservationDetail: StayPeriodType;
};

export type LocalStorageType = {
  stayPeriod: StayPeriodType;
  headCount: HeadCountType;
};
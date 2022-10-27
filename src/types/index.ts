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

export type StayPeriodType<G> = {
  checkIn: G;
  checkOut: G;
};

export type HeadCountType<G> = {
  adult: G;
  child: G;
};

export type ReservationType = {
  id: number;
  hotel_id: number;
  hotel_name: string;
  headCount: HeadCountType<number>;
  reservationDetail: StayPeriodType<string>;
};

//TODO 안쓰면 삭제
export type LocalStorageType = {
  stayPeriod: StayPeriodType<string|null>;
  headCount: HeadCountType<number|null>;
};
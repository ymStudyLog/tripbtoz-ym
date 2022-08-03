export type StayPeriodType = {
  checkIn: string;
  checkOut: string;
};

export type HeadCountType = number;

export type ReservedHotelsType = {
  _id: number;
  hotel_name: string;
  headCount: HeadCountType;
  reservationDetail: StayPeriodType;
};

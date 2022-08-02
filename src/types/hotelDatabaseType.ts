export type HotelDatabaseType = {
  id?: number, //TODO id 추가 후 ?삭제
  hotel_name: string;
  occupancy: {
    base: number;
    max: number;
  };
  reservationDetail?: {
    checkIn: string;
    checkOut: string;
  };
}

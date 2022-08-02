export type HotelDatabaseType = {
  id: number;
  hotel_name: string;
  occupancy: {
    base: number;
    max: number;
  };
  reservationDetail?: {
    checkIn: string;
    checkOut: string;
  };
};

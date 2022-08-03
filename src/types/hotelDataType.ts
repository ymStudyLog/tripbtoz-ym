export type BasicHotelDataType = {
  id: number;
  hotel_name: string;
  occupancy: {
    base: number;
    max: number;
  };
};

export type GetDataResultType = BasicHotelDataType[] | undefined;
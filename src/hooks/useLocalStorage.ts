import { StayPeriodType, NumberOfPeopleType } from "../types/localStorageType";
import { ReservationDataType } from "../types/databaseType";

const useLocalStorage = () => {
  const setStayPeriodInStorage = (startDate: string, endDate: string) => {
    localStorage.setItem(
      "stayPeriod",
      JSON.stringify({
        checkIn: startDate,
        checkOut: endDate,
      })
    );
  };
  const setNumberOfPeopleInStorage = (adult: number, child: number) => {
    localStorage.setItem(
      "headCount",
      JSON.stringify({
        adult: adult,
        child: child,
      })
    );
  };

  const setReservationInStorage = (
    id: number,
    hotelName: string,
    stayPeriod: StayPeriodType,
    headCount: NumberOfPeopleType
  ) => {
    const prevStorageState = localStorage.getItem("reservationData");
    const newStorageState = [
      {
        hotel_id: id,
        hotel_name: hotelName,
        headCount: headCount,
        reservationDetail: {
          checkIn: stayPeriod.checkIn,
          checkOut: stayPeriod.checkOut,
        },
      },
    ];
    if (prevStorageState !== null) {
      const parsedPrevState: ReservationDataType[] =
        JSON.parse(prevStorageState);
      localStorage.setItem(
        "reservationData",
        JSON.stringify(parsedPrevState.concat(newStorageState))
      );
    } else {
      localStorage.setItem("reservationData", JSON.stringify(newStorageState));
    }
  };

  return {
    setStayPeriodInStorage,
    setNumberOfPeopleInStorage,
    setReservationInStorage,
  };
};

export default useLocalStorage;

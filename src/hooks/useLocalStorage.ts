import { saveLocalStorageData } from "../api/api";
import { StayPeriodType, HeadCountType } from "../types/localStorageType";
import { ReservationDataType } from "../types/databaseType";

const useLocalStorage = () => {
  const setStayPeriodInStorage = (startDate: string, endDate: string) => {
    const formattedPeriod: StayPeriodType = {
      checkIn: startDate,
      checkOut: endDate,
    };
    localStorage.setItem("stayPeriod", JSON.stringify(formattedPeriod));
    saveLocalStorageData("stayPeriod", { stayPeriod: formattedPeriod });
  };

  const setHeadCountInStorage = (adult: number, child: number) => {
    const formattedHead: HeadCountType = {
      adult: adult,
      child: child,
    };
    localStorage.setItem("headCount", JSON.stringify(formattedHead));
    saveLocalStorageData("headCount", { headCount: formattedHead });
  };

  //TODO 이거는 어케 합쳐 말어?? => 예약을 취소하는 버튼도 구현해서 이거랑 합치기 
  const setReservationInStorage = (
    id: number,
    hotelName: string,
    stayPeriod: StayPeriodType,
    headCount: HeadCountType
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
    setHeadCountInStorage,
    setReservationInStorage,
  };
};

export default useLocalStorage;

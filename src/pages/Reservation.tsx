import React from "react";
import ClearButton from "../components/common/ClearButton";
import useDatabase from "../hooks/useDatabase";

type Props = {};

const Reservation = (props: Props) => {
  //reservations으로 예약된 호텔 정보 보여주면 됨
  const { reservations } = useDatabase();
  console.log(reservations);

  return (
    <div>
      Reservation
      <ClearButton />
    </div>
  );
};

export default Reservation;

import React from "react";
import useDatabase from "../hooks/useDatabase";

type Props = {};

//예약 정보 확인 페이지
const Temp = (props: Props) => {
  //reservations으로 예약된 호텔 정보 보여주면 됨
  const { reservations } = useDatabase();
  console.log(reservations);

  return <div>Temp</div>;
};

export default Temp;

import React from "react";
import useDatabase from "../hooks/useDatabase";

type Props = {};

//예약 정보 확인 페이지
const Temp = (props: Props) => {
  //reservations으로 예약된 호텔 정보 보여주면 됨
  const { reservations } = useDatabase();
  console.log(reservations);
    
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <div>
      Temp
      <div style={loading ? { visibility: 'visible' } : { visibility: 'hidden' }}>
        <img
          src={"https://source.unsplash.com/300x200/?hotel"}
          alt="hotel"
          onLoad={() => {
            console.log(`이미지 로딩 성공`);
            setLoading(!loading);
          }}
          onError={() => {
            console.log(`이미지 로딩 실패`);
          }}
        />
      </div>
    </div>
  );
};

export default Temp;

import React from 'react';
import Navbar from '../layout/Navbar';

type Props = {};

const Landing = (props: Props) => {
  // 임의의 날짜, 투숙객수 로컬스토리지 저장
  React.useEffect(() => {
    localStorage.setItem(
      'stayPeriod',
      JSON.stringify({
        checkIn: '2022. 8. 10.',
        checkOut: '2022. 8. 13.',
      })
    );
    localStorage.setItem('headCount', '4');
    // return () => { //final시 주석만 제거해서 사용하기
    //   localStorage.removeItem("stayPeriod");
    //   localStorage.removeItem("headCount");
    //   localStorage.removeItem("reservedHotels");
    // }
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
};

export default Landing;

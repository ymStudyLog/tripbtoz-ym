import React from "react";
import { addReservationData } from "../../api/api";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BasicHotelDataType } from "../../types/hotelDataType";
import * as H from "../../styles/HotelItem.style";

type Props = {
  hotelData: BasicHotelDataType;
};

const HotelItem = (props: Props) => {
  const { hotelData } = props;
  const { stayPeriod, numberOfPeople, setReservationInStorage } =
    useLocalStorage();
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <H.HotelItemContainer
      style={loading ? { visibility: "visible" } : { visibility: "hidden" }}
    >
      <H.HotelImage
        src={`${hotelData.image}`}
        alt="hotel"
        onLoad={() => {
          setLoading(!loading);
        }}
        onError={() => {
          console.log(`이미지 로딩 실패`);
        }}
      />
      <H.HotelInfoWrapper>
        <H.Classification>{hotelData.star.toFixed(1)}성급</H.Classification>
        <H.Name>{hotelData.hotel_name}</H.Name>
        <H.Address>{hotelData.address}</H.Address>
        <H.Review>
          <p>{hotelData.grade}</p>
          <p>총 {hotelData.review.toLocaleString("ko-KR")}건의 리뷰</p>
        </H.Review>
      </H.HotelInfoWrapper>

      <H.PriceAndButtonWrapper>
        <H.MakeReservationButton
          type="button"
          onClick={() => {
            setReservationInStorage(hotelData.id, hotelData.hotel_name);
            addReservationData({
              hotel_id: hotelData.id,
              hotel_name: hotelData.hotel_name,
              headCount: numberOfPeople.adult + numberOfPeople.child,
              reservationDetail: stayPeriod,
            });
          }}
        >
          예약
        </H.MakeReservationButton>
        <H.HotelPriceWrapper>
          <H.Price>{hotelData.price.toLocaleString("ko-KR")}원</H.Price>
          <H.Subtext>세금 및 수수료 불포함</H.Subtext>
        </H.HotelPriceWrapper>
      </H.PriceAndButtonWrapper>
    </H.HotelItemContainer>
  );
};

export default HotelItem;

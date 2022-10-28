import React from "react";
import { saveReservation } from "../../api/api";
import { HotelDataType, LocalStorageType } from "../../types";
import * as H from "../../styles/HotelItem.style";

type Props = {
  hotelData: HotelDataType;
  currentChoice: LocalStorageType;
};

const HotelItem = (props: Props) => {
  const { hotelData, currentChoice } = props;
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
            if (currentChoice !== undefined) {
              saveReservation({
                hotel_id: hotelData.id,
                hotel_name: hotelData.hotel_name,
                headCount: currentChoice.headCount,
                reservationDetail: currentChoice.stayPeriod,
              });
            }
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

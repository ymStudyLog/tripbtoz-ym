import React from "react";
import styled from "styled-components";
import { addReservationData } from "../../api/api";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BasicHotelDataType } from "../../types/hotelDataType";
import { MakeReservationButton, HotelItemContainer } from "../../styles/HotelItem.style";
import { HeadCountType, StayPeriodType } from "../../types/localStorageType";

type Props = {
  hotelData: BasicHotelDataType;
  stayPeriod : StayPeriodType;
  headCount : HeadCountType;
};

const HotelItem = (props: Props) => {
  const { hotelData, stayPeriod, headCount } = props;
  // console.log("hotelitem", hotelData, stayPeriod, headCount);
  const { setReservationInStorage } = useLocalStorage();
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <HotelItemContainer
      style={loading ? { visibility: "visible" } : { visibility: "hidden" }}
    >
      <HotelImage
        src={`${hotelData.image}`}
        alt="hotel"
        onLoad={() => {
          setLoading(!loading);
        }}
        onError={() => {
          console.log(`이미지 로딩 실패`);
        }}
      />
      <HotelInfoWrapper>
        <Classification>{hotelData.star.toFixed(1)}성급</Classification>
        <Name>{hotelData.hotel_name}</Name>
        <Address>{hotelData.address}</Address>
        <Review>
          <p>{hotelData.grade}</p>
          <p>총 {hotelData.review.toLocaleString("ko-KR")}건의 리뷰</p>
        </Review>
      </HotelInfoWrapper>

      <PriceAndButtonWrapper>
        <MakeReservationButton
          type="button"
          onClick={() => {
            setReservationInStorage(hotelData.id, hotelData.hotel_name, stayPeriod, headCount);
            addReservationData({
              hotel_id: hotelData.id,
              hotel_name: hotelData.hotel_name,
              headCount: headCount,
              reservationDetail: stayPeriod,
            });
          }}
        >
          예약
        </MakeReservationButton>
        <HotelPriceWrapper>
          <Price>{hotelData.price.toLocaleString("ko-KR")}원</Price>
          <Subtext>세금 및 수수료 불포함</Subtext>
        </HotelPriceWrapper>
      </PriceAndButtonWrapper>
    </HotelItemContainer>
  );
};

export default HotelItem;

const HotelImage = styled.img`
  width: 300px;
`;

const HotelInfoWrapper = styled.div`
  padding: 20px 0 0 20px;
  width: 250px;
  line-height: 30px;
`;

const Classification = styled.div`
  border: 1px solid var(--color-black);
  width: 50px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  margin-bottom: 5px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const Address = styled.div`
  color: var(--color-subTitle);
  font-weight: 500;
  font-size: 14px;
`;

const Review = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
`;

const PriceAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const HotelPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: end;
  width: 250px;
  padding: 0 20px 20px 0;
  line-height: 30px;
`;

const Price = styled.div`
  font-size: 23px;
  font-weight: 700;
`;

const Subtext = styled.div`
  color: var(--color-border);
  font-weight: 400;
  font-size: 12px;
`;
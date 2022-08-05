import React from 'react';
import styled from 'styled-components';

type Props = {};

const HotelItem = (props: Props) => {
  return (
    <HotelItemContainer>
      <HotelImage />
      <HotelInfoWrapper>
        <Classification>3.5성급</Classification>
        <Name>UH 스위트 코너스톤</Name>
        <Address>우정국로2길 29 서울특별시</Address>
      </HotelInfoWrapper>
      <HotelPriceWrapper>
        <Price>369,537원</Price>
        <Subtext>세금 및 수수료 불포함</Subtext>
      </HotelPriceWrapper>
    </HotelItemContainer>
  );
};

export default HotelItem;

const HotelItemContainer = styled.div`
  width: 800px;
  height: 200px;
  border: 1px solid var(--color-border);
  margin-top: 20px;
  display: flex;
`;

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

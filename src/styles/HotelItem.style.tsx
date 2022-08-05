import styled from 'styled-components';

export const MakeReservationButton = styled.button`
  width: 106px;
  margin-top: 1rem;
  margin-right: 1rem;
  padding: 6px 40px;
  border-radius: 4px;
  font-size: 14px;
  background-color: var(--color-main);
  color: var(--color-white);

  @media screen and (max-width: 480px) {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const HotelItemContainer = styled.div`
  width: 800px;
  height: 200px;
  border: 1px solid var(--color-border);
  margin-top: 20px;
  display: flex;

  @media screen and (max-width: 480px) {
    width: 480px;
  }
`;

export const HotelImage = styled.img`
  width: 300px;

  @media screen and (max-width: 480px) {
    width: 150px;
  }
`;

export const HotelInfoWrapper = styled.div`
  padding: 20px 0 0 20px;
  width: 250px;
  line-height: 30px;

  @media screen and (max-width: 480px) {
    width: 180px;
    line-height: 23px;
  }
`;

export const Classification = styled.div`
  border: 1px solid var(--color-black);
  width: 50px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  margin-bottom: 5px;
`;

export const Name = styled.div`
  font-size: 20px;
  font-weight: 700;

  @media screen and (max-width: 480px) {
    font-size: 15px;
  }
`;

export const Address = styled.div`
  color: var(--color-subTitle);
  font-weight: 500;
  font-size: 14px;
`;

export const Review = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;

  @media screen and (max-width: 480px) {
    font-size: 12px;
    width: 110px;
  }
`;

export const PriceAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  @media screen and (max-width: 480px) {
    width: 160px;
  }
`;

export const HotelPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: end;
  width: 250px;
  padding: 0 20px 20px 0;
  line-height: 30px;
`;

export const Price = styled.div`
  font-size: 23px;
  font-weight: 700;

  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

export const Subtext = styled.div`
  color: var(--color-border);
  font-weight: 400;
  font-size: 12px;
`;

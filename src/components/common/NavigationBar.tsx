import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {};

const NavigationBar = (props: Props) => {
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate("/");
    window.localStorage.clear();
  };

  const handleToReservation = () => {
    navigate("/reservation");
  };

  return (
    <NavigationBarWrapper>
      <NavigationBarContainer>
        <LogoContainer>
          <LogoImage
            src="./images/logo-black-tripbtoz.png"
            onClick={handleLogo}
          />
        </LogoContainer>
        <NavigationBarMenuItems>
          <CustomerService>고객센터</CustomerService>
          <ReservationList onClick={handleToReservation}>
            예약확인
          </ReservationList>
        </NavigationBarMenuItems>
      </NavigationBarContainer>
    </NavigationBarWrapper>
  );
};

export default NavigationBar;

const NavigationBarWrapper = styled.nav`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavigationBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 800px;
`;

const LogoContainer = styled.div`
  width: 160px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const NavigationBarMenuItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  height: 48px;
  font-size: 17px;
  padding-right: 8px;
`;

const CustomerService = styled.div`
  cursor: pointer;
`;

const ReservationList = styled.div`
  cursor: pointer;
`;

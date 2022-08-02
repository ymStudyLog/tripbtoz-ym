import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate('/');
  };

  const handleToReservation = () => {
    navigate('/reservation');
  };

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoContainer>
          <LogoImage src='./images/logo-black-tripbtoz.png' onClick={handleLogo} />
        </LogoContainer>
        <NavbarMenuItems>
          <CustomerService>고객센터</CustomerService>
          <ReservationList onClick={handleToReservation}>예약확인</ReservationList>
        </NavbarMenuItems>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled.nav`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 70%;
`;

const LogoContainer = styled.div`
  width: 10rem;
  height: 3rem;
  display: flex:
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const NavbarMenuItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 11rem;
  height: 3rem;
  font-size: 1.1rem;
`;

const CustomerService = styled.div`
  cursor: pointer;
`;

const ReservationList = styled.div`
  cursor: pointer;
`;

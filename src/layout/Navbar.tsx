import React from 'react';
import styled from 'styled-components';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoContainer>
          <LogoImage src='./images/logo-black-tripbtoz.png' />
        </LogoContainer>
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
  border: 3px solid red;
`;

const NavbarContainer = styled.div`
  display: flex;
  //justify-content: space-between;
  height: 100%;
`;

const LogoContainer = styled.div`
  width: 125px;
  height: 31px;
  display: flex:
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
`;

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Main } from "./Main";

const Header = () => {
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate("/");
    window.localStorage.clear();
    //TODO 페이지 리프레시까지 하게 해줘야됨 (로컬스토리지 비우고->수동으로 리렌더링해야 비워진 로컬스토리지 데이터가 서치바에 남아있지 않음)
  };

  const handleToReservation = () => {
    navigate("/reservation");
  };

  return (
    <HeaderContainer>
      <WidthContainer>
        <LogoContainer>
          <LogoImage
            src="./images/logo-black-tripbtoz.png"
            onClick={handleLogo}
          />
        </LogoContainer>
        <MenuContainer>
          <MenuButton>고객센터</MenuButton>
          <MenuButton onClick={handleToReservation}>예약확인</MenuButton>
        </MenuContainer>
      </WidthContainer>
    </HeaderContainer>
  );
};

export default Header;

//TODO sticky? fixed?(EmptyVolume 만들어서 넣어줘야 됨) => 위에 고정할거면 top 버튼 있는게 좋을 듯
const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  height: 80px;
`;

export const WidthContainer = styled(Main)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LogoImage = styled.img`
  max-width: 160px;
  height: auto;
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  height: 48px;
  font-size: 17px;

  @media screen and (max-width: 480px) {
    width: auto;
  }
`;

const MenuButton = styled.div`
  cursor: pointer;

  @media screen and (max-width: 480px) {
    margin-left: 10px;
  }
`;

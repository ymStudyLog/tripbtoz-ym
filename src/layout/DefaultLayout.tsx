import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const DefaultLayout = () => {
  return (
    <Background>
      <Header />
      <Outlet />
    </Background>
  );
};

export default DefaultLayout;

const Background = styled.div`
  min-height: 100vh;
  background-image: url("./images/background.jpg");
  background-size: 100% 100vh;
  background-repeat: repeat-y;
`;
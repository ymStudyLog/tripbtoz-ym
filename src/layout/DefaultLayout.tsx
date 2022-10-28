import styled from "styled-components";
import Header from "./Header";
import { Main } from "./Main";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const DefaultLayout = (props: Props) => {
  const { children } = props;

  return (
    <Background>
      <Header />
      <Main>{children}</Main>
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

import React from "react";
import styled from "styled-components";
import SearchBar from "../components/common/SearchBar";
// import { Outlet } from "react-router-dom"; //TODO 왜 Outlet 안 먹힘?
import { useLocation } from "react-router-dom";
import { Main } from "./Main";
import Header from "./Header";

type Props = {
  children: React.ReactElement;
};

const DefaultLayout = (props: Props) => {
  const { children } = props;
  const location = useLocation().pathname;

  return (
    <Background>
      <Header />
      <Main>
        <SearchBarPositioner>
          {location === "/reservation" ? null : (
            <SearchBar endpoint={location} />
          )}
        </SearchBarPositioner>
        {children}
      </Main>
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

const SearchBarPositioner = styled.div`
  width: 0;
  height: 0;
  position: relative;
`;

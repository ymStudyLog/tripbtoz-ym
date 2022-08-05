import React from "react";
import styled from "styled-components";
import SearchBar from "../components/common/SearchBar";

const Landing = () => {
  return (
    <>
      <BackgroundImageWrapper>
        <BackgroundImage src="./images/background.jpg" />
      </BackgroundImageWrapper>
      <LandingContentsContainer>
        <CatchphraseWrapper>
          <Catchphrase>Play Share Stay, 트립비토즈</Catchphrase>
        </CatchphraseWrapper>
        <SearchBar />
      </LandingContentsContainer>
    </>
  );
};

export default Landing;

const BackgroundImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
`;

const LandingContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 300px;
`;

const CatchphraseWrapper = styled.div`
  width: 800px;
`;

const Catchphrase = styled.div`
  font-weight: 700;
  font-size: 34px;
  color: var(--color-catchphrase);
`;

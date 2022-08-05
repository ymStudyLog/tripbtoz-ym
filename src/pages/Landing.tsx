import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import SearchBar from '../components/common/SearchBar';

const Landing = () => {
  const isMobile = useMediaQuery({ maxWidth: 480 });

  // TODO final 제출 전에 삭제
  React.useEffect(() => {
    localStorage.setItem(
      'stayPeriod',
      JSON.stringify({
        checkIn: '2022. 8. 18.',
        checkOut: '2022. 8. 20.',
      })
    );
    localStorage.setItem('headCount', '4');
  }, []);

  return (
    <>
      <BackgroundImageWrapper>
        <BackgroundImage src='./images/background.jpg' />
      </BackgroundImageWrapper>
      {isMobile ? (
        <TestCalendarWrapper>
          <TestCalendarModal />
          <TestCalendarModal />
          <TestCalendarModal />
        </TestCalendarWrapper>
      ) : (
        <LandingContentsContainer>
          <CatchphraseWrapper>
            <Catchphrase>Play Share Stay, 트립비토즈</Catchphrase>
          </CatchphraseWrapper>
          <SearchBar />
        </LandingContentsContainer>
      )}
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

  @media screen and (max-width: 480px) {
    display: none;
  }
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

  @media screen and (max-width: 850px) {
    width: 500px;
    transition: 0.8s all ease;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const Catchphrase = styled.div`
  font-weight: 700;
  font-size: 34px;
  color: var(--color-catchphrase);
`;

const TestCalendarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TestCalendarModal = styled.div`
  width: 400px;
  min-height: 300px;
  border: 2px solid red;
  background-color: var(--color-red);
`;

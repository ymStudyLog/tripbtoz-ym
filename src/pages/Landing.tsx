import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import SearchBar from '../components/common/SearchBar';
import SelectButton from '../components/mobile/MSelectButton';
import MSearchBar from '../components/mobile/MSearchBar';

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
      {isMobile ? (
        <MobileBackground>
          <MSearchBar />
          {/* <TestCalendarWrapper>
            <TestCalendarModal />
            <TestCalendarModal />
            <TestCalendarModal />
          </TestCalendarWrapper> */}
          <SelectButton />
        </MobileBackground>
      ) : (
        <>
          <BackgroundImageWrapper>
            <BackgroundImage src='./images/background.jpg' />
          </BackgroundImageWrapper>
          <LandingContentsContainer>
            <CatchphraseWrapper>
              <Catchphrase>Play Share Stay, 트립비토즈</Catchphrase>
            </CatchphraseWrapper>
            <SearchBar />
          </LandingContentsContainer>
        </>
      )}
    </>
  );
};

export default Landing;

const MobileBackground = styled.div`
  background-color: var(--color-mobileBackground);
`;

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

const TestCalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TestCalendarModal = styled.div`
  width: 480px;
  min-height: 400px;
  border: 2px solid red;
  background-color: var(--color-red);
`;

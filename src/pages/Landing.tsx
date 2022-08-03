import React from 'react';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';

const Landing = () => {
  // 임의의 날짜, 투숙객수 로컬스토리지 저장
  React.useEffect(() => {
    localStorage.setItem(
      'stayPeriod',
      JSON.stringify({
        checkIn: '2022. 8. 10.',
        checkOut: '2022. 8. 13.',
      })
    );
    localStorage.setItem('headCount', '4');
    // return () => { //final시 주석만 제거해서 사용하기
    //   localStorage.removeItem("stayPeriod");
    //   localStorage.removeItem("headCount");
    //   localStorage.removeItem("reservedHotels");
    // }
  }, []);

  return (
    <>
      <NavigationBar />
      <BackgroundImageWrapper>
        <BackgroundImage src='./images/bg-10.svg' />
      </BackgroundImageWrapper>
      <LandingContentsContainer>
        <CatchphraseWrapper>
          <Catchphrase>Play Share Stay, 트립비토즈</Catchphrase>
        </CatchphraseWrapper>
        <SearchBarWrapper>
          <SearchBar />
        </SearchBarWrapper>
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
  width: 95%;
  position: absolute;
  z-index: -1;
  top: 0;
`;

const LandingContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 40%;
`;

const CatchphraseWrapper = styled.div`
  width: 50%;
`;

const Catchphrase = styled.div`
  font-weight: 700;
  font-size: 2.1rem;
`;

const SearchBarWrapper = styled.div`
  height: 3.5rem;
  width: 50%;
  margin-top: 2rem;
`;

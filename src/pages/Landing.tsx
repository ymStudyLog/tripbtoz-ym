import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/common/SearchBar';

const Landing = () => {
  // TODO landing 페이지에서 로컬스토리지 저장 성공하면 삭제 예정
  React.useEffect(() => {
    localStorage.setItem(
      'stayPeriod',
      JSON.stringify({
        checkIn: '2022. 8. 10.',
        checkOut: '2022. 8. 13.',
      })
    );
    localStorage.setItem('headCount', '4');
  }, []);

  return (
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
`;

const Catchphrase = styled.div`
  font-weight: 700;
  font-size: 34px;
  color: var(--color-catchphrase);
`;

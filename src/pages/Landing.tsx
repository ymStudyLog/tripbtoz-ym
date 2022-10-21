import styled from "styled-components";

const Landing = () => {
  //TODO 모달이 오픈 => 컴포넌트 위에 떠있는 상태라서 컴포넌트 height가 자동으로 조절되지 않는다 =>
  return (
    <LandingContainer>
      <CatchPhrase>Play Share Stay, 트립비토즈</CatchPhrase>
    </LandingContainer>
  );
};

export default Landing;

const LandingContainer = styled.div`
  max-width: auto;
  height: 120vh;
  padding-top: 150px;

  @media screen and (max-width: 480px) {
    padding-top: 80px;
  }
`;

const CatchPhrase = styled.div`
  max-width: 800px;
  font-weight: 700;
  font-size: 34px;
  color: var(--color-catchphrase);

  @media screen and (max-width: 480px) {
    font-size: 28px;
    padding-left: 5px;
  }
`;

// const TestCalendarWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const TestCalendarModal = styled.div`
//   width: 480px;
//   min-height: 400px;
//   border: 2px solid red;
//   background-color: var(--color-red);
// `;

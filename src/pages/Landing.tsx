import styled from "styled-components";

const Landing = () => {
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
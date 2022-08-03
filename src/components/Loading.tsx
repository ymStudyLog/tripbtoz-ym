import React from "react";
import styled from "styled-components";

type Props = {};

//TODO 로딩바 예쁘게 만들기
const Loading = (props: Props) => {
  return <LoadingContainer>Loading...</LoadingContainer>;
};

export default Loading;

const LoadingContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: yellow;
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

import React from "react";
import styled from "styled-components";

type Props = {};

//TODO reservation 페이지 레이아웃 완료되면 그거 가져다가 로딩바 만들기 트립비토즈 로딩바 참고
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

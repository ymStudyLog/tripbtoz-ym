import React from 'react';
import styled from 'styled-components';

type Props = {};

const MSearchBar = (props: Props) => {
  return (
    <MSearchBarContainer>
      <MCheckInOutContainer>
        <MCheckInOutDate>2022.08.12</MCheckInOutDate>
        <Duration>~</Duration>
        <MCheckInOutDate>2022.08.15</MCheckInOutDate>
      </MCheckInOutContainer>
      <MGuestInfoContainer>
        <SubMenuWrapper>
          <SubMenuTitle>성인</SubMenuTitle>
          <SubMenuContents>2</SubMenuContents>
        </SubMenuWrapper>
        <SubMenuWrapper>
          <SubMenuTitle>아이</SubMenuTitle>
          <SubMenuContents>0</SubMenuContents>
        </SubMenuWrapper>
      </MGuestInfoContainer>
    </MSearchBarContainer>
  );
};

export default MSearchBar;

const MSearchBarContainer = styled.div`
  display: flex;
  height: 100px;
  background-color: var(--color-white);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
`;

const MCheckInOutContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--color-border);
`;

const Duration = styled.div`
  color: var(--color-main);
  margin: 5px 0;
`;

const MCheckInOutDate = styled.div`
  font-size: 18px;
`;

const MGuestInfoContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SubMenuWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-size: 18px;
`;

const SubMenuTitle = styled.div`
  display: flex;
  margin-right: 10px;
`;

const SubMenuContents = styled.div`
  color: var(--color-main);
`;

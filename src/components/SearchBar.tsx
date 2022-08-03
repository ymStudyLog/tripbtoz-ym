import React from 'react';
import styled from 'styled-components';
import { VscCalendar } from 'react-icons/vsc';

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <SearchBarContainer>
      <IconWrapper>
        <VscCalendar />
      </IconWrapper>
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 100%;
  font-size: 1.8rem;
  border-right: 1px solid var(--color-border);
`;

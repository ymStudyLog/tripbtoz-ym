import styled from "styled-components";
import { VscCalendar } from "react-icons/vsc";
import { IoPersonOutline } from "react-icons/io5";

export const SearchBarContainer = styled.div<{ endpoint: string }>`
  position: absolute;
  top: ${(props) => (props.endpoint === "/" ? "200px" : 0)};
  width: 800px;
  height: 60px;
  background-color: var(--color-white);
  border: 1.5px solid var(--color-border);
  display: flex;

  @media screen and (max-width: 480px) {
    width: 480px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 100%;
  font-size: 28px;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

export const CalenderIcon = () => {
  return (
    <IconContainer>
      <VscCalendar />
    </IconContainer>
  );
};

export const PersonIcon = () => {
  return (
    <IconContainer>
      <IoPersonOutline />
    </IconContainer>
  );
};

export const CheckInOutContainer = styled.div`
  display: flex;
  width: 320px;
  margin-left: 0 24px;
  border-right: 1.5px solid var(--color-border);
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: var(--color-hover);
  }

  @media screen and (max-width: 480px) {
    width: 240px;
  }
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

//TODO 너비 조정
export const CheckInOut = styled(StyledDiv)`
  width: 144px;
`;

export const CheckIn = styled(CheckInOut)`
  align-items: flex-start;
  padding-left: 16px;
`;

export const CheckOut = styled(CheckInOut)`
  align-items: flex-end;
  padding-right: 16px;
`;

//TODO 너비 조정
export const GuestInfo = styled(StyledDiv)`
  align-items: flex-start;
  width: 320px;
  padding-left: 16px;

  @media screen and (max-width: 480px) {
    width: 180px;
  }
`;

export const ValueTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-subTitle);
`;

export const Value = styled.div`
  font-size: 17.6px;
  font-weight: 700;
  margin-top: 8px;
`;

//TODO span으로 바꿔서 반응형시 옮기기?
export const StayPeriodText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  color: var(--color-subTitle);
`;

export const GuestInfoContainer = styled.div`
  display: flex;
  width: 272px;
  margin-left: 0 24px;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: var(--color-hover);
  }

  @media screen and (max-width: 480px) {
    width: 240px;
  }
`;

export const SearchIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  font-size: 35px;
  background-color: var(--color-main);
  color: var(--color-white);
  cursor: pointer;

  @media screen and (max-width: 480px) {
    width: 80px;
    font-size: 30px;
  }
`;

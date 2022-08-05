import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MakeReservationButton } from "../../styles/HotelItem.style";

const ClearButton = () => {
  const navigate = useNavigate();
  return (
    <StyledButton
      onClick={() => {
        window.localStorage.clear();
        navigate("/");
      }}
    >
      홈으로
    </StyledButton>
  );
};

export default ClearButton;

const StyledButton = styled(MakeReservationButton)``;
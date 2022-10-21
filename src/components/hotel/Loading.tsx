import styled from "styled-components";
import PageContainer from "../../layout/PageContainer";
import { HotelItemContainer } from "../../styles/HotelItem.style";
import { HOTELDATA_PER_PAGE } from "../../utils/infiniteScroll";
import { v4 as uuidv4 } from "uuid";

const Loading = () : JSX.Element => {
  const loadingRepetition = new Array(HOTELDATA_PER_PAGE).fill(0);
  return (
    <LoadingContainer>
      {loadingRepetition.map((index) => {
        return <LoadingItem key={uuidv4()}/>;
      })}
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled(PageContainer)``;

const LoadingItem = styled(HotelItemContainer)`
  background-color: var(--color-loading);
  border-color: var(--color-loading) !important;
`;

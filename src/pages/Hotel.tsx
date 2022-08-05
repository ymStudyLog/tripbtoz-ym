import styled from 'styled-components';
import SearchBar from '../components/common/SearchBar';
import HotelList from '../components/hotelList/HotelList';

const Reservation = () => {
  return (
    <>
      <ReservationContainer>
        <SearchBar />
        <HotelList />
      </ReservationContainer>
    </>
  );
};

export default Reservation;

const ReservationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

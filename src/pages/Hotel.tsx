import styled from 'styled-components';
import SearchBar from '../components/common/SearchBar';
//import HotelList from '../components/HotelList';
import HotelItem from '../components/hotelList/HotelItem';

const Reservation = () => {
  return (
    <>
      <ReservationContainer>
        <SearchBar />
        {/* <HotelList /> */}
        <HotelItem />
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

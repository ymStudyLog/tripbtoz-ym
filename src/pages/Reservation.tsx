import HotelList from "../components/HotelList";

const Reservation = () => {
  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem("reservedHotels");
        }}
      >
        로컬스토리지 초기화
      </button>
      <HotelList />
    </>
  );
};

export default Reservation;
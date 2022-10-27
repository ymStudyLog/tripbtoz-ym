import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import Landing from "../pages/Landing";
import Hotel from "../pages/Hotel";
import Reservation from "../pages/Reservation";
import SearchBar from "../layout/SearchBar";

const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<DefaultLayout />}>
        <Route path="" element={<SearchBar />}>
          <Route path="" element={<Landing />} />
          <Route path="hotel" element={<Hotel />} />
          <Route path="reservation" element={<Reservation />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;

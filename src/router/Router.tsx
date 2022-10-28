import { Route, Routes } from "react-router-dom";
import LayoutPage from "../pages/LayoutPage";
import Landing from "../pages/Landing";
import Hotel from "../pages/Hotel";
import Reservation from "../pages/Reservation";

const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<LayoutPage />}>
        <Route path="" element={<Landing />} />
        <Route path="hotel" element={<Hotel />} />
        <Route path="reservation" element={<Reservation />} />
      </Route>
    </Routes>
  );
};

export default Router;

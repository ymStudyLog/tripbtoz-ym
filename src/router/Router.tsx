import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Reservation from "../pages/Reservation";
import Temp from "../pages/Temp";

type Props = {};

const Router = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/temp" element={<Temp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

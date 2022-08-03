import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import Reservation from '../pages/Reservation';
import Test from "../pages/Test"

type Props = {};

const Router = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/reservation' element={<Reservation />} />
        <Route path='test' element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

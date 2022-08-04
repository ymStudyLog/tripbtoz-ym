import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calendar from '../components/calendar/Calendar';
import Landing from '../pages/Landing';
import Reservation from '../pages/Reservation';

type Props = {};

const Router = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/reservation' element={<Reservation />} />
        <Route path='/calendar' element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

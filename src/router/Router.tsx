import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from '../components/common/NavigationBar';
import Landing from '../pages/Landing';
import Hotel from '../pages/Hotel';
import Reservation from '../pages/Reservation';

type Props = {};

const Router = (props: Props) => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/hotel' element={<Hotel />} />
        <Route path='/reservation' element={<Reservation />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

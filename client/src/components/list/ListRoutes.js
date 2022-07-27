import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RescueList from './RescueList';
import ShelterList from './ShelterList';
import ShelterCodeList from './ShelterCodeList';
import RescueDetail from './RescueDetail';

function ListRoutes() {
  return (
    <Routes>
      <Route path="" element={<RescueList />} />
      <Route path="rescue/:id" element={<RescueDetail />} />
      <Route path="shelter" element={<ShelterList />} />
      <Route path="shelter/:id" element={<ShelterCodeList />} />
    </Routes>
  );
}

export default ListRoutes;

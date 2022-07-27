import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LostDetail from './LostDetail';
import LostPost from './LostPost';
import LostEdit from './LostEdit';
import LostList from '../list/LostList';

function LostRouter() {
  return (
    <Routes>
      <Route path="/list" element={<LostList />} />
      <Route path="/post" element={<LostPost />} />
      <Route path="/:id" element={<LostDetail />} />
      <Route path="/:id/edit" element={<LostEdit />} />
    </Routes>
  );
}

export default LostRouter;

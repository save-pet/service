import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EditInfo from './EditInfo';
import UserLostList from './UserLostList';
import Leave from './Leave';

function MyPageRoutes() {
  return (
    <Routes>
      <Route path="" element={<EditInfo />} />
      <Route path="/lost-list" element={<UserLostList />} />
      <Route path="/leave" element={<Leave />} />
    </Routes>
  );
}

export default MyPageRoutes;

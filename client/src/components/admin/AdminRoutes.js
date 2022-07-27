import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManageUser from './ManageUser';
import AdminLostList from './AdminLostList';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="" element={<ManageUser />} />
      <Route path="/lost-list" element={<AdminLostList />} />
    </Routes>
  );
}

export default AdminRoutes;

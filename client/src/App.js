import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './_layout/header/Header';
import HamburgerMenu from './_layout/header/HamburgerMenu';
import RescueList from './components/list/RescueList';
import MapView from './components/map/MapView';
import EditInfo from './components/mypage/EditInfo';
import UserLostList from './components/mypage/UserLostList';
import Leave from './components/mypage/Leave';
import ManageUser from './components/admin/ManageUser';
import AdminLostList from './components/admin/AdminLostList';
import LostPost from './components/lost/LostPost';
import LostDetail from './components/lost/LostDetail';
import LostList from './components/list/LostList';
import ShelterList from './components/list/ShelterList';
import RescueDetail from './components/list/RescueDetail';
import LostEdit from './components/lost/LostEdit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <HamburgerMenu />
        <Routes>
          <Route path="/" element={<RescueList />} />
          <Route path="/rescue/:id" element={<RescueDetail />} />
          <Route path="/lostMap" element={<MapView />} />
          <Route path="/mypage" element={<EditInfo />} />
          <Route path="/mypage/lost-list" element={<UserLostList />} />
          <Route path="/mypage/leave" element={<Leave />} />
          <Route path="/admin" element={<ManageUser />} />
          <Route path="/admin/lost-list" element={<AdminLostList />} />
          <Route path="/lost/post" element={<LostPost />} />
          <Route path="/lost/:id" element={<LostDetail />} />
          <Route path="/lost/:id/edit" element={<LostEdit />} />
          <Route path="/lost/list" element={<LostList />} />
          <Route path="/shelter/:id" element={<ShelterList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

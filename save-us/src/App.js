import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './_layout/header/Header';
import HamburgerMenu from './_layout/header/HamburgerMenu';
import Main from './pages/Main';
import MapView from './components/map/MapView';
import EditInfo from './components/mypage/EditInfo';
import UserLostList from './components/mypage/LostList';
import ManageUser from './components/admin/ManageUser';
import AdminLostList from './components/admin/AdminLostList';
import LostPost from './components/post/LostPost';
import LostDetail from './components/post/LostDetail';
import LostList from './components/post/LostList';
import ShelterList from './components/shelter/ShelterList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <HamburgerMenu />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/lostMap" element={<MapView />} />
          <Route path="/mypage" element={<EditInfo />} />
          <Route path="/mypage/lost-list" element={<UserLostList />} />
          <Route path="/admin" element={<ManageUser />} />
          <Route path="/admin/lost-list" element={<AdminLostList />} />
          <Route path="/lost/post" element={<LostPost />} />
          <Route path="/lost/:id" element={<LostDetail />} />
          <Route path="/lost/list" element={<LostList />} />
          <Route path="/shelter/:shelter-id" element={<ShelterList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

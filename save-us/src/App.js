import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import axios from 'axios';
import Header from './_layout/header/Header';
import HamburgerMenu from './_layout/header/HamburgerMenu';
import Main from './pages/Main';
import MapView from './components/map/MapView';
import EditInfo from './components/mypage/EditInfo';
import LostList from './components/mypage/LostList';
import ManageUser from './components/admin/ManageUser';
import LostPostList from './components/admin/LostPostList';
import SeePostList from './components/admin/SeePostList';

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
          <Route path="/mypage/lostList" element={<LostList />} />
          <Route path="/admin" element={<ManageUser />} />
          <Route path="/admin/lostPostList" element={<LostPostList />} />
          <Route path="/admin/seePostList" element={<SeePostList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

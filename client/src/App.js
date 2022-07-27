import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './_layout/header/Header';
import HamburgerMenu from './_layout/header/HamburgerMenu';
import MapView from './components/map/MapView';
import MyPageRoutes from './components/mypage/MypageRoutes';
import LostRoutes from './components/lost/LostRoutes';
import ListRoutes from './components/list/ListRoutes';
import AdminRoutes from './components/admin/AdminRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <HamburgerMenu />
        <Routes>
          <Route path="/*" element={<ListRoutes />} />
          <Route path="/lostMap" element={<MapView />} />
          <Route path="/mypage/*" element={<MyPageRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/lost/*" element={<LostRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

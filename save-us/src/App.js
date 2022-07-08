import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './_layout/header/Header';
import HamburgerMenu from './_layout/header/HamburgerMenu';
import Main from './pages/Main';
<<<<<<< HEAD
=======
import MapView from './components/map/MapView';
// import Mypage from './components/mypage/Mypage';
>>>>>>> 2e68202e33e5510414feb27bc17c42786eb609f0

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Main />
=======
      <BrowserRouter>
        <Header />
        <HamburgerMenu />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/lostMap" element={<MapView />} />
        </Routes>
      </BrowserRouter>
>>>>>>> 2e68202e33e5510414feb27bc17c42786eb609f0
    </div>
  );
}

export default App;

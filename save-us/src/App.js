import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './_layout/header/Header';
import HamburgerMenu from './_layout/header/HamburgerMenu';
import Main from './pages/Main';
import MapView from './components/map/MapView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <HamburgerMenu />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/lostMap" element={<MapView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

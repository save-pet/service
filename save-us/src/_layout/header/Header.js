import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import LOGO from './MainLogo.png';

function Header() {
  return (
    <div
      className="header-container"
      style={{
        backgroundColor: '#FFD149',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <div>
        <HamburgerMenu />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" component={Link} to="/">
            회원가입
          </button>
          <button type="button" component={Link} to="/">
            로그인
          </button>
        </div>
      </div>

      <Link to="/" style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          className="main-LOGO"
          src={LOGO}
          alt="Main LOGO that has a cat and a dog in a box"
          style={{ width: '100px' }}
        />
      </Link>
    </div>
  );
}

export default Header;

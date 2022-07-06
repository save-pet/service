import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './MainLogo.png';

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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/">≡</Link>
        <div>
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
          className="main-logo"
          src={Logo}
          alt="Mang logo that has a cat and a dog in a box"
          style={{ width: '100px' }}
        />
      </Link>
    </div>
  );
}

export default Header;

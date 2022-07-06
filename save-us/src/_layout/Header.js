import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './MainLogo.png';

function Header() {
  return (
    <div
      className="header-container"
      style={{ backgroundColor: '#FFD149', height: '200px' }}
    >
      <Link to="/">≡</Link>
      <Link to="/">
        <img
          className="main-logo"
          src={Logo}
          alt="Mang logo that has a cat and a dog in a box"
          style={{ width: '100px' }}
        />
      </Link>
      <button type="button" component={Link} to="/">
        회원가입
      </button>
      <button type="button" component={Link} to="/">
        로그인
      </button>
    </div>
  );
}

export default Header;

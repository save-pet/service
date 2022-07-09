import React from 'react';
import { Link } from 'react-router-dom';
import LOGO from './MainLogo.png';
import ModalBtn from '../../components/login/ModalBtn';
// import ModalBtn2 from '../../components/login/ModalOther';

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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ModalBtn
            buttonName="로그인"
            title="로그인"
            content={<div>test</div>}
          />
          <ModalBtn
            buttonName="회원가입"
            title="회원가입"
            content={<div>test</div>}
          />
          {/* <ModalBtn2 /> */}
          {/* <button type="button" component={Link} to="/">
            회원가입
          </button>
          <button type="button" component={Link} to="/">
            로그인
          </button> */}
        </div>
      </div>

      <Link to="/" style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          className="main-LOGO"
          src={LOGO}
          alt="Main LOGO that has a cat and a dog in a box"
          style={{ width: '150px' }}
        />
      </Link>
    </div>
  );
}

export default Header;

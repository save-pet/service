import React from 'react';
import { Link } from 'react-router-dom';
import LOGO from './MainLogo.png';
import ModalButton from '../../components/modal/ModalButton';
import LoginContent from '../../components/main/LoginContent';
import RegisterContent from '../../components/main/RegisterContent';

function Header() {
  return (
    <header
      className="header-container"
      style={{
        backgroundColor: '#FFD149',
        height: '15vh',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'sticky',
        paddingTop: '5vh',
        top: '-5vh',
      }}
    >
      <div style={{ width: '125px' }} />
      <Link
        to="/"
        style={{ display: 'flex', justifyContent: 'center', width: '150px' }}
      >
        <img
          className="main-LOGO"
          src={LOGO}
          alt="Main LOGO that has a cat and a dog in a box"
          style={{ maxWidth: '100%', objectFit: 'scale-down' }}
        />
      </Link>
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ModalButton
            buttonName="로그인"
            title="로그인"
            content={<LoginContent />}
          />
          <ModalButton
            buttonName="회원가입"
            title="회원가입"
            content={<RegisterContent />}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;

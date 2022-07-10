import React from 'react';
import { Link } from 'react-router-dom';
import LOGO from './MainLogo.png';
import ModalBtn from '../../components/login/ModalBtn';
import LoginContent from '../../components/login/LoginContent';
import LoginButton from '../../components/login/LoginButton';
import RegisterContent from '../../components/Register/RegisterContent';
import RegisterButton from '../../components/Register/RegisterButton';

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
          <ModalBtn
            buttonName="로그인"
            title="로그인"
            content={<LoginContent />}
            button={
              <>
                <LoginButton />
                <RegisterButton />
              </>
            }
          />
          <ModalBtn
            buttonName="회원가입"
            title="회원가입"
            content={<RegisterContent />}
            button={<RegisterButton />}
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
    </header>
  );
}

export default Header;

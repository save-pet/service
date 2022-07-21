import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LOGO from './MainLogo.png';
import ModalButton from '../../components/modal/ModalButton';
import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';

function Header() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [didLogin, setDidLogin] = useState(sessionStorage.getItem('token'));

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_USER}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      );
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleLogout() {
    sessionStorage.removeItem('token');
    setDidLogin(null);
    alert('로그아웃 되었습니다.');
    navigate('/');
  }

  function handleMypage() {
    if (userInfo.role === 'admin-user') {
      navigate('/admin');
    } else navigate('/mypage');
  }

  useEffect(() => {
    if (didLogin) getUserInfo();
  }, [didLogin]);

  return (
    <header className="bg-yellow h-[15vh] flex justify-between sticky pt-[2vh] pb-[1vh] top-0 z-50">
      <div className="w-[180px]" />
      <Link to="/" className="flex justify-center w-[150px]">
        <img
          className="max-w-full object-scale-down"
          src={LOGO}
          alt="Main LOGO that has a cat and a dog in a box"
        />
      </Link>
      <div className="flex justify-end">
        <div className="px-2 hover:text-brown">
          {didLogin ? (
            <button type="button" onClick={handleLogout}>
              로그아웃
            </button>
          ) : (
            <ModalButton
              buttonName="회원가입"
              title="회원가입"
              content={<RegisterContent />}
            />
          )}
        </div>

        <div className="pr-4 pl-1 hover:text-brown">
          {didLogin ? (
            <button type="button" onClick={handleMypage}>
              마이페이지
            </button>
          ) : (
            <ModalButton
              buttonName="로그인"
              title="로그인"
              content={<LoginContent />}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

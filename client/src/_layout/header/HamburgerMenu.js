import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import MENU_ICON from './Hamburger.png';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px',
    },

    bmCrossButton: {
      height: '24px',
      width: '24px',
    },
    bmCross: {
      background: '#c67100',
    },
    bmMenuWrap: {
      width: '270px',
    },
    bmMenu: {
      background: '#FFD149',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em',
    },
    bmMorphShape: {
      fill: '#373a47',
    },
    bmItemList: {
      padding: '0.8em',
      height: '80%',
    },
    bmItem: {
      textDecoration: 'none',
      color: 'black',
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)',
      paddingTop: '5vh',
    },
  };

  const handlStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Menu
      width="20%"
      customBurgerIcon={<img src={MENU_ICON} alt="hamburger menu" />}
      styles={styles}
      isOpen={isOpen}
      onStateChange={(state) => handlStateChange(state)}
    >
      <div>
        <h3 className="text-2xl py-3 font-semibold">찾아줘😿</h3>
        <Link
          className="menu-item block pl-3 hover:text-brown leading-relaxed"
          to="/lost/post"
          onClick={closeMenu}
        >
          분실 등록
        </Link>
        <Link
          className="menu-item block pl-3 hover:text-brown leading-relaxed"
          to="/lost/list"
          onClick={closeMenu}
        >
          분실 목록
        </Link>
      </div>
      <div className="pt-10">
        <h3 className="text-2xl py-3 font-semibold">찾았어😹</h3>
        <Link
          className="menu-item block pl-3 hover:text-brown leading-relaxed"
          to="/"
          onClick={closeMenu}
        >
          전체 구조 목록
        </Link>
        <Link
          className="menu-item block pl-3 hover:text-brown leading-relaxed"
          to="/lostMap"
          onClick={closeMenu}
        >
          구조 지도
        </Link>
        <Link
          className="menu-item block pl-3 hover:text-brown leading-relaxed"
          to="/shelter"
          onClick={closeMenu}
        >
          보호소별 구조 목록
        </Link>
      </div>
    </Menu>
  );
}

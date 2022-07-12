import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import MENU_ICON from './MenuIcon.png';

export default function HamburgerMenu() {
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
      top: '200px',
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
  return (
    <Menu
      width="20%"
      customBurgerIcon={<img src={MENU_ICON} alt="hamburger menu" />}
      styles={styles}
    >
      <h3>찾아줘😿</h3>
      <Link className="menu-item" to="/lost/post">
        분실 등록
      </Link>
      <Link className="menu-item" to="/lost">
        분실 목록
      </Link>
      <br />
      <h3>찾았어😹</h3>
      <Link className="menu-item" to="/">
        목격 및 구조 리스트
      </Link>
      <Link className="menu-item" to="/lostMap">
        목격 및 구조 지도
      </Link>
      <br />
      <h3>봤어🙀</h3>
      <Link className="menu-item" to="/">
        목격 신고
      </Link>
    </Menu>
  );
}

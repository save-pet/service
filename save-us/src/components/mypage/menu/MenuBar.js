import { React } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Leave from '../Leave';
import ModalButton from '../../modal/ModalButton';

function MenuBar() {
  return (
    <div>
      <Menu>
        <h2>마이페이지</h2>
        <Content>
          <Link to="/mypage">개인 정보 수정</Link>
        </Content>
        <Content>
          <Link to="/mypage/lost-list">분실 신고 리스트</Link>
        </Content>
        <Content>
          <ModalButton
            buttonName="계정탈퇴"
            title="회원탈퇴안내"
            content={<Leave />}
          />
        </Content>
      </Menu>
    </div>
  );
}

const Menu = styled.menu`
  width: 20%;
  height: 300px;
  display: inline-block;
  flex-direction: column;
  align-items: left;
  margin: 0;
  padding: 10px;
`;

const Content = styled.div`
  margin: 0;
  padding: 10px;
  border: 1px solid #fafafa;
  &:hover {
    background-color: #fafafa;
    color: black;
    transition: 0.3s;
  }
`;

export default MenuBar;

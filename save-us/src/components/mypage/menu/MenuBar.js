import { React, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Modal from '../../modal/Modal';
import Leave from '../Leave';

function MenuBar() {
  const [isOpenModal, setOpenModal] = useState(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div>
      <Menu>
        <h2>마이페이지</h2>
        <Content>
          <Link to="/mypage">개인 정보 수정</Link>
        </Content>
        <Content>
          <Link to="/lostList">분실 신고 리스트</Link>
        </Content>
        <Content>
          {isOpenModal && (
            <Modal onClickToggleModal={onClickToggleModal}>
              <Leave />
            </Modal>
          )}
          <button type="button" onClick={onClickToggleModal}>
            계정 탈퇴
          </button>
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

const Content = styled.menu`
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

import { React, useState, useCallback } from 'react';
import styled from 'styled-components';
import Modal from '../modal/Modal';
import Leave from './Leave'

function Mypage() {
  const [isOpenModal, setOpenModal] = useState(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div>
      <Main>
        <Title>Mypage</Title>
        {isOpenModal && (
          <Modal onClickToggleModal={onClickToggleModal}>
            <Leave/>
          </Modal>
        )}
        <ul>
          <li>개인정보수정</li>
          <li>분실 신고 확인</li>
          <li>
            <button type='button' onClick={onClickToggleModal}>계정 탈퇴</button>
          </li>
        </ul>
      </Main>
    </div>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  text-align: center;
`;

// const DialogButton = styled.button`
//   width: 160px;
//   height: 48px;
//   background-color: #ffa000;
//   color: white;
//   font-size: 1.2rem;
//   font-weight: 400;
//   border-radius: 4px;
//   border: none;
//   cursor: pointer;

//   &:hover {
//     transform: translateY(-1px);
//   }
// `;

export default Mypage;

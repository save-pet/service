/* ref : https://phrygia.github.io/react/2021-09-21-react-modal/ */
// 사용하지 않는 코드입니다.
import { React, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import Modal from './Modal';
import Modal from '../modal/Modal';

function ModalBtn2() {
  const [isOpenModal, setOpenModal] = useState(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div>
      <Main>
        <Title>Mypage</Title>
        {isOpenModal && <Modal onClickToggleModal={onClickToggleModal} />}
        <ul>
          <li>
            <Link to="/">개인정보수정</Link>
          </li>
          <li>
            <Link to="/">분실 신고 확인</Link>
          </li>
          <li>
            <button type="button" onClick={onClickToggleModal}>
              계정 탈퇴
            </button>
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

// ModalBtn.propTypes = {
//   buttonName: PropTypes.string.isRequired,
// };

export default ModalBtn2;

/* eslint-disable */
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

function Modal({ onClickToggleModal, children }) {
  return (
    <ModalContainer>
      <DialogBox>{children}</DialogBox>
      <Backdrop
        onClick={(e) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const DialogBox = styled.dialog`
  width: 40vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgb(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 2;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;

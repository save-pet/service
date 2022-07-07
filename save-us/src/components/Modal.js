import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import LostPostMap from './post/LostPostMap';

function Modal({ closeModal }) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-close-btn">
          <button type="button" onClick={() => closeModal(false)}>
            X
          </button>
        </div>
        <div className="title">
          <h1>위치를 표시하세요.</h1>
        </div>
        <div className="body">
          <LostPostMap />
        </div>
        <div className="footer">
          <button
            type="button"
            id="cancel-button"
            onClick={() => closeModal(false)}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}
Modal.propTypes = {
  closeModal: PropTypes.string.isRequired,
};
export default Modal;

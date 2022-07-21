import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalWindow from './ModalWindow';

function ModalButton({ buttonName, title, content }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={openModal}>
        {buttonName}
      </button>
      <ModalWindow
        open={modalOpen}
        close={closeModal}
        header={title}
        content={content}
      >
        {' '}
      </ModalWindow>
    </div>
  );
}

ModalButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
};

export default ModalButton;

// ref : https://phrygia.github.io/react/2021-09-21-react-modal/

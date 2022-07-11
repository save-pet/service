/* ref : https://phrygia.github.io/react/2021-09-21-react-modal/ */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
/**
 * @param {string} place
 * @param {string} title
 */

function ModalBtn({ buttonName, title, content, button }) {
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
      <Modal
        open={modalOpen}
        close={closeModal}
        header={title}
        content={content}
        button={button}
      >
        {' '}
      </Modal>
    </div>
  );
}

ModalBtn.propTypes = {
  buttonName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  button: PropTypes.element.isRequired,
};

export default ModalBtn;

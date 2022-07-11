import React from 'react';
import './modalWindow.css';
import PropTypes from 'prop-types';

function ModalWindow({ open, close, header, content }) {
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open && (
        <section>
          <header>
            {header}
            <button type="button" className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{content}</main>
        </section>
      )}
    </div>
  );
}

ModalWindow.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
};
export default ModalWindow;

// ref : https://phrygia.github.io/react/2021-09-21-react-modal/

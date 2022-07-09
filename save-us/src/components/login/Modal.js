/* ref : https://phrygia.github.io/react/2021-09-21-react-modal/ */

import React from 'react';
import './modal.css';
import PropTypes from 'prop-types';

/**
 * @param {boolean} open
 * @param {Function} close
 * @param {string} header
 */
function Modal({ open, close, header, content, button }) {
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
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
          <footer>{button}</footer>
        </section>
      )}
    </div>
  );
}
Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  button: PropTypes.element.isRequired,
};
export default Modal;

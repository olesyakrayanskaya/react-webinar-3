import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({ modalIsOpen, children }) {
  return (
    <div className={modalIsOpen ? 'Modal' : 'Modal Modal--hidden'}>
      <div className="Modal-inner">{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  modalIsOpen: PropTypes.bool,
};

export default React.memo(Modal);

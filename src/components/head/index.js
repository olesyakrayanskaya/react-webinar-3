import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, modalIsOpen, onCartOpen}) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <button
        className={modalIsOpen ? 'Head-btn' : 'Head-btn Head-btn--hidden'}
        onClick={onCartOpen}
      >
        Закрыть
      </button>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  modalIsOpen: PropTypes.bool,
  onCartOpen: PropTypes.func,
};

Head.defaultProps = {
  onCartOpen: () => {}
}

export default React.memo(Head);

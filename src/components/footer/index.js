import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Footer({modalIsOpen}) {
    return (
      <footer className={modalIsOpen ? 'Footer' : 'Footer Footer--hidden'}>
        <span className="Footer-text">Итого</span>
        <span className="Footer-sum"></span>
      </footer>
    );
}

Footer.PropTypes = {
    modalIsOpen: PropTypes.bool,
}

export default React.memo(Footer);
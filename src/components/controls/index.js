import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onCartOpen}) {

  return (
    <div className='Controls'>
      <span className='Controls-text'>В корзине: </span>
      <span className='Controls-count'>2 товара / </span>
      <span className='Controls-sum'>223 ₽</span>
      <button onClick={onCartOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onCartOpen: PropTypes.func
};

Controls.defaultProps = {
  onCartOpen: () => {}
}

export default React.memo(Controls);

import React, { useState } from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls() {

  let [cartOpen, setCartOpen] = useState(false);

  return (
    <div className='Controls'>
      <span className='Controls-text'>В корзине: </span>
      <span className='Controls-count'>2 товара / </span>
      <span className='Controls-sum'>223 ₽</span>
      <button onClick={() => setCartOpen(cartOpen = !cartOpen)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);

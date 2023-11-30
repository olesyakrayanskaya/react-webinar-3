import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({onCartOpen, inCartList}) {

  let count = inCartList.length;

  let sum = inCartList
  .map((item) => item.count * item.good.price)
  .reduce((partialSum, a) => partialSum + a, 0); 
  
  if (inCartList.length > 0) {
    return (
      <div className="Controls">
        <span className="Controls-text">В корзине: </span>
        <span className="Controls-count">
          {count.toLocaleString() +
            ' ' +
            plural(count, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            }) +
            ' /'}
        </span>
        <span className="Controls-sum">{sum.toLocaleString() + ' ₽'}</span>
        <button className="Controls-btn" onClick={onCartOpen}>
          Перейти
        </button>
      </div>
    );
  } else {
    return (
      <div className="Controls">
        <span className="Controls-text">В корзине: </span>
        <span className="Controls-empty">пусто</span>
        <button className="Controls-btn" onClick={onCartOpen}>
          Перейти
        </button>
      </div>
    );
  }

}

Controls.propTypes = {
  onCartOpen: PropTypes.func
};

Controls.defaultProps = {
  onCartOpen: () => {}
}

export default React.memo(Controls);

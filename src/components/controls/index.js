import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({totalCount, onCartOpen, totalSum}) {

  if (totalCount) {
    return (
      <div className="Controls">
        <span className="Controls-text">В корзине: </span>
        <span className="Controls-count">
          {totalCount.toLocaleString() +
            ' ' +
            plural(totalCount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            }) +
            ' /'}
        </span>
        <span className="Controls-sum">{totalSum.toLocaleString() + ' ₽'}</span>
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
  onCartOpen: PropTypes.func,
  totalSum: PropTypes.number,
  totalCount: PropTypes.number,
};

Controls.defaultProps = {
  onCartOpen: () => {}
}

export default React.memo(Controls);

import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function Cart({ inCartList, onDeleteItemInCart, onCartOpen, cartIsOpen}) {
  return (
    <div className={cartIsOpen ? "Cart" : "Cart Cart--hidden"}>
      <div className="Cart-inner">
        <div className="Cart-header">
          <h1 className="Cart-title">Корзина</h1>
          <button className="Cart-close" onClick={onCartOpen}>Закрыть</button>
        </div>
        <div className="Cart-items">
        {inCartList.map((item) => (
          <div key={item.code} className="Cart-item">
            <Item item={item} onDeleteItemInCart={onDeleteItemInCart} />
          </div>
        ))}
        </div>
        <div className="Cart-footer">
          <span className="Cart-text">Итого</span>
          <span className="Cart-sum">223 ₽</span>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  inCartList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItemInCart: PropTypes.func,
  onCartOpen: PropTypes.func,
};

Cart.defaultProps = {
  onDeleteItemInCart: () => {},
  onCartOpen: () => {},
};

export default React.memo(Cart);

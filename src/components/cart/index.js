import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartItem from '../cart-item';

function Cart({ inCartList, onDeleteItemInCart, onCartOpen, cartIsOpen}) {

  let sum = inCartList
  .map((item) => item.count * item.good.price)
  .reduce((partialSum, a) => partialSum + a, 0); 

  return (
    <div className={cartIsOpen ? 'Cart' : 'Cart Cart--hidden'}>
      <div className="Cart-inner">
        <div className="Cart-header">
          <h1 className="Cart-title">Корзина</h1>
          <button className="Cart-close" onClick={onCartOpen}>
            Закрыть
          </button>
        </div>
        <div className="Cart-items">
          {inCartList.map((item) => (
            <div key={item.good.code} className="Cart-item">
              <CartItem
                item={item}
                count={item.count}
                onDeleteItemInCart={onDeleteItemInCart}
              />
            </div>
          ))}
        </div>
        <div className="Cart-footer">
          <span className="Cart-text">Итого</span>
          <span className="Cart-sum">{sum.toLocaleString() + ' ₽'}</span>
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

import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function Cart({ cartList, onDeleteItem }) {
  return (
    <div className="Cart">
      <div className="Cart-inner">
        <div className="Cart-header">
          <h1 className="Cart-title">Корзина</h1>
          <button className="Cart-close">Закрыть</button>
        </div>
        <div className="Cart-items">
        {/* {cartList.map((item) => (
          <div key={item.code} className="Cart-item">
            <Item item={item} onDelete={onDeleteItem} />
          </div>
        ))} */}
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
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
};

Cart.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(Cart);

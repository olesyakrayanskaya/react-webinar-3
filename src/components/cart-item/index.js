import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem(props) {

  const callbacks = {
    onDel: (code) => {
      props.onDeleteItemInCart(code);
    },
  };

  return (
    <>
      <div className="Cart-item-code">{props.item.good.code}</div>
      <div className="Cart-item-title">{props.item.good.title}</div>
      <div className="Cart-item-price">
        {props.item.good.price.toLocaleString() + ' ₽'}
      </div>
      <div className="Cart-item-count">{props.count} шт</div>
      <div className="Cart-item-actions">
        <button className="Cart-item-btn" onClick={() => {callbacks.onDel(props.item.good.code)}}>Удалить</button>
      </div>
    </>
  );
}

CartItem.propTypes = {
    CartItem: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }),
  onDel: PropTypes.func,
};

CartItem.defaultProps = {
  onDel: () => {},
};

export default React.memo(CartItem);
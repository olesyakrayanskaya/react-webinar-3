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
      <div className="Cart-item-code">{props.item.code}</div>
      <div className="Cart-item-title">{props.item.title}</div>
      <div className="Cart-item-price">
        {props.item.price.toLocaleString() + ' ₽'}
      </div>
      <div className="Cart-item-count"> шт</div>
      <div className="Cart-item-actions">
        <button onClick={() => {callbacks.onDel(props.item.code)}}>Удалить</button>
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
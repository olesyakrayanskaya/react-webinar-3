import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem(props) {

  const callbacks = {
    onClick: (item) => {
      props.onClick(item);
    },
  };

  return (
    <div className="Cart-item">
      <div className="Cart-item-code">{props.item.code}</div>
      <div className="Cart-item-title">{props.item.title}</div>
      <div className="Cart-item-price">{props.item.price.toLocaleString() + ' ₽'}</div>
      <div className="Cart-item-count">{props.item.count.toLocaleString() + ' шт'}</div>
      <div className="Cart-item-actions">
        <button
          className="Cart-item-btn"
          onClick={() => {
            callbacks.onClick(props.item);
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  CartItem: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }),
  onClick: PropTypes.func,
};

CartItem.defaultProps = {
  onAdd: () => {},
};

export default React.memo(CartItem);

import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {

  const callbacks = {
    onAdd: (item) => {
      props.onAddItemToCart(item);
    },
  };
  const buttonValue = props.option === 'cart' ? 'Удалить' : 'Добавить';

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">
        {props.item.price.toLocaleString() + ' ₽'}
      </div>
      {props.option === 'cart' && (
        <div className="Item-count">
          {props.item.count.toLocaleString() + ' шт'}
        </div>
      )}
      <div className="Item-actions">
        <button
          className="Item-btn"
          onClick={() => {
            callbacks.onAdd(props.item);
          }}
        >
          {buttonValue}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);

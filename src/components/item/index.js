import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {

  const callbacks = {
    onAdd: (item) => {
      props.onAddItemToCart(item);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">
        {props.item.price.toLocaleString() + ' ₽'}
      </div>
      <div className="Item-actions">
        <button onClick={() => {callbacks.onAdd(props.item)}}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);

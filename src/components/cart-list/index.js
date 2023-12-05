import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../cart-item';
import './style.css';

function CartList({ list, onClick }) {
  return (
    <div className="Cart-list">
      {list.map((item) => (
        <div key={item.code} className="Cart-list-item">
          <CartItem item={item} onClick={onClick} />
        </div>
      ))}
    </div>
  );
}

CartList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ),
  onClick: PropTypes.func,
};

CartList.defaultProps = {
  onClick: () => {},
};

export default React.memo(CartList);

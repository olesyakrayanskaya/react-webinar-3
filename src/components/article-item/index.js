import {memo, useState} from "react";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import './style.css';

function ArticleItem(props) {
  const callbacks = {
    onAdd: () => props.onAdd(props.item._id),
  };

  return (
    <div className="Article-item">
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

ArticleItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ArticleItem.defaultProps = {
  onAdd: () => {},
};

export default memo(ArticleItem);
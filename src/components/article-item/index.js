import {memo, useState} from "react";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import './style.css';

function ArticleItem(props) {
  const callbacks = {
    onAdd: () => props.onAdd(props.id),
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
  }),
  onAdd: PropTypes.func,
};

export default memo(ArticleItem);
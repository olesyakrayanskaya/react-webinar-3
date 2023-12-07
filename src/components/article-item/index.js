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
      <p className="Article-description">{props.article.description}</p>
      <span className="Article-made">Страна производитель: {props.article.madeIn}</span>
      <span className="Article-categori">Категория: {props.article.category}</span>
      <span className="Article-edition">Год выпуска: {props.article.edition}</span>
      <span className="Article-price">Цена: {numberFormat(props.article.price)} ₽</span>
      <button className="Article-btn" onClick={callbacks.onAdd}>
        Добавить
      </button>
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
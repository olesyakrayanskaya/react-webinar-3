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
      <span className="Article-made">Страна производитель: <b>{props.article.madeIn}</b></span>
      <span className="Article-categori">Категория: <b>{props.article.category}</b></span>
      <span className="Article-edition">Год выпуска: <b>{props.article.edition}</b></span>
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
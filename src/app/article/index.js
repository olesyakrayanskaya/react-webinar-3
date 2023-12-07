import {memo, useCallback, useEffect} from 'react';
import ModalLayout from "../../components/modal-layout";
import ArticleItem from '../../components/article-item';
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Article() {

  const store = useStore();
  const id = store.state.catalog.selectedItemId;

  useEffect(() => {
    store.actions.article.loadItem(id);
  }, []);

  const select = useSelector((state) => ({
    description: state.article.description,
    madeIn: state.article.madeIn.title,
    category: state.article.category.title,
    edition: state.article.edition,
    price: state.article.price,
    title: state.article.title,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    onOpen: useCallback(() => store.actions.modals.open('basket'), [store]),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  return (
    <ModalLayout title={select.title} onClose={callbacks.closeModal}>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ArticleItem />
    </ModalLayout>
  );
}

export default memo(Article);
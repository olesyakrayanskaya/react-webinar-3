import {memo, useCallback, useEffect} from 'react';
import PageLayout from '../../components/page-layout';
import ArticleItem from '../../components/article-item';
import Head from "../../components/head";
import Wrapper from '../../components/wrapper';
import Nav from '../../components/nav';
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";

function Article() {

  let { id } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.article.loadItem(id);
  }, [id]);

  const select = useSelector((state) => ({
    description: state.article.description,
    madeIn: state.article.madeIn,
    category: state.article.category,
    edition: state.article.edition,
    price: state.article.price,
    title: state.article.title,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    onOpen: useCallback(() => store.actions.modals.open('basket'), [store]),
    onAdd: useCallback(() => store.actions.basket.addToBasket(id), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.title}/>
      <Wrapper>
        <Nav />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      </Wrapper>
      <ArticleItem id={id} onAdd={callbacks.onAdd} article={select}/>
    </PageLayout>
  );
}

export default memo(Article);
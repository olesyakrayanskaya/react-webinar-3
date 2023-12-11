import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Wrapper from '../../components/wrapper';
import Nav from '../../components/nav';
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { getTotalPages } from '../../utils';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.loadWithPagination(select.limit, (select.pageId-1)*select.limit);
    store.actions.catalog.loadTotalCount();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    limit: state.catalog.limit,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pageId: state.catalog.pageId,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    openModalItem: useCallback((_id) => {
      store.actions.catalog.setSelectedItemId(_id)
      // store.actions.modals.open('article')
    }, [store]),

    changePage: useCallback((p) => {
      store.actions.catalog.setPageId(p);
      store.actions.catalog.loadWithPagination(select.limit, select.limit*(p - 1));
    }, [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} onSelect={callbacks.openModalItem}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Wrapper>
        <Nav />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      </Wrapper>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination totalPages={getTotalPages(select.count, select.limit)} changePage={callbacks.changePage} activePage={select.pageId}/>
    </PageLayout>
  );
}

export default memo(Main);

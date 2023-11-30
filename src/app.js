import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const list = store.getState().list;
  const inCartList = store.getState().inCartList;

  const callbacks = {
    onDeleteItemInCart: useCallback(
      (code) => {
        store.deleteItemInCart(code);
      },
      [store]
    ),

    onAddItemToCart: useCallback(() => {
      store.addItemToCart();
    }, [store]),

    onCartOpen: useCallback(() => {
      setCartIsOpen(!cartIsOpen);
    }, [cartIsOpen]),
  };

  return (
    <PageLayout>
      <Cart
        cartIsOpen={cartIsOpen}
        inCartList={inCartList}
        onDeleteItemInCart={callbacks.onDeleteItemInCart}
        onCartOpen={callbacks.onCartOpen}
      ></Cart>
      <Head title="Магазин" />
      <Controls inCartList={inCartList} onCartOpen={callbacks.onCartOpen} />
      <List list={list} onAddItemToCart={callbacks.onAddItemToCart} />
    </PageLayout>
  );
}

export default App;

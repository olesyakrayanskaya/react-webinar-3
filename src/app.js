import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import Modal from './components/modal';
import Footer from './components/footer';
import Cart from './components/cart';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const list = store.getState().list;
  const inCartList = store.getState().inCartList;

  const callbacks = {
    onDeleteItemInCart: useCallback(
      (code) => {
        store.deleteItemInCart(code);
      },
      [store]
    ),

    onAddItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, [store]),

    onCartOpen: useCallback(() => {
      setmodalIsOpen(!modalIsOpen);
    }, [modalIsOpen]),
  };

  return (
    <PageLayout>
      <Modal modalIsOpen={modalIsOpen}>
        <Head title={"Корзина"} modalIsOpen={modalIsOpen} onCartOpen={callbacks.onCartOpen} />
        <Footer modalIsOpen={modalIsOpen}/>
        <Cart
          inCartList={inCartList}
          onDeleteItemInCart={callbacks.onDeleteItemInCart}
          onCartOpen={callbacks.onCartOpen}
        ></Cart>
      </Modal>
      <Head title="Магазин" />
      <Controls inCartList={inCartList} onCartOpen={callbacks.onCartOpen} />
      <List list={list} onAddItemToCart={callbacks.onAddItemToCart} />
    </PageLayout>
  );
}

export default App;

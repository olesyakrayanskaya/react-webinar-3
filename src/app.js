import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import Modal from './components/modal';
import Footer from './components/footer';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const list = store.getState().list;
  const goods = store.getState().goods;
  const totalSum = store.getTotalSum();
  const totalCount = store.getTotalCount();

  const callbacks = {
    onDeleteGoods: useCallback(
      (code) => {
        store.deleteGoods(code);
      },
      [store]
    ),

    onAddGoods: useCallback((code) => {
      store.addGoods(code);
    }, [store]),

    onCartOpen: useCallback(() => {
      setmodalIsOpen(!modalIsOpen);
    }, [modalIsOpen]),
  };

  return (
    <PageLayout>
      <Modal modalIsOpen={modalIsOpen}>
        <Head title={"Корзина"} modalIsOpen={modalIsOpen} onCartOpen={callbacks.onCartOpen} />
        <List list={goods} onClick={callbacks.onDeleteGoods} option={'cart'} />
        <Footer modalIsOpen={modalIsOpen} totalSum={totalSum}/>
      </Modal>
      <Head title="Магазин" />
      <Controls totalCount={totalCount} onCartOpen={callbacks.onCartOpen} totalSum={totalSum} />
      <List list={list} onClick={callbacks.onAddGoods} />
    </PageLayout>
  );
}

export default App;

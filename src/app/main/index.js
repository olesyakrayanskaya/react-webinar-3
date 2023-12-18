import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Header from "../../components/header";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.categories.loadCategories();
  }, [], true);

  const {t} = useTranslate();
  const select = useSelector((state) => ({
    username: state.login.username,
    session: state.login.session,
  }));

  const callbacks = {
    onLogOut: useCallback(() => {
      store.actions.login.logout();
    }, [store]),
    onSetDisplayError: useCallback(() => {
      store.actions.login.setDisplayError();
    })
  };

  return (
    <PageLayout>
      {select.session ? (
        <Header
          link="/login"
          btnText={t('out')}
          userLink={'/profile'}
          userName={select.username}
          onLogOut={callbacks.onLogOut}
          onSetDisplayError={callbacks.onSetDisplayError}
        />
      ) : (
        <Header
          link="/login"
          btnText={t('in')}
          onLogOut={callbacks.onLogOut}
          onSetDisplayError={callbacks.onSetDisplayError}
        />
      )}
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);

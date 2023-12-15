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
    store.actions.profile.loadProfile();
  }, [], true);

  const {t} = useTranslate();

  const select = useSelector((state) => ({
    username: state.profile.username,
  }));

  const callbacks = {
    onLogOut: useCallback(() => {
      store.actions.profile.logout();
    }, [store]),
  };

  return (
    <PageLayout>
      {store.actions.profile.isLogged() ? (
        <Header
          link="/login"
          btnText={t('out')}
          userLink={'/profile'}
          userName={select.username}
          onLogOut={callbacks.onLogOut}
        />
      ) : (
        <Header link="/login" btnText={t('in')} />
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

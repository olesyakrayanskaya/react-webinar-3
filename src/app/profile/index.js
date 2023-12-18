import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Header from "../../components/header";
import Title from "../../components/title";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import ProfileCard from '../../components/profile-card';
import useInit from '../../hooks/use-init';

function Profile() {

  const { t } = useTranslate();

  const store = useStore();

  useInit(() => {
    store.actions.profile.loadProfile();
  }, []);

  const select = useSelector((state) => ({
    user: state.profile.data,
    waiting: state.profile.waiting,
  }));

  const callbacks = {
    onLogOut: useCallback(() => {
      store.actions.login.logout();
    }, [store]),
    onSetDisplayError: () => {
      store.actions.login.setDisplayError();
    }
  };

  return (
    <PageLayout>
      <Header
        link="/login"
        btnText={t('out')}
        userLink={'/profile'}
        userName={select.user?.profile.name}
        onLogOut={callbacks.onLogOut}
        onSetDisplayError={callbacks.onSetDisplayError}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Title title={t('profile')} />
      <Spinner active={select.waiting}>
        <ProfileCard user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
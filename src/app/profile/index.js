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
import { useNavigate } from "react-router-dom";
import useInit from '../../hooks/use-init';

function Profile() {

  const { t } = useTranslate();

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((store) => ({
    username: store.profile.username,
    phone: store.profile.phone,
    email: store.profile.email,
    token: store.profile.token,
    waiting: store.profile.waiting,
    userProfile: store.profile.userProfile,
  }));

  useInit(() => {
    if (!select.waiting) {
      if (!store.actions.profile.isLogged()) {
        navigate('/login');
      }
      if (!select.userProfile) {
        store.actions.profile.loadProfile();
      }
    }
  }, [select.waiting]);

  const callbacks = {
    onLogOut: useCallback(() => {
      store.actions.profile.logout();
    }, [store]),
  };

  return (
    <PageLayout>
      <Header
        link='/login'
        btnText={t('out')}
        userLink={'/profile'}
        userName={select.username}
        onLogOut={callbacks.onLogOut}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Title title={t('profile')} />
      <Spinner active={select.waiting}>
        <ProfileCard
          username={select.username}
          phone={select.phone}
          email={select.email}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
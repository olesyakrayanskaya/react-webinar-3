import {memo} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Header from "../../components/header";
import Title from "../../components/title";
import Form from "../../components/form";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import useInit from '../../hooks/use-init';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Login() {
  const { t } = useTranslate();

  const store = useStore();
  const navigate = useNavigate();
  const params = useParams();

  const select = useSelector((state) => ({
    error: state.login.error,
    waiting: state.login.waiting,
    session: state.login.session,
    displayError: state.login.displayError,
  }));

  useInit(() => {
    if (!select.waiting) {
      if (select.session) {
        navigate('/profile');
      }
    }
  }, [select.waiting]);

  const callbacks = {
    onLogin: (body) => {
      store.actions.login.login(body);
    },
    onLogout: () => {
      store.actions.login.logout();
    },
    onSetDisplayError: (displayError) => {
      store.actions.login.setDisplayError(displayError);
    },
  };

  return (
    <PageLayout>
      <Header
        link="/login"
        btnText={t('in')}
        onLogOut={() => {}}
        onSetDisplayError={() => callbacks.onSetDisplayError(false)}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Title title={t('in')} />
      <Form
        t={t}
        onLogin={callbacks.onLogin}
        error={select.error}
        session={select.session}
        onSetDisplayError={() => callbacks.onSetDisplayError(true)}
        displayError={select.displayError}
      />
    </PageLayout>
  );
}

export default memo(Login);
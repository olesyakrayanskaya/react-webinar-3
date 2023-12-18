import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { useNavigate } from 'react-router-dom';

function Form({ t, onLogin, error, session }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    login: '',
    password: '',
  });

  const callbacks = {
    onChange: (e) => {
      setUser((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    handleSubmitForm: (e) => {
      e.preventDefault();
      onLogin(user);
      if(session) {navigate('/profile')};
    },
  };

  return (
    <form className="Form" method="POST" onSubmit={callbacks.handleSubmitForm}>
      <label className="Form-Label" htmlFor="user">
        {t('login')}
      </label>
      <input
        className="Form-input"
        type="text"
        id="user"
        name="login"
        value={user.name}
        onChange={callbacks.onChange}
      ></input>
      <label className="Form-Label" htmlFor="password">
        {t('password')}
      </label>
      <input
        className="Form-input"
        type="password"
        id="password"
        name="password"
        value={user.password}
        onChange={callbacks.onChange}
      ></input>
      {error ? <p className="Form-msg">{error}</p> : ''}
      <input
        className="Form-input"
        type="submit"
        id="submit"
        value={t('log.in')}
      ></input>
    </form>
  );
}

Form.propTypes = {
  t: PropTypes.func,
  onLogin: PropTypes.func,
  error: PropTypes.string,
  session: PropTypes.bool,
};

Form.defaultProps = {
  t: (text) => text,
};

export default memo(Form);

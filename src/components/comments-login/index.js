import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function CommentLogIn({ exists, type, onChangeLogInText }) {
  return (
    <>
      {!exists ? (
        <div className="CommentLogIn">
          <Link className="CommentLogIn-link" to={'/login'}>
            Войдите
          </Link>
          , чтобы иметь возможность{' '}
          {type === 'false' ? 'комментировать.' : 'ответить.'}
          {type === 'false' ? null : (
            <button
              type={'button'}
              value={false}
              className="CommentLogIn-btn"
              onClick={onChangeLogInText}
            >
              Отмена
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}

CommentLogIn.propTypes = {
  exists: PropTypes.bool,
  type: PropTypes.string,
  onChangeLogInText: PropTypes.func,
};

export default memo(CommentLogIn);

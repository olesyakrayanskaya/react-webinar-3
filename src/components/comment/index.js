import { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentLogIn from '../comments-login';
import './style.css';
import CommentForm from '../comments-form';
import {formatTime, formatMonth} from '../../utils/comments/dateformat';

function Comment({
  user,
  authUser,
  date,
  text,
  id,
  openLogInText,
  onChangeLogInText,
  exists,
  onChangeOpenFormComment,
  openFormComment,
  sendFormHandler,
  children,
  depth
}) {
  const dataDate = new Date(date);

  const formRef = useRef();

  useEffect(() => {
    // console.log(formRef.current)
    if (formRef.current && openFormComment === id) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [openFormComment]);

  const formattedDate = {
    date: dataDate.getDate(),
    month: formatMonth(dataDate.toLocaleString('default', { month: 'long' })),
    year: dataDate.getFullYear(),
    hours: formatTime(dataDate.getHours()),
    minutes: formatTime(dataDate.getMinutes()),
  };

  const onChangeHandler = (e) => {
    if (!exists) onChangeLogInText(e);
    else if (exists) onChangeOpenFormComment(e);
  };

  return (
    <div ref={formRef}>
      <div className="Comment">
        <div className="Comment-header">
          <>
            {exists && user === authUser ? (
              <p className="Comment-user Comment-user--login">{user}</p>
            ) : (
              <p className="Comment-user">{user}</p>
            )}
          </>
          <p className="Comment-date">
            {`${formattedDate.date} ${formattedDate.month} ${formattedDate.year} в ${formattedDate.hours}:${formattedDate.minutes}`}
          </p>
        </div>
        <p className="Comment-text">{text}</p>
        <button
          value={id}
          className="Comment-btn"
          type="button"
          onClick={onChangeHandler}
        >
          Ответить
        </button>
        {openLogInText === id ? (
          <CommentLogIn exists={exists} onChangeLogInText={onChangeLogInText} />
        ) : null}
      </div>
      {depth < 5 ? (
        <div className="Comment-children Comment-children--margin">
          {children}
        </div>
      ) : (
        <div className="Comment-children">{children}</div>
      )}
      {openFormComment === id ? (
        <CommentForm
          title={'Новый ответ'}
          exists={exists}
          type={true}
          onChangeOpenFormComment={onChangeOpenFormComment}
          commentId={id}
          postFormHandler={sendFormHandler}
          user={user}
          // ref={formRef}
        />
      ) : null}
    </div>
  );
}

Comment.propTypes = {
  user: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  onChangeLogInText: PropTypes.func,
  exists: PropTypes.bool,
  openLogInText: PropTypes.string,
};

export default memo(Comment);

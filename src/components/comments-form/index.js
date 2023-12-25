import { memo, useEffect, useState, forwardRef } from "react";
import PropTypes from 'prop-types';
import './style.css';

const CommentForm = forwardRef(function ({
  title,
  exists,
  type = false,
  onChangeOpenFormComment,
  commentId,
  postFormHandler,
  user,
}, ref) {
  const [valueArea, setValueArea] = useState('');

  const [reqParams, setReqParams] = useState();

  useEffect(() => {
    setReqParams((state) => ({
      ...state,
      text: valueArea,
      parent: { _id: commentId, _type: 'comment' },
    }));
  }, [type, valueArea]);

  const postData = (e) => {
    e.preventDefault();
    postFormHandler(reqParams);
    setValueArea('');
  };

  const formClassName = type ? "CommentForm CommentForm--ans" : "CommentForm";
  const textAreaPlaceholderText = type ? `Мой ответ для  ${user}` : "Текст";

  return (
    <>
      {exists ? (
        <form onSubmit={postData} className={formClassName} ref={ref}>
          <p className="CommentForm-title">{title}</p>
          <textarea
            className="CommentForm-textarea"
            value={valueArea}
            onChange={(e) => setValueArea(e.target.value)}
            placeholder={textAreaPlaceholderText}
          ></textarea>
          <div className="CommentForm-footer" >
            <button
              className="CommentForm-btn CommentForm-btn--send"
              type={'submit'}
            >
              Отправить
            </button>
            {type ? (
              <button
                className="CommentForm-btn CommentForm-btn--cancel"
                type={'button'}
                value={false}
                onClick={onChangeOpenFormComment}
              >
                Отмена
              </button>
            ) : null}
          </div>
        </form>
      ) : null}
    </>
  );
})

Comment.propTypes = {
  title: PropTypes.string,
  exists: PropTypes.bool,
  type: PropTypes.bool,
  onChangeOpenFormComment: PropTypes.func,
  user: PropTypes.string,
};

export default memo(CommentForm);
import { memo, useState } from 'react';
import Comment from '../../components/comment';
import TitleComment from '../../components/comments-title';
import CommentLogIn from '../../components/comments-login';
import useSelector from '../../hooks/use-selector';
import CommentForm from '../../components/comments-form';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';


function CommentsLayout({ comments, idArticle }) {
  const exists = useSelector((state) => state.session.exists);
  const authUser = useSelector((state) => state.session.user.profile?.name);


  const [openLogInText, setOpenLogInText] = useState('false');
  const [openFormComment, setOpenFormComment] = useState('false');
  const dispatch = useDispatch();

  const select = useSelector((state) => ({
    profile: state.session.user.profile?.name,
  }));

  const onChangeLogInText = (e) => {
    setOpenLogInText(e.target.value);
  };

  const onChangeOpenFormComment = (e) => {
    setOpenFormComment(e.target.value);
  };

  const postFormComment = (data) => {
    if (!data.parent._id) {
      dispatch(
        commentsActions.post(
          { ...data, parent: { _id: idArticle, _type: 'article' } },
          select.profile
        )
      );
    } else {
      dispatch(commentsActions.post(data, select.profile));
      setOpenFormComment('false');
    }
  };

  function createComment(item, depth = 0) {
    let children = item.children.map((ch) => createComment(ch, depth + 1));

    let result = (
      <Comment
        key={item._id}
        id={item._id}
        user={item.author.profile.name}
        date={item.dateCreate}
        text={item.text}
        openLogInText={openLogInText}
        onChangeLogInText={onChangeLogInText}
        exists={exists}
        authUser={authUser}
        onChangeOpenFormComment={onChangeOpenFormComment}
        openFormComment={openFormComment}
        sendFormHandler={postFormComment}
        children={children}
        depth={depth}
      />
    );

    return result;
  }

  const newCommentsList = listToTree(comments, '_id', idArticle).map((ch) =>
    createComment(ch)
  );
  return (
    <>
      <TitleComment amount={comments.length} />
      {newCommentsList.map((item) => item)}
      {openLogInText === 'false' ? (
        <CommentLogIn exists={exists} type={openLogInText}
        />
      ) : null}
      {openFormComment === 'false' ? (
        <CommentForm
          exists={exists}
          title={'Новый комментарий'}
          postFormHandler={postFormComment}
          user = {select.profile}
        />
      ) : null}
    </>
  );
}

export default memo(CommentsLayout);

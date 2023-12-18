import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function ProfileCard({user, t}) {

  return (
    <div className="ProfileCard">
      <p className="ProfileCard-name">
        {t('user.name') + ': '}
        <span>{user?.profile.name}</span>
      </p>
      <p className="ProfileCard-tel">
        {t('user.tel') + ': '}
        <span>{user?.profile.phone}</span>
      </p>
      <p className="ProfileCard-email">
        {'email : '}
        <span>{user?.email}</span>
      </p>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    tel: PropTypes.string,
    email: PropTypes.string,
  }),
  t: PropTypes.func
};

ProfileCard.defaultProps = {
  t: (text) => text
}

export default memo(ProfileCard);
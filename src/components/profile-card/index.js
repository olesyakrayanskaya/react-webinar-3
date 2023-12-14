import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function ProfileCard({username, phone, email, t}) {

  return (
    <div className='ProfileCard'>
        <p className='ProfileCard-name'>{t('user.name') + ': '}<span>{username}</span></p>
        <p className='ProfileCard-tel'>{t('user.tel') + ': '}<span>{phone}</span></p>
        <p className='ProfileCard-email'>{'email : '}<span>{email}</span></p>
    </div>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
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
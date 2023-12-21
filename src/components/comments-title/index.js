import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ComentsTitle({ amount }) {
  return <h2 className="ComentsTitle">{`Коментарии (${amount})`}</h2>;
}

Comment.propTypes = {
  amount: PropTypes.number,
};

export default memo(ComentsTitle);

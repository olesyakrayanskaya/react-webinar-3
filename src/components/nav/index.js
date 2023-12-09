import './style.css';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import PropTypes from 'prop-types';

function Nav({dictionary}) {

    return(
        <nav className='Nav'>
            <span className='Nav-link'><Link to='/'>{dictionary.home}</Link></span>
        </nav>
    )

  Nav.propTypes = {
    dictionary: PropTypes.object,
  };
}

export default memo(Nav);

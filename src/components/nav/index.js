import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="Nav">
        <span className="Nav-link"><Link to='/'>Главная</Link></span>
    </nav>
  )
}

Nav.propTypes = {
  title: PropTypes.node,
};

export default memo(Nav);
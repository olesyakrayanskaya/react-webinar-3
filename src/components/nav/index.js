import {memo} from "react";
import './style.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="Nav">
        <span className="Nav-link"><Link to='/'>Главная</Link></span>
    </nav>
  )
}

export default memo(Nav);
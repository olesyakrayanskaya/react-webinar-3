import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import SideLayout from "../side-layout";
import { Link } from "react-router-dom";

function Header({ link, btnText, userLink, userName, onLogOut}) {
  return (
    <header className="Header">
      <SideLayout side="end">
        <Link className="Header-link" to={userLink}>{userName}</Link>
        <button className="Header-btn">
          <Link className="Header-link Header-link--btn" to={link} onClick={onLogOut}>{btnText}</Link>
        </button>
      </SideLayout>
    </header>
  );
}

Header.propTypes = {
    link: PropTypes.string,
    btnText: PropTypes.string,
    userLink: PropTypes.string,
    userName: PropTypes.string,
    onLogOut: PropTypes.func,
};

export default memo(Header);
import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Wrapper({children}) {
  return (
    <div className="Wrapper">
      {children}
    </div>
  )
}

Wrapper.propTypes = {
  children: PropTypes.node
}

export default memo(Wrapper);
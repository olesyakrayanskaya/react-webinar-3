import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Title({title}) {
  return (
    <h1 className="Title">{title}</h1>    
  )
}

Title.propTypes = {
    title: PropTypes.string,
};

export default memo(Title);
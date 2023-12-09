import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import SelectLang from "../select-lang";

function Head({title, language, changeLanguage, dictionary}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <SelectLang language={language} changeLanguage={changeLanguage} dictionary={dictionary}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);

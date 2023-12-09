import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function SelectLang(props) {
  return (
    <div className="SelectLang">
      <select
        className="SelectLang-select"
        id="lang"
        onChange={props.changeLanguage}
      >
        <option className="SelectLang-option">русский</option>
        <option className="SelectLang-option">english</option>
      </select>
      <label className="SelectLang-label" htmlFor="lang">
        {props.dictionary.changeLang}
      </label>
    </div>
  );
}

SelectLang.propTypes = {
  onChange: PropTypes.func,
};

SelectLang.defaultProps = {
  onChange: () => {},
};

export default memo(SelectLang);
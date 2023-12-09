import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import Nav from "../nav";
import './style.css';

function BasketTool({sum, amount, onOpen, dictionary}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Nav dictionary={dictionary}/>
      <span className={cn('label')}>{dictionary.inCart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: `${dictionary.product}`,
            few: `${dictionary.products}`,
            many: `${dictionary.productsMany}`
          })} / ${numberFormat(sum)} ₽`
          : `${dictionary.empty}`
        }
      </span>
      <button onClick={onOpen}>{dictionary.toCart}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  dictionary: PropTypes.object,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);

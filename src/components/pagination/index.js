import PropTypes from 'prop-types';
import './style.css';
import { memo } from 'react';

function Pagination({totalPages, changePage, activePage}) {

    let result = [];

    function addPlaceholder(key) {
      let b = (
        <button className="Pagination-btn Pagination-btn--empty" key={key}>
          ...
        </button>
      );

      result.push(b);
    }

    function addButton(i) {
      let b;
      if (activePage === i + 1) {
        b = (
          <button
            className="Pagination-btn Pagination-btn--active"
            key={i}
            onClick={() => {
              changePage(i + 1);
            }}
          >
            {i + 1}
          </button>
        );
      } else {
        b = (
          <button
            className="Pagination-btn"
            key={i}
            onClick={() => {
              changePage(i + 1);
            }}
          >
            {i + 1}
          </button>
        );
      }

      result.push(b);
    }

    if (activePage < 4) {
      let maxPage = 0;
      if (activePage === 1) {
        maxPage = Math.min(3, totalPages);
      } else {
        maxPage = Math.min(activePage + 1, totalPages);
      }
      for (let i = 0; i < maxPage; i++) {
        addButton(i);
      }
      if (totalPages > 5) {
        addPlaceholder(-1);
        addButton(totalPages - 1);
      }
    } else if (activePage > totalPages - 3) {
      addButton(0);
      addPlaceholder(-1);

      let minPage = 0;
      if (activePage === totalPages) {
        minPage = Math.max(2, totalPages - 3);
      } else {
        minPage = Math.max(activePage - 2, 1);
      }
      for (let i = minPage; i < totalPages; i++) {
        addButton(i);
      }
    } else {
      addButton(0);
      addPlaceholder(-1);
      for (let i = activePage - 2; i <= activePage; i++) {
        addButton(i);
      }
      if (totalPages !== 6) {
        addPlaceholder(-2);
      }
      addButton(totalPages - 1);
    }

    return <div className="Pagination">{result}</div>;
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  changePage: (p) => {},
}

export default memo(Pagination);

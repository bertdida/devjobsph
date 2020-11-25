import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import './Pagination.scss';

export function Pagination({ pagination }) {
  const { prev_page, next_page } = pagination;

  return (
    <div className="pagination">
      <PaginationLink page={prev_page}>Previous</PaginationLink>

      <div className="ml-auto">
        <PaginationLink page={next_page}>Next</PaginationLink>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
};

function PaginationLink({ page, children }) {
  const { pathname, search } = useLocation();

  if (page === null) {
    return null;
  }

  const currQuery = queryString.parse(search);
  const nextQuery = { ...currQuery, page: page === 1 ? null : page };

  const params = queryString.stringify(nextQuery, { skipNull: true });
  const url = `${pathname}?${params}`;

  return (
    <Link className="btn pagination__nav" to={url}>
      {children}
    </Link>
  );
}

PaginationLink.propTypes = {
  page: PropTypes.number,
  children: PropTypes.node.isRequired,
};

PaginationLink.defaultProps = {
  page: null,
};

import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

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
  const { pathname } = useLocation();
  const url = page === 1 ? pathname : `${pathname}?page=${page}`;

  if (page === null) {
    return null;
  }

  return <Link className="pagination__nav" to={url}>{children}</Link>;
}

PaginationLink.propTypes = {
  page: PropTypes.number,
  children: PropTypes.node.isRequired,
};

PaginationLink.defaultProps = {
  page: null,
};

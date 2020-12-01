import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import queryString from 'query-string';

import { Button } from 'components/Button';
import './Pagination.scss';

export function Pagination({ pagination }) {
  const { prev_page, next_page } = pagination;

  return (
    <div className="pagination">
      <PaginationLink page={prev_page}>
        <GrLinkPrevious />
        <span className="ml-1">Previous</span>
      </PaginationLink>

      <div className="ml-auto">
        <PaginationLink page={next_page}>
          <span className="mr-1">Next</span>
          <GrLinkNext />
        </PaginationLink>
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
    <Button className="pagination__link" as={Link} to={url}>
      {children}
    </Button>
  );
}

PaginationLink.propTypes = {
  page: PropTypes.number,
  children: PropTypes.node.isRequired,
};

PaginationLink.defaultProps = {
  page: null,
};

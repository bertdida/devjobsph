import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';

export function Loader({ message }) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Spinner animation="border" role="status" variant="secondary">
        <span className="sr-only">Loading...</span>
      </Spinner>
      {message && <span className="ml-2">{message}</span>}
    </div>
  );
}

Loader.propTypes = {
  message: PropTypes.string,
};

Loader.defaultProps = {
  message: null,
};

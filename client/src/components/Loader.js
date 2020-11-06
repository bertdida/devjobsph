import Spinner from 'react-bootstrap/Spinner';

export function Loader() {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status" variant="secondary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

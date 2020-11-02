import Spinner from "react-bootstrap/Spinner";

export function Loader() {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Spinner animation="border" role="status" variant="secondary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

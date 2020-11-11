import Card from 'react-bootstrap/Card';

import './JobSkeleton.scss';

export function JobSkeleton() {
  return (
    <Card className="jobSkeleton mb-3">
      <Card.Body>
        <Card.Title className="jobSkeleton__title" />
        <Card.Subtitle className="jobSkeleton__postedBy" />
      </Card.Body>

      <Card.Footer className="jobSkeleton__footer">
        <span className="jobSkeleton__tag" />
        <span className="jobSkeleton__tag" />
        <span className="jobSkeleton__tag" />
      </Card.Footer>
    </Card>
  );
}

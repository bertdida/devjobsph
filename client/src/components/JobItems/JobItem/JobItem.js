import PropTypes from 'prop-types';
import moment from 'moment';
import Card from 'react-bootstrap/Card';

import { JobTags } from '../JobTags';
import './JobItem.scss';

export function JobItem({ job }) {
  const {
    title, postedBy, salary, tags, postedAt, url,
  } = job;

  const postedAtStr = moment(postedAt).fromNow();

  return (
    <Card className="jobItem">
      <Card.Body>
        <div className="jobItem__header mb-2">
          <Card.Title className="jobItem__title mb-0">
            <a href={url} target="_blank" rel="noreferrer">
              {title}
            </a>
          </Card.Title>
          <small className="jobItem__postedAt">{postedAtStr}</small>
        </div>

        <Card.Subtitle className="jobItem__postedBy">{postedBy}</Card.Subtitle>
        {salary && <Card.Text className="jobItem__salary">{salary}</Card.Text>}
      </Card.Body>

      {tags && tags.length > 0 && (
        <Card.Footer className="jobItem__footer">
          <JobTags tags={tags} />
        </Card.Footer>
      )}
    </Card>
  );
}

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
};

import PropTypes from 'prop-types';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import { MdAttachMoney, MdBusiness, MdLanguage } from 'react-icons/md';
import { JobTags } from '../JobTags';
import './JobItem.scss';

export function JobItem({ job }) {
  const {
    title, postedBy, salary, tags, createdAt, url,
  } = job;

  const createdAtStr = moment(createdAt).fromNow();

  return (
    <Card className="jobItem">
      <Card.Body>
        <div className="jobItem__header mb-2">
          <Card.Title className="jobItem__title mb-0">
            <a href={url} target="_blank" rel="noreferrer">
              {title}
            </a>
          </Card.Title>
          <small className="jobItem__createdAt">{createdAtStr}</small>
        </div>

        <div className="jobItem__info">
          <MdBusiness />
          <Card.Text className="jobItem__postedBy">{postedBy}</Card.Text>
        </div>
        {salary && (
          <div className="jobItem__info">
            <MdAttachMoney />
            <Card.Text className="jobItem__salary">{salary}</Card.Text>
          </div>
        )}
        <div className="jobItem__info">
          <MdLanguage />
          <Card.Text className="jobItem__source">{getHostname(url)}</Card.Text>
        </div>
      </Card.Body>

      {tags && tags.length > 0 && (
        <Card.Footer className="jobItem__footer">
          <JobTags tags={tags} />
        </Card.Footer>
      )}
    </Card>
  );
}

function getHostname(url) {
  return new URL(url).hostname;
}

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
};

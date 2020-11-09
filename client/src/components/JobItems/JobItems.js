import PropTypes from 'prop-types';

import { JobItem } from './JobItem';
import { Pagination } from './Pagination';
import './JobItems.scss';

export function JobItems({ jobs, pagination }) {
  return (
    <>
      <ul className="jobItems">
        {jobs.map((job) => (
          <li className="mb-3" key={job._id}>
            <JobItem job={job} />
          </li>
        ))}
      </ul>

      <Pagination pagination={pagination} />
    </>
  );
}

JobItems.propTypes = {
  jobs: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
};

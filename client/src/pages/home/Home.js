import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Loader } from 'components/Loader';
import { JobItem } from 'components/JobItem';
import './Home.scss';

export function Home() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/jobs');
      setJobs(response.data.data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <Main isLoading={isLoading} jobs={jobs} />
  );
}

function Main({ isLoading, jobs }) {
  if (isLoading) {
    return <Loader message="Loading jobs..." />;
  }

  return (
    <ul className="jobList">
      {jobs.map((job) => (
        <li className="mb-3" key={job.id}>
          <JobItem job={job} />
        </li>
      ))}
    </ul>
  );
}

Main.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  jobs: PropTypes.array.isRequired,
};

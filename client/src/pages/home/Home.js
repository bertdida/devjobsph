import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import api from 'common/api';
import { Loader } from 'components/Loader';
import { JobItems } from 'components/JobItems';
import './Home.scss';

export function Home() {
  const history = useHistory();

  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [query, setQuery] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currQuery = queryString.parse(history.location.search);
    const { page = 1, ...rest } = currQuery;
    setQuery({ page, ...rest });
  }, [history.location.search]);

  useEffect(() => {
    if (query.page === undefined) {
      return;
    }

    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    (async () => {
      const response = await api.fetchJobs(query);
      const { data, ...rest } = response.data;
      setJobs(data);
      setPagination(rest);
      setIsLoading(false);
    })();
  }, [query]);

  return (
    <div className="wrapper">
      {isLoading && <JobsLoader />}
      <JobItems jobs={jobs} pagination={pagination} />
    </div>
  );
}

function JobsLoader() {
  return (
    <div className="jobsLoader">
      <div className="jobsLoader__inner">
        <Loader message="Loading jobs..." />
      </div>
    </div>
  );
}

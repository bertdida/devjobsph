import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Loader } from './components/Loader';
import { JobItem } from './components/JobItem';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';

export function App() {
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
    <>
      <Header />

      <Container as="main" className="app">
        <div className="main">
          <Main isLoading={isLoading} jobs={jobs} />
        </div>
      </Container>

      {!isLoading && <Footer />}
    </>
  );
}

function Main({ isLoading, jobs }) {
  if (isLoading) {
    return <Loader />;
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

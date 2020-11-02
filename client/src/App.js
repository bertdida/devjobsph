import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { JobItem } from "./components/JobItem";

import "./App.scss";

export function App() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/v1/jobs");
      setJobs(response.data.data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <Container className="app">
      <Header />

      <div className="main">
        <Main isLoading={isLoading} jobs={jobs} />
      </div>
    </Container>
  );
}

function Main({ isLoading, jobs }) {
  if (isLoading) {
    return <Loader />;
  }

  return jobs.map((job, index) => (
    <div className="mb-3" key={index}>
      <JobItem job={job} />
    </div>
  ));
}

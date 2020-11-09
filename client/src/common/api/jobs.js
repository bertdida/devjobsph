import axios from 'axios';
import queryString from 'query-string';

export function fetchJobs(queryParams) {
  const params = [queryParams].map(queryString.stringify).join('&');
  return axios.get(`/api/jobs?${params}`);
}

import axios from 'axios';

export function fetchTags() {
  return axios.get('/api/tags');
}

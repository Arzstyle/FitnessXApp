import axios from 'axios';

const MOCKAPI_BASE_URL = 'https://6901223aff8d792314bca44f.mockapi.io';

const apiClient = axios.create({
  baseURL: MOCKAPI_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
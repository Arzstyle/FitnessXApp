import axios from 'axios';

const BASE_URL = 'https://6901223aff8d792314bca44f.mockapi.io/Users';


// Membuat instance axios yang sudah dikonfigurasi
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

export default apiClient;
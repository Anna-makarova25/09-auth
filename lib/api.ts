import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

// const baseURL = 'https://notehub-api.goit.study/api';

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

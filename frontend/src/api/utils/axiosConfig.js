import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL_PROD;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default instance;

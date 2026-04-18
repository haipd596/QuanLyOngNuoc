import axios from 'axios';

import { ApiConfig } from '~/configs';

export const httpApi = axios.create({
  baseURL: ApiConfig.apiBaseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    timeout: 60000,
  },
});

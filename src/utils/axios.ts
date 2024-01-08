import axios from 'axios';

import { getLocalStorage } from './localStorage';

const backend_url = 'http://localhost:4000';

const authHeader = () => {
  const user = getLocalStorage('user');

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

const axiosInstance = axios.create({
  baseURL: backend_url,
  timeout: 0,
  headers: authHeader(),
});

export const post = async (url: string, data: unknown) =>
  axiosInstance
    .post(url, data)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));

export const get = async (url: string) =>
  axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));

export const patch = async (url: string, data: unknown) =>
  axiosInstance
    .patch(url, data)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));

export const remove = async (url: string) =>
  axiosInstance
    .delete(url)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
  
export const put = async (url: string, data: unknown) =>
  axiosInstance
    .put(url, data)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
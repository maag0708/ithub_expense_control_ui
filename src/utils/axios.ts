import axios from 'axios';

import { getLocalStorage } from './localStorage';

const backend_url = 'https://dev-expenses-api.azurewebsites.net/api';

const authHeader = () => {
  const user = getLocalStorage('user');
  console.log({ user });

  const appKey = '03C2DB97-DD4D-4998-A6F7-4C88E54199B8'
  if (user && user.token) {
    return { 'FR-APP': appKey,Authorization: 'Bearer ' + user.token };
  } else {
    return {
      'FR-APP': appKey,
    };
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
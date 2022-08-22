import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL } from "config";
import { _assertApiError } from "utils/assertApiError";

const Axios = axios.create({
  baseURL: API_BASE_URL,
});

const okResp = (response: AxiosResponse) => {
  const { data, status } = response;
  return { data, status, url: response.request.uri };
};

const errResp = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
  } else {
    // Something happened in setting up the request that triggered an Error
    // THIS SHOULD NEVER HAPPEN IF YOU CODE OK
  }
  return {
    data: error?.response?.data,
    status: error?.response?.status,
    url: error?.request?.uri,
  };
};

export const fetcher = {
  get: async (url: string, config: AxiosRequestConfig) => {
    return await Axios.get(url, config).then(okResp).catch(errResp);
  },
  delete: async (url: string, config: AxiosRequestConfig) => {
    return await Axios.delete(url, config).then(okResp).catch(errResp);
  },
  head: async (url: string, config: AxiosRequestConfig) => {
    return await Axios.head(url, config).then(okResp).catch(errResp);
  },
  options: async (url: string, config: AxiosRequestConfig) => {
    return await Axios.options(url, config).then(okResp).catch(errResp);
  },
  post: async (url: string, data: any, config: AxiosRequestConfig) => {
    return await Axios.post(url, data, config).then(okResp).catch(errResp);
  },
  put: async (url: string, data: any, config: AxiosRequestConfig) => {
    return await Axios.put(url, data, config).then(okResp).catch(errResp);
  },
  patch: async (url: string, data: any, config: AxiosRequestConfig) => {
    return await Axios.patch(url, data, config).then(okResp).catch(errResp);
  },
};
export default fetcher;

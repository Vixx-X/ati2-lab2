import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export function _makeFetchOptions(options: AxiosRequestConfig = {}) {
  const ret: AxiosRequestConfig = {
    withCredentials: true,
    ...options,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "Content-Type": "application/json",
    },
  };

  if (options?.headers) {
    ret.headers = {
      ...ret.headers,
      ...options.headers,
    } as AxiosRequestHeaders;
  }

  return ret;
}

export default function makeFetchOptions(options: AxiosRequestConfig = {}) {
  return _makeFetchOptions(options);
}

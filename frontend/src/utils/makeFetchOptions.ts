import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { _userStore } from "stores/UserStore";

export function _makeFetchOptions(options: AxiosRequestConfig = {}) {
  const user = _userStore.getState();

  const ret: AxiosRequestConfig = {
    withCredentials: true,
    ...options,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "Content-Type": "application/json",
    },
  };

  if (user.lang) {
    ret.headers = {
      ...ret.headers,
      "Accept-Language": user.lang,
    };
  }

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

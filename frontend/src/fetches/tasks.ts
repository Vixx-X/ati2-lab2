import { API_URLS } from "config";
import { TaskType } from "types/tasks";
import assertApiError from "utils/assertApiError";
import fetcher from "utils/fetcher";
import makeFetchOptions from "utils/makeFetchOptions";

export const getTasks = async (params: any) => {
  const resp = await fetcher.get(
    API_URLS.URL_TODO,
    makeFetchOptions({ params })
  );
  await assertApiError(resp);
  return resp.data;
};

export const getTask = async (id: number) => {
  const resp = await fetcher.get(
    `${API_URLS.URL_TODO}${id}/`,
    makeFetchOptions()
  );
  await assertApiError(resp);
  return resp.data;
};

export const postTask = async (data: TaskType) => {
  const resp = await fetcher.post(API_URLS.URL_TODO, data, makeFetchOptions());
  await assertApiError(resp);
  return resp.data;
};

export const putTask = async (id: number, data: TaskType) => {
  const resp = await fetcher.put(
    `${API_URLS.URL_TODO}${id}/`,
    data,
    makeFetchOptions()
  );
  await assertApiError(resp);
  return resp.data;
};

export const patchTask = async (id: number, data: Partial<TaskType>) => {
  const resp = await fetcher.patch(
    `${API_URLS.URL_TODO}${id}/`,
    data,
    makeFetchOptions()
  );
  await assertApiError(resp);
  return resp.data;
};

export const deleteTask = async (id: number) => {
  const resp = await fetcher.delete(
    `${API_URLS.URL_TODO}${id}/`,
    makeFetchOptions()
  );
  await assertApiError(resp);
  return resp.data;
};

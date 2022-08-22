export const _assertApiError = (status: number) =>
  status < 200 || status >= 300;

export async function assertApiError(resp: any) {
  if (!_assertApiError(resp.status)) return;

  const error = new Error(`[API ERROR] (${resp.url})`);

  // Attach extra info to the error object.

  throw Object.assign({}, error, {
    data: resp.data,
    status: resp.status,
  } as ClientApiError);
}

export default assertApiError;

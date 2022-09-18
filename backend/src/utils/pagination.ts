import { Request } from "express";

const preprocess = (req: Request) => {
  const { offset: _offset, limit: _limit, ...query } = req.query;
  const offset = Number(_offset ?? 0);
  const limit = Number(_limit ?? 25);
  const url = new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  url.search = new URLSearchParams(); // cleaning query params
  return { url, offset, limit, query };
};

export const getNext = (req: Request, count: number) => {
  const { url, offset, limit, query } = preprocess(req);
  if (offset + limit >= count) return null;
  return `${url}?${new URLSearchParams({
    ...query,
    limit: String(limit),
    offset: String(offset + limit),
  })}`;
};

const max = (a: number, b: number) => (a > b ? a : b);

export const getPrev = (req: Request, count: number) => {
  const { url, offset, limit, query } = preprocess(req);
  if (offset <= 0) return null;
  return `${url}?${new URLSearchParams({
    ...query,
    limit: String(limit),
    offset: String(max(offset - limit, 0)),
  })}`;
};

import { validationResult } from "express-validator";
import { Request } from "express";
import HttpException from "../models/http-exception.model";

export async function assertErrors(req: Request) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return;
  const ret: { [key: string]: string[] } = {};
  for (const { msg, param } of errors.array()) {
    if (!ret[param]) {
      ret[param] = [];
    }
    ret[param].push(msg);
  }
  throw new HttpException(422, { errors: ret });
}

export default assertErrors;

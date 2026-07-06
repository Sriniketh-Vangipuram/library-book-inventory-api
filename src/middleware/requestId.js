import { v4 as uuid } from "uuid";

export const requestId = (req, res, next) => {
  const id = uuid();

  req.requestId = id;

  res.setHeader("X-Request-ID", id);

  next();
};
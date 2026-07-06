import { env } from "../config/env.js";
import { successResponse } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const check = (req, res) => {
  return successResponse(
    res,
    HTTP_STATUS.OK,
    "Server is healthy.",
    {
      status: "UP",
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
    }
  );
};

export const healthController = {
  check,
};
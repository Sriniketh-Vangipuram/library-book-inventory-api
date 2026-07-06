import { logger } from "./logger.js";

const track = (action, requestId = "") => {
  logger.info(
    `[Analytics] User interacted with Express API - ${action}`,
    requestId
  );
};

export const analytics = {
  track,
};
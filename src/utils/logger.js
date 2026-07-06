const formatLog = (level, message, requestId = "") => {
  const timestamp = new Date().toISOString();

  return `[${timestamp}] [${level}]${requestId ? ` [${requestId}]` : ""} ${message}`;
};

const info = (message, requestId = "") => {
  console.log(formatLog("INFO", message, requestId));
};

const warn = (message, requestId = "") => {
  console.warn(formatLog("WARN", message, requestId));
};

const error = (message, requestId = "") => {
  console.error(formatLog("ERROR", message, requestId));
};

export const logger = {
  info,
  warn,
  error,
};
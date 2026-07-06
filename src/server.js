import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

const server = app.listen(env.PORT, () => {
  logger.info(
    `Server running on http://localhost:${env.PORT}`
  );
});

process.on("SIGINT", () => {
  logger.info("Gracefully shutting down...");

  server.close(() => {
    logger.info("Server stopped.");

    process.exit(0);
  });
});
import { Router } from "express";

import bookRoutes from "./book.routes.js";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/books", bookRoutes);
router.use("/health",healthRoutes);

export default router;
import { Router } from "express";

import { bookController } from "../controllers/book.controller.js";
import { sanitizeInput } from "../middleware/sanitizeInput.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createBookSchema, updateBookSchema,} from "../validators/book.validator.js";
import { idParamSchema } from "../validators/common.validator.js";

const router = Router();

router.get("/", bookController.getAll);

router.get("/:id",validateRequest(idParamSchema,"params"), bookController.getById);

router.post(
  "/",
  sanitizeInput,
  validateRequest(createBookSchema),
  bookController.create
);

router.put(
  "/:id",
  validateRequest(idParamSchema,"params"),
  sanitizeInput,
  validateRequest(updateBookSchema),
  bookController.update
);

router.delete("/:id",validateRequest(idParamSchema,"params") ,bookController.delete);

export default router;
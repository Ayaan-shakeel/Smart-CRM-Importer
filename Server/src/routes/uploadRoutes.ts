import { Router } from "express";
import { upload } from "../middleware/uploadMiddleware";
import { uploadCSV } from "../controllers/uploadController";

const router = Router();

router.post(
  "/upload",
  upload.single("file"),
  uploadCSV
);

export default router;
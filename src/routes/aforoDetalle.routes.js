import { Router } from "express";
import AforoDetalleController from "../controllers/AforoDetalleController.js";

const router = Router();

router.get("/:id", AforoDetalleController.getById);
router.post("/", AforoDetalleController.create);
router.put("/:id", AforoDetalleController.update);
router.delete("/:id", AforoDetalleController.delete);

export default router;
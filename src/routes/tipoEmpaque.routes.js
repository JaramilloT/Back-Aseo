import { Router } from "express";
import TipoEmpaqueController from "../controllers/TipoEmpaqueController.js";

const router = Router();

router.get("/", TipoEmpaqueController.getAll);
router.get("/:id", TipoEmpaqueController.getById);
router.post("/", TipoEmpaqueController.create);
router.put("/:id", TipoEmpaqueController.update);
router.delete("/:id", TipoEmpaqueController.delete);

export default router;
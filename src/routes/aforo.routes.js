import { Router } from "express";
import AforoController from "../controllers/AforoController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", verificarToken, AforoController.getAll);
router.get("/:id", verificarToken, AforoController.getById);
router.post("/", verificarToken, AforoController.create); 
router.put("/:id", verificarToken, AforoController.update);
router.delete("/:id", verificarToken, AforoController.delete);
router.get("/:aforoId/detalles", verificarToken, AforoController.getDetalles);

export default router;
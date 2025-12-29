import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { verificarToken } from "../middleware/auth.js";

const router = Router();

router.post("/login", AuthController.login);
router.get("/verificar", verificarToken, AuthController.verificarToken);

export default router;
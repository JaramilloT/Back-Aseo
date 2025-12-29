import express from 'express';
import ZonaRutaController from '../controllers/ZonaRutaController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/colores', verificarToken, ZonaRutaController.getAllColores);
router.get('/color/:color', verificarToken, ZonaRutaController.getByColor);
router.get('/', verificarToken, ZonaRutaController.getAll);
router.get('/:id', verificarToken, ZonaRutaController.getById);
router.post('/', verificarToken, ZonaRutaController.create);
router.put('/:id', verificarToken, ZonaRutaController.update);
router.delete('/:id', verificarToken, ZonaRutaController.delete);

export default router;
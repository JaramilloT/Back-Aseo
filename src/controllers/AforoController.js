import AforoService from "../services/AforoService.js";
import AforoDetalleService from "../services/AforoDetalleService.js";

class AforoController {

  create = async (req, res) => {
    try {
      console.log('Body recibido:', req.body);
      console.log('Usuario:', req.usuario);

      // Validación de autenticación
      if (!req.usuario || !req.usuario.id) {
        console.error('No hay usuario autenticado');
        return res.status(401).json({ error: "Usuario no autenticado" });
      }

      const usuarioId = req.usuario.id;
      const { zona_ruta_id, tipo_aforo, fecha, hora, observaciones, nombre_aforador, detalles } = req.body;

      // Validaciones
      if (!zona_ruta_id) {
        return res.status(400).json({ error: 'zona_ruta_id es obligatorio' });
      }

      if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
        return res.status(400).json({ error: 'Debes agregar al menos un detalle de empaque' });
      }

      // Validar cada detalle
      for (const det of detalles) {
        if (!det.empaque_id || !det.cantidad_empaques) {
          return res.status(400).json({
            error: 'Cada detalle debe tener empaque_id y cantidad_empaques'
          });
        }
      }

      // Preparar datos para el servicio
      const aforoData = {
        zona_ruta_id: parseInt(zona_ruta_id),
        tipo_aforo: tipo_aforo || 'ordinario',
        fecha: fecha || new Date().toISOString().split('T')[0],
        hora: hora || new Date().toTimeString().split(' ')[0],
        observaciones: observaciones || null,
        nombre_aforador: nombre_aforador || null,
        usuario_id: usuarioId,
        detalles: detalles.map(d => ({
          empaque_id: parseInt(d.empaque_id),
          cantidad_empaques: parseInt(d.cantidad_empaques)
        }))
      };

      console.log('Datos procesados:', aforoData);

      // Crear aforo usando el servicio
      const result = await AforoService.create(aforoData);

      console.log('Aforo creado:', result);

      res.status(201).json({
        success: true,
        message: "Aforo creado correctamente",
        data: result
      });

    } catch (error) {
      console.error("ERROR CREAR AFORO:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        details: error.message
      });
    }
  };

  async getAll(req, res) {
    try {
      const usuarioId = req.usuario?.rol === 'aseo' ? req.usuario.id : null;
      const rol = req.usuario?.rol;
      const aforos = await AforoService.getAll(usuarioId, rol);
      res.json(aforos);
    } catch (err) {
      console.error('Error en getAll:', err);
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const aforo = await AforoService.getById(req.params.id);
      res.json(aforo);
    } catch (err) {
      console.error('Error en getById:', err);
      res.status(404).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const aforo = await AforoService.getById(req.params.id);

      if (req.usuario.rol === 'aseo' && aforo.usuario_id !== req.usuario.id) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      res.json(await AforoService.update(req.params.id, req.body));
    } catch (err) {
      console.error('Error en update:', err);
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const aforo = await AforoService.getById(req.params.id);

      if (req.usuario.rol === 'aseo' && aforo.usuario_id !== req.usuario.id) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      await AforoService.delete(req.params.id);
      res.json({ message: "Aforo eliminado" });
    } catch (err) {
      console.error('Error en delete:', err);
      res.status(400).json({ error: err.message });
    }
  }

  async getDetalles(req, res) {
    try {
      const aforo = await AforoService.getById(req.params.aforoId);

      if (req.usuario.rol === 'aseo' && aforo.usuario_id !== req.usuario.id) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      const detalles = await AforoDetalleService.listByAforo(req.params.aforoId);
      res.json(detalles);
    } catch (err) {
      console.error('Error en getDetalles:', err);
      res.status(404).json({ error: err.message });
    }
  }
}

export default new AforoController();

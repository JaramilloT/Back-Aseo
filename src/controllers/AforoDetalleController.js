import AforoDetalleRepository from "../repositories/aforoDetalleRepository.js";

class AforoDetalleController {

  async getById(req, res) {
    try {
      const { id } = req.params;
      const detalle = await AforoDetalleRepository.findById(id);

      if (!detalle) {
        return res.status(404).json({ message: "Detalle no encontrado" });
      }

      res.json(detalle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const nuevo = await AforoDetalleRepository.create(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const actualizado = await AforoDetalleRepository.update(id, req.body);
      res.json(actualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await AforoDetalleRepository.delete(id);
      res.json({ message: "Detalle eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AforoDetalleController();

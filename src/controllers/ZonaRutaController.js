import ZonaRutaService from "../services/ZonaRutaService.js";

class ZonaRutaController {
  async getAll(req, res) {
    try {
      const zonas = await ZonaRutaService.getAll();
      res.json(zonas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllColores(req, res) {
    try {
      const colores = await ZonaRutaService.getAllColores();
      res.json(colores);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getByColor(req, res) {
    try {
      const zonas = await ZonaRutaService.getByColor(req.params.color);
      res.json(zonas);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      res.json(await ZonaRutaService.getById(req.params.id));
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const created = await ZonaRutaService.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      res.json(await ZonaRutaService.update(req.params.id, req.body));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await ZonaRutaService.delete(req.params.id);
      res.json({ message: "ZonaRuta eliminada" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new ZonaRutaController();